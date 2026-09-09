# Conventions — CybeDefend docs

Read this before adding or editing a page. It exists so that every automated
documentation pass produces the same shape, rather than re-deciding each time.

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
3. **Mark breaking changes as breaking.** If an existing integration must
   change, say so in a `<Warning>` and show the before/after payload.

## Scope

Document what a user or an integrator can observe: endpoints, parameters,
permissions, settings, quotas, CLI flags, breaking changes. Skip refactors,
dependency bumps, test changes and internal performance work.
