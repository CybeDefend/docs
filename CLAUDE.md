# Conventions — CybeDefend docs

Read this before adding or editing a page. It exists so that every automated
documentation pass produces the same shape, rather than re-deciding each time.

---

# Part 1 — What belongs in these docs

This is the part that goes wrong. Read it before writing a single line.

## Who reads this

A **CybeDefend customer**: a developer or a security engineer who uses the
product. They connect a repository, configure a scan, read results, triage
findings, wire an integration, and bill a plan.

They do **not** operate our infrastructure, debug our engine, or review our
architecture. They are not colleagues.

## The test every paragraph must pass

> Does this change something the reader **does**, or something they can
> **see** in the product?

If a paragraph only explains **how we do it internally**, delete it. Not
shorten it — delete it. Internal mechanics are not "bonus context"; they are
a leak, and some of them are competitive information.

## Never document

- **How a scanner works inside.** Matching, correlation, deduplication,
  scoring internals, fingerprint construction, retro-matching, which advisory
  database is consulted and how it is joined. *Which* sources power a feature
  may be named when it is a selling point; *how* the matching is performed is
  not documented.
- **Internal architecture.** Services, queues, tables, cron jobs, caches,
  locks, concurrency, batching, retries, timeouts, fallback paths.
- **How a payload is assembled** before it reaches a scanner — what the
  archive keeps or drops, how files are collected, what is filtered where.
- **Selection or ordering logic** the user does not control. If they cannot
  choose it, they do not need the ranked list of how we choose it.
- **Internal state labels, log lines and error identifiers** that are not a
  documented public contract. A string that appears in our logs is not a
  documented API.

Say what the user configures, what they see, what they must do, the limits
they will hit, and how to act on a result. Stop there.

<details>
<summary>Worked example — the same subject, wrong and right</summary>

**Wrong** (deleted from `main` in PR #20): a page titled *"OS Package
Findings"* with sections *"Where a Finding Came From"*, *"What OSV Matching
Adds"*, *"Zero-Day Retro-Matching"*. Every section described engine internals.

**Right** (kept from the same PR): documenting the `--status` flag on the
`results` command in `cli-options.mdx`. The user types it. It changes what
they get back. One flag, one table row, done.

</details>

## Documentation is not a release note

Pages describe the product **as it is today**, in the present tense. A reader
arriving next year must not have to subtract history to understand the current
behaviour.

Never write:

- Dates, or comparisons against them — *"scans that ran before 9 September
  2026…"*, *"the behaviour of every earlier release"*.
- *"used to"*, *"no longer"*, *"now requires"*, *"has been changed"*,
  *"recently"*, *"new in this version"*.
- Migration notes for a behaviour that is simply correct now. If a bug was
  fixed so the product finally matches the documentation, **the documentation
  does not change**.

The single exception: a **breaking change an existing integration must act
on**. Write it as a `<Warning>` saying what to change, in the present tense,
with the payload before and after. No history lesson around it.

## Most changes need no documentation at all

This is the default, not the edge case. A pass that finds nothing worth
writing is a **successful pass** — say so and stop.

| The change is… | Write |
|---|---|
| A bug fix that makes behaviour match the docs | Nothing |
| An internal refactor, perf work, a dependency bump | Nothing |
| A fix to something never documented | Nothing |
| A new flag, parameter, field, setting or limit | One row or one sentence, in the page that already covers it |
| A changed default or a new constraint the user hits | Edit the existing sentence |
| A breaking change for integrators | A `<Warning>` on the existing page |
| A genuinely new user-facing capability with no home | A new page — and justify it in the PR |

## Edit before you create

**Default to editing an existing page.** Most changes are one sentence or one
table row in a page that already exists. Two pages created by an automated
pass were deleted wholesale in PR #20 — both should have been a few lines
added to pages already covering the subject.

Before creating a page, search the existing tree for where the subject already
lives. If you create one anyway, state in the PR description why no existing
page could host it.

## Self-check before committing

Run this over every paragraph you wrote. Any "yes" means cut it.

1. Does it describe how the product works internally rather than how to use it?
2. Would a competitor reading it learn how we do something?
3. Does it mention a date, a version, or how things behaved before?
4. Does it document a fix rather than a capability?
5. Is it a new page where an edit would have done?
6. Did I invent an example, a field name or an error code the code would reject?

---

# Part 2 — Mechanics

## Layout

- All content lives under `latest/`, grouped by area
  (`get-started/`, `code-scanning/`, `container-scanning/`,
  `managing-vulnerabilities/`, `agent-ai-integration/`, `plateform-overview/`, …).
- `latest/api-reference/` is **generated from `latest/api-reference/openapi.json`**.
  Do not hand-write endpoint pages there. A new endpoint is documented as a guide
  page in the relevant area; the reference follows when the spec is regenerated.
- Pages are `.mdx`. Every page needs frontmatter:

  ```yaml
  ---
  title: "Title Case, Short"
  description: "One sentence. What the reader gets, not what the feature is called."
  ---
  ```

## A new page is not live until it is in `docs.json`

`docs.json` holds the Mintlify navigation. A page that is not listed there
renders nowhere. Add the path **without** the `.mdx` extension and **with** a
leading slash: `/latest/managing-vulnerabilities/findings-export`.

## Writing

- **English**, second person, present tense. Say what the reader does.
- Prefer a table or a short code block over a paragraph that describes a shape.
- Mintlify components in use: `<Note>`, `<Tip>`, `<Warning>`, `<Frame>`,
  `<AccordionGroup>` / `<Accordion>`, `<CardGroup>` / `<Card>`, `<Steps>`.
  Use `<Warning>` for breaking changes and for anything with a security
  consequence — not for emphasis.
- Base URLs are regional: `https://api-eu.cybedefend.com` and
  `https://api-us.cybedefend.com`. There is no `api.cybedefend.com`.
- Cross-link with absolute doc paths: `[Findings Export](/latest/managing-vulnerabilities/findings-export)`.

## Before documenting anything from the code

1. **Check the feature survives on `main` today.** Work is sometimes reverted
   after it lands — a commit message is evidence that something happened, never
   evidence that it still exists. Grep `origin/main` for the route, the symbol
   or the table before writing a line about it.
2. **Read the DTOs and the controller, not the commit message.** Parameter
   names, enum values, caps and error codes come from the source. Do not infer
   them, and do not invent examples the code would reject.
3. **Then apply Part 1.** Surviving on `main` makes a change *real*; it does
   not make it *documentable*. Most real changes still belong nowhere near
   these pages.
