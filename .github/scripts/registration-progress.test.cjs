const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const {
  PHASES,
  PROGRESS_END,
  PROGRESS_START,
  buildProgressSection,
  buildPointOfContactValue,
  calculateCounts,
  calculatePhasePercentages,
  ensureProgressSection,
  parseTrackingIssueField,
  updateRecap,
} = require("./registration-progress.cjs");

function checkAction(body, phaseId, actionNumber) {
  const marker = `<!-- framework-action:${phaseId}-${actionNumber} -->`;
  const linePattern = new RegExp(
    `^- \\[ \\](.*${marker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s*)$`,
    "m",
  );

  return body.replace(linePattern, "- [x]$1");
}

test("builds every phase action with an empty recap", () => {
  const progress = buildProgressSection();
  const actionTotal = PHASES.reduce(
    (total, phase) => total + phase.actions.length,
    0,
  );

  assert.equal(progress.match(/^- \[ \]/gm)?.length, actionTotal);
  assert.match(progress, /\| Foundational \| 0 \| 2 \|/);
  assert.match(progress, /\| Workflow \| 0 \| 10 \|/);
  assert.match(progress, /\| Testing \| 0 \| 6 \|/);
  assert.match(progress, /\| Community \| 0 \| 6 \|/);
  assert.match(progress, /\| \*\*Total\*\* \| \*\*0\*\* \| \*\*24\*\* \|/);
  assert.match(
    progress,
    /> \*\*Automatically updated:\*\* Do not edit this recap table\./,
  );
});

test("combines the issue author and listed points of contact", () => {
  assert.equal(
    buildPointOfContactValue(
      "IssueAuthor",
      "PlainHandle, @maintainer, https://github.com/Contributor/ @issueauthor",
    ),
    "@IssueAuthor @PlainHandle @maintainer @Contributor",
  );
  assert.equal(
    buildPointOfContactValue("IssueAuthor", "_No response_"),
    "@IssueAuthor",
  );
  assert.throws(
    () => buildPointOfContactValue("IssueAuthor", "not/a/handle"),
    /not a valid GitHub handle/,
  );
});

test("stops the final issue-form field before generated progress content", () => {
  const body = [
    "### Maintainer(s) / contributor(s) point of contact",
    "",
    "@mlama007 @weboverhauls",
    "",
    "---",
    "",
    buildProgressSection(),
  ].join("\n");

  assert.equal(
    parseTrackingIssueField(
      body,
      "Maintainer(s) / contributor(s) point of contact",
    ),
    "@mlama007 @weboverhauls",
  );
});

test("matches the canonical phase action headings", () => {
  for (const phase of PHASES) {
    const documentPath = path.join(
      __dirname,
      "..",
      "..",
      "framework",
      "phases",
      phase.document,
    );
    const document = fs.readFileSync(documentPath, "utf8");
    const headings = [...document.matchAll(/^### (\d+)\. (.+)$/gm)].map(
      ([, number, title]) => ({ number: Number(number), title }),
    );

    assert.deepEqual(
      headings,
      phase.actions.map((action, index) => ({
        number: index + 1,
        title: action.title,
      })),
      `${phase.name} checklist actions must match ${phase.document}`,
    );
  }
});

test("adds progress to an existing registration without changing its content", () => {
  const body = "### Project name\n\nExisting project";
  const result = ensureProgressSection(body);

  assert.equal(result.changed, true);
  assert.match(result.body, /^### Project name\n\nExisting project/);
  assert.match(result.body, new RegExp(PROGRESS_START));
  assert.match(result.body, new RegExp(`${PROGRESS_END}$`));
  assert.deepEqual(ensureProgressSection(result.body), {
    body: result.body,
    changed: false,
  });
});

test("updates recap totals from saved checklist states", () => {
  let body = [
    "### Project name",
    "",
    "Example project",
    "",
    buildProgressSection(),
    "",
    "## Project Notes",
    "",
    "Keep this project-provided context.",
  ].join("\n");
  body = checkAction(body, "foundational", 1);
  body = checkAction(body, "foundational", 2);
  body = checkAction(body, "workflow", 1);
  body = checkAction(body, "testing", 1);

  const result = updateRecap(body);

  assert.equal(result.changed, true);
  assert.match(result.body, /\| Foundational \| 2 \| 0 \|/);
  assert.match(result.body, /\| Workflow \| 1 \| 9 \|/);
  assert.match(result.body, /\| Testing \| 1 \| 5 \|/);
  assert.match(result.body, /\| Community \| 0 \| 6 \|/);
  assert.match(
    result.body,
    /\| \*\*Total\*\* \| \*\*4\*\* \| \*\*20\*\* \|/,
  );
  assert.match(result.body, /- \[x\] \[Create an ACCESSIBILITY\.md\]/);
  assert.match(result.body, /### Project name\n\nExample project/);
  assert.match(result.body, /## Project Notes\n\nKeep this project-provided context\.$/);

  assert.deepEqual(
    calculateCounts(result.body).map(({ name, percentage }) => ({
      name,
      percentage,
    })),
    [
      { name: "Foundational", percentage: 100 },
      { name: "Workflow", percentage: 10 },
      { name: "Testing", percentage: 17 },
      { name: "Community", percentage: 0 },
    ],
  );
  assert.deepEqual(calculatePhasePercentages(result.body), {
    "foundational-phase": "100%",
    "workflow-phase": "10%",
    "testing-phase": "17%",
    "community-phase": "0%",
  });
});

test("maps one of two foundational actions to 50 percent", () => {
  const body = checkAction(buildProgressSection(), "foundational", 1);

  assert.equal(
    calculatePhasePercentages(body)["foundational-phase"],
    "50%",
  );
});

test("does not update the issue again when recap totals are current", () => {
  const firstUpdate = updateRecap(
    checkAction(buildProgressSection(), "community", 6),
  );
  const secondUpdate = updateRecap(firstUpdate.body);

  assert.equal(firstUpdate.changed, true);
  assert.equal(secondUpdate.changed, false);
  assert.equal(secondUpdate.body, firstUpdate.body);
});

test("ignores issue bodies without a framework progress section", () => {
  const body = "### Project name\n\nExample";
  const result = updateRecap(body);

  assert.deepEqual(result, { body, changed: false, counts: null });
});

test("reports damaged progress markers instead of replacing user content", () => {
  const body = buildProgressSection().replace(PROGRESS_END, "");

  assert.throws(
    () => updateRecap(body),
    /framework progress markers are incomplete/,
  );
  assert.match(body, new RegExp(PROGRESS_START));
});
