const REPOSITORY_URL =
  "https://github.com/open-source-accessibility/Open-Source-Accessibility-Framework";

const PROGRESS_START = "<!-- framework-progress:start -->";
const PROGRESS_END = "<!-- framework-progress:end -->";
const RECAP_START = "<!-- framework-recap:start -->";
const RECAP_END = "<!-- framework-recap:end -->";

const PHASES = [
  {
    id: "foundational",
    name: "Foundational",
    document: "foundational-phase.md",
    actions: [
      {
        title: "Create an ACCESSIBILITY.md",
        anchor: "1-create-an-accessibilitymd",
      },
      {
        title: "Use an accessibility label to track relevant work",
        anchor: "2-use-an-accessibility-label-to-track-relevant-work",
      },
    ],
  },
  {
    id: "workflow",
    name: "Workflow",
    document: "workflow-phase.md",
    actions: [
      {
        title: "Surface accessibility expectations for contributors",
        anchor: "1-surface-accessibility-expectations-for-contributors",
      },
      {
        title: "Create an accessible path for reporting accessibility bugs",
        anchor: "2-create-an-accessible-path-for-reporting-accessibility-bugs",
      },
      {
        title: "Establish a simple accessibility triage approach",
        anchor: "3-establish-a-simple-accessibility-triage-approach",
      },
      {
        title: "Add an accessibility section to the pull request template",
        anchor: "4-add-an-accessibility-section-to-the-pull-request-template",
      },
      {
        title: "Tag beginner-friendly accessibility issues",
        anchor: "5-tag-beginner-friendly-accessibility-issues",
      },
      {
        title: "Tag accessibility issues where you need expert help",
        anchor: "6-tag-accessibility-issues-where-you-need-expert-help",
      },
      {
        title: "Assign accessibility ownership",
        anchor: "7-assign-accessibility-ownership",
      },
      {
        title: "Make docs accessible by default",
        anchor: "8-make-docs-accessible-by-default",
      },
      {
        title: "Design accessible interfaces",
        anchor: "9-design-accessible-interfaces",
      },
      {
        title: "Evaluate key dependencies and upstream blockers",
        anchor: "10-evaluate-key-dependencies-and-upstream-blockers",
      },
    ],
  },
  {
    id: "testing",
    name: "Testing",
    document: "testing-phase.md",
    actions: [
      {
        title: "Add at least one automated accessibility check",
        anchor: "1-add-at-least-one-automated-accessibility-check",
      },
      {
        title: "Perform a keyboard-only smoke test for core flows",
        anchor: "2-perform-a-keyboard-only-smoke-test-for-core-flows",
      },
      {
        title: "Perform a screen reader spot check for core flows",
        anchor: "3-perform-a-screen-reader-spot-check-for-core-flows",
      },
      {
        title: "Perform manual accessibility checks",
        anchor: "4-perform-manual-accessibility-checks",
      },
      {
        title: "Perform accessibility checks for documentation",
        anchor: "5-perform-accessibility-checks-for-documentation",
      },
      {
        title: "Document supported environments and known limitations",
        anchor: "6-document-supported-environments-and-known-limitations",
      },
    ],
  },
  {
    id: "community",
    name: "Community",
    document: "community-phase.md",
    actions: [
      {
        title: "Invite community help on accessibility work",
        anchor: "1-invite-community-help-on-accessibility-work",
      },
      {
        title: "Respond constructively to accessibility reports",
        anchor: "2-respond-constructively-to-accessibility-reports",
      },
      {
        title:
          "Provide accessible and respectful ways to contribute and collaborate",
        anchor:
          "3-provide-accessible-and-respectful-ways-to-contribute-and-collaborate",
      },
      {
        title: "Recognize accessibility contributions publicly",
        anchor: "4-recognize-accessibility-contributions-publicly",
      },
      {
        title: "Publish accessibility progress updates",
        anchor: "5-publish-accessibility-progress-updates",
      },
      {
        title: "Share accessibility resources",
        anchor: "6-share-accessibility-resources",
      },
    ],
  },
];

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function actionMarker(phaseId, actionNumber) {
  return `<!-- framework-action:${phaseId}-${actionNumber} -->`;
}

function phaseStart(phaseId) {
  return `<!-- framework-phase:${phaseId}:start -->`;
}

function phaseEnd(phaseId) {
  return `<!-- framework-phase:${phaseId}:end -->`;
}

function renderRecap(counts) {
  const completedTotal = counts.reduce(
    (total, phase) => total + phase.completed,
    0,
  );
  const leftTotal = counts.reduce((total, phase) => total + phase.left, 0);

  return [
    RECAP_START,
    "## Recap",
    "",
    "> **Automatically updated:** Do not edit this recap table. Check or uncheck actions below and save the issue; the table will update automatically.",
    "",
    "| Phase | Actions Completed | Actions Left |",
    "| --- | ---: | ---: |",
    ...counts.map(
      (phase) =>
        `| ${phase.name} | ${phase.completed} | ${phase.left} |`,
    ),
    `| **Total** | **${completedTotal}** | **${leftTotal}** |`,
    RECAP_END,
  ].join("\n");
}

function emptyCounts() {
  return PHASES.map((phase) => ({
    id: phase.id,
    name: phase.name,
    completed: 0,
    left: phase.actions.length,
  }));
}

function buildProgressSection() {
  const phaseSections = PHASES.map((phase) => {
    const documentUrl = `${REPOSITORY_URL}/blob/main/framework/phases/${phase.document}`;
    const actions = phase.actions.map(
      (action, index) =>
        `- [ ] [${action.title}](${documentUrl}#${action.anchor}) ${actionMarker(phase.id, index + 1)}`,
    );

    return [
      phaseStart(phase.id),
      `### ${phase.name} Phase`,
      "",
      ...actions,
      phaseEnd(phase.id),
    ].join("\n");
  });

  return [
    PROGRESS_START,
    renderRecap(emptyCounts()),
    "",
    "## Framework Progress",
    "",
    "Use these checklists to record your project's progress. Check an action after your project meets its definition of done.",
    "",
    "Progress is self-reported and does not represent certification or a guarantee of accessibility conformance.",
    "",
    ...phaseSections.flatMap((section, index) =>
      index === phaseSections.length - 1 ? [section] : [section, ""],
    ),
    PROGRESS_END,
  ].join("\n");
}

function ensureProgressSection(body) {
  const hasProgressStart = body.includes(PROGRESS_START);
  const hasProgressEnd = body.includes(PROGRESS_END);

  if (hasProgressStart !== hasProgressEnd) {
    throw new Error("The framework progress markers are incomplete.");
  }

  if (hasProgressStart) {
    return { body, changed: false };
  }

  const existingBody = body.trimEnd();
  const separator = existingBody ? "\n\n---\n\n" : "";
  return {
    body: `${existingBody}${separator}${buildProgressSection()}`,
    changed: true,
  };
}

function getSection(body, startMarker, endMarker, sectionName) {
  const startIndex = body.indexOf(startMarker);
  const endIndex = body.indexOf(endMarker);

  if (startIndex === -1 || endIndex === -1 || endIndex < startIndex) {
    throw new Error(`The ${sectionName} markers are missing or out of order.`);
  }

  return body.slice(startIndex + startMarker.length, endIndex);
}

function calculateCounts(body) {
  return PHASES.map((phase) => {
    const section = getSection(
      body,
      phaseStart(phase.id),
      phaseEnd(phase.id),
      `${phase.name} phase`,
    );
    let completed = 0;

    phase.actions.forEach((action, index) => {
      const marker = actionMarker(phase.id, index + 1);
      const actionPattern = new RegExp(
        `^- \\[([ xX])\\].*${escapeRegExp(marker)}\\s*$`,
        "m",
      );
      const match = section.match(actionPattern);

      if (!match) {
        throw new Error(
          `The checklist entry for ${phase.name} action ${index + 1} is missing.`,
        );
      }

      if (match[1].toLowerCase() === "x") {
        completed += 1;
      }
    });

    return {
      id: phase.id,
      name: phase.name,
      completed,
      left: phase.actions.length - completed,
      percentage: Math.round((completed / phase.actions.length) * 100),
    };
  });
}

function calculatePhasePercentages(body) {
  return Object.fromEntries(
    calculateCounts(body).map((phase) => [
      `${phase.id}-phase`,
      `${phase.percentage}%`,
    ]),
  );
}

function buildPointOfContactValue(issueAuthor, listedContacts = "") {
  const handles = [issueAuthor];
  const normalizedListedContacts = listedContacts.trim();

  if (
    normalizedListedContacts &&
    !/^_No response_$/i.test(normalizedListedContacts)
  ) {
    handles.push(...normalizedListedContacts.split(/[\s,]+/).filter(Boolean));
  }

  const uniqueHandles = new Map();
  for (const value of handles) {
    const handle = value
      .trim()
      .replace(/^https?:\/\/github\.com\//i, "")
      .replace(/^@/, "")
      .replace(/\/$/, "");

    if (!/^[a-z\d](?:[a-z\d-]{0,37}[a-z\d])?$/i.test(handle)) {
      throw new Error(`"${value}" is not a valid GitHub handle.`);
    }

    const key = handle.toLowerCase();
    if (!uniqueHandles.has(key)) {
      uniqueHandles.set(key, handle);
    }
  }

  return [...uniqueHandles.values()].map((handle) => `@${handle}`).join(" ");
}

function updateRecap(body) {
  const hasProgressStart = body.includes(PROGRESS_START);
  const hasProgressEnd = body.includes(PROGRESS_END);

  if (!hasProgressStart && !hasProgressEnd) {
    return { body, changed: false, counts: null };
  }

  if (!hasProgressStart || !hasProgressEnd) {
    throw new Error("The framework progress markers are incomplete.");
  }

  const counts = calculateCounts(body);
  const currentRecap = getSection(
    body,
    RECAP_START,
    RECAP_END,
    "framework recap",
  );
  const currentRecapBlock = `${RECAP_START}${currentRecap}${RECAP_END}`;
  const nextRecapBlock = renderRecap(counts);
  const nextBody = body.replace(currentRecapBlock, nextRecapBlock);

  return {
    body: nextBody,
    changed: nextBody !== body,
    counts,
  };
}

module.exports = {
  PHASES,
  PROGRESS_END,
  PROGRESS_START,
  buildProgressSection,
  buildPointOfContactValue,
  calculateCounts,
  calculatePhasePercentages,
  ensureProgressSection,
  updateRecap,
};
