# Conference booth script

A guide for volunteers staffing a booth for the Open Source Accessibility Framework. Use it as a starting point and say things in your own words. Every fact here comes from the framework's [README](../../README.md) and [phase documents](../phases/). If a visitor asks something this guide doesn't cover, say so and point them to the repository.

## Before your shift

- Open the [README](../../README.md) and the [registered projects board](https://github.com/orgs/open-source-accessibility/projects/1) on the booth device so you can show real examples.
- Have a QR code or short link to the repository and the registration form ready (see [Sign-up links](#sign-up-links)).
- Know the one sentence you want every visitor to leave with: **"Start with two quick actions, then keep going at your own pace."**

## The pitch

### 10-second version

> The Open Source Accessibility Framework gives open source projects a step-by-step way to make accessibility part of how they work. It's free, it's incremental, and your progress is public.

### 30-second version

> It's a phased framework for open source projects that want to improve accessibility but don't know where to start. Instead of trying to fix everything at once, you work through practical actions in four phases: foundational, workflow, testing, and community. You register your project, and the framework gives you a public tracking issue so users and contributors can see your progress. It's not a certification or a score. It's about steady, visible improvement.

### 2-minute version

1. **The problem.** "Lots of maintainers care about accessibility but aren't sure what to do first, or it feels too big to start."
2. **What it is.** "The framework breaks accessibility work into small, concrete actions. Each has a _why it matters_, a _definition of done_, and recommended steps. There are four phases:"
   - **Foundational:** make your commitment visible and establish a way to track accessibility work.
   - **Workflow:** build accessibility into docs, design, triage, pull requests, ownership, and dependency decisions.
   - **Testing:** add repeatable automated and manual checks.
   - **Community:** make collaboration accessible, respond to feedback, share progress, and invite people to help.
3. **How you start.** "Register your project with a short form. Then do two quick things: add an `ACCESSIBILITY.md` and create an `accessibility` label. Each takes under an hour."
4. **What you get.** "A public tracking issue, a place on the registered projects board alongside other projects, and a community to share experience, ask for help, and find mentors."
5. **The ask.** "Want to register your project, or help a project that has?"

## Key messages

- **Progress, not perfection.** It's an improvement framework, not a certification, score, or ranking. Projects don't need to solve everything first.
- **Incremental.** Adopt actions at a pace that suits your project's size, maturity, and community.
- **Built on what you already do.** Actions plug into existing practices like issue labels, PR templates, triage, and docs.
- **Public and accountable.** Progress and remaining barriers are visible to users, which builds trust.
- **Gives contributors a way in.** Well-defined, labeled issues make it easier for newcomers and accessibility experts to help.
- **Lightweight.** It runs on GitHub (issues, labels, a project board). No special infrastructure or private onboarding.

## Benefits to highlight

| For           | Benefit                                                                                                 |
| :------------ | :------------------------------------------------------------------------------------------------------ |
| Maintainers   | Clear, achievable next steps instead of an overwhelming checklist.                                      |
| Contributors  | Defined ways to help, such as `accessibility` + `good first issue` and `accessibility` + `help wanted`. |
| Users         | Visible commitment, known limitations, and a clear way to report barriers.                              |
| The community | Shared learning, mentorship, and a central view of participating projects.                              |

## How much effort is involved?

Every action in the phase documents is rated by typical initial effort: **Quick** (under 1 hour), **Moderate** (1-3 hours), or **Extended** (more than 3 hours). Effort varies by project size and maturity.

| Phase        | Actions | Tasks | Effort range         |
| :----------- | ------: | ----: | :------------------- |
| Foundational |       2 |     4 | Both Quick           |
| Workflow     |      10 |    27 | Quick to Extended    |
| Testing      |       6 |    17 | Moderate to Extended |
| Community    |       6 |    19 | Quick to Extended    |

Talking points:

- "Foundational is the on-ramp: two actions, both quick."
- "After that, many actions are one-time setup and then become part of normal project work."
- "Some actions, such as accessible docs and interfaces, are ongoing practices rather than one-off tasks."
- "You can do the remaining phases in whatever order suits your project."
- Be honest: the full framework is a sustained effort. Don't promise it's a weekend project.

## How to get started and sign up

1. **Register your project** with the [project registration issue form](https://github.com/open-source-accessibility/Open-Source-Accessibility-Framework/issues/new?template=project-registration.yml). It asks for:
   - project name
   - repository URL
   - project website URL (optional)
   - the GitHub handle of each maintainer or contributor who will be a point of contact
2. **Complete the [Foundational phase](../phases/foundational-phase.md):**
   - [Create an ACCESSIBILITY.md](../phases/foundational-phase.md#1-create-an-accessibilitymd)
   - [Use an accessibility label to track relevant work](../phases/foundational-phase.md#2-use-an-accessibility-label-to-track-relevant-work)
3. **Work through the other phases** in the order that fits, updating your tracking issue as you finish each action.

Tell visitors that registration creates a **public** tracking issue. The registration automation adds the project to the registered projects board and posts a welcome comment with onboarding guidance and a badge.

### Sign-up links

Fill these in before the event.

- Website: `gh.io/accessibility-framework`
- QR code location: `banner`
- Registration form: `on the website homepage, under "Getting started"`

## Quick answers to common questions

**Is this a certification or a compliance program?**
No. There's no score, ranking, or certificate. It's a public improvement model. Participation shows commitment to continuous improvement, not that a project is fully accessible.

**Does it cost anything?**
No. It's open source and runs on GitHub. (Don't speak to anything beyond that, such as funding or services.)

**We're a tiny project with one or two maintainers. Is this realistic?**
Yes. Start with the two Foundational actions, each under an hour. Projects adapt the actions to their size and can go at their own pace.

**We don't have any accessibility expertise.**
That's a main reason the framework exists. Each action explains why it matters and gives recommended steps. Registering also connects you with other projects and offers chances to ask for help and find mentorship. Actions such as tagging issues where you need expert help are designed for this.

**Do we have to finish everything?**
No. You work incrementally. The framework doesn't gate participation on completing all phases. Update your tracking issue as you finish actions.

**Why is the progress public? Isn't that risky?**
Public accountability is the model. Showing progress and remaining barriers builds user trust and invites help. It's about transparency of effort, not claims of perfection. You can also state limitations openly in your `ACCESSIBILITY.md`.

**What do we need to do on day one?**
Register the project, add an `ACCESSIBILITY.md` with a short statement of why accessibility matters, and create an `accessibility` label.

**Does it work for any kind of project: libraries, CLIs, websites, apps?**
The framework is written to be adapted to different projects. Some actions, such as designing accessible interfaces, matter most where there's a user interface, but the phases apply broadly. Visitors with unusual projects can register and adapt the actions.

**What does automated testing involve?**
The Testing phase starts with adding at least one automated accessibility check. It also includes keyboard-only smoke tests, screen reader spot checks, manual checks, and documentation checks. It's explicit that automation alone isn't enough.

**Can AI help us implement it?**
Yes. There are [phase skills](../ai/guide.md#framework-skills) for AI agents covering each phase. You can ask for a whole phase or selected actions, for example "Use the Foundational Phase skill to create an ACCESSIBILITY.md". The guidance is clear that AI output is a suggestion and needs review, testing, and ideally feedback from people with disabilities.

**What do we get from registering?**
A public tracking issue, a place on the registered projects board, a welcome message with a badge, and opportunities to learn from and help other projects. Ask visitors to look at the board with you.

**I'm not a maintainer. Can I still help?**
Yes. Look for issues labeled `accessibility` with `good first issue` (beginner-friendly) or `accessibility` with `help wanted` (projects actively seeking support) on participating projects. You can also improve the framework by opening an issue or pull request in the repository.

**Can I use the badge or share that we participate?**
Yes. There's a [reusable participation message](./framework-participation-message.md) and a badge to communicate participation.

**Who runs the framework?**
It's maintained in the open in the repository, and maintenance relies on GitHub-native tools. For specifics about governance or sponsors, say you're not sure and point to the repository.

## Handling things you don't know

- It's fine to say "I'm not sure, but here's where to look." Then point to the README or phase documents.
- Don't promise features, timelines, funding, or support that aren't documented.
- Don't claim any project is "fully accessible" or "certified." The framework doesn't do that.
- For detailed accessibility questions (WCAG interpretation, specific tooling), suggest opening an issue in the repository or asking on the project's tracking issue.

## Conversation closers

- "Can I help you register your project right now? It takes a couple of minutes on my laptop."
- "Scan this QR code to open the registration form, or the repository if you'd like to read more first."
- "If you're not a maintainer, would you share this with the maintainers of a project you use?"
- "Want to see which projects are already participating?" (Show the board.)
