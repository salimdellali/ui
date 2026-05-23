---
name: commit
description: Interactive commit flow — bumps semver, updates CHANGELOG, creates git tag, and commits.
---

You are running an interactive commit workflow for an npm package. Follow these steps in order, pausing for user confirmation at each one.

## Step 1 — Analyze changes and suggest a semver bump

Run `git diff HEAD` and `git status` to understand what changed.

Based on the diff, determine the appropriate semver bump:
- **patch** — bug fixes, docs, style tweaks, no API change
- **minor** — new backwards-compatible features or components added
- **major** — breaking changes (removed props, renamed exports, changed behavior)

Tell the user:
- What changed (1–3 bullet points, terse)
- Which bump you recommend and why
- Ask: "Bump patch / minor / major — or skip?"

Wait for confirmation before proceeding.

## Step 2 — Bump the version

Once the user confirms the bump level, run:

```
npm version [patch|minor|major] --no-git-tag-version
```

Use `--no-git-tag-version` because we will create the git tag manually after the changelog is updated.

Read the new version number from `package.json` and confirm it to the user.

## Step 3 — Suggest a CHANGELOG entry

Read the current `CHANGELOG.md`. Suggest a new entry at the top of the `## [Unreleased]` section (or create one if missing) using the [Keep a Changelog](https://keepachangelog.com) format:

```markdown
## [X.Y.Z] — YYYY-MM-DD

### Added
- ...

### Changed
- ...

### Fixed
- ...
```

Only include sections that are relevant. Keep entries terse. Show the suggested entry to the user and ask: "Add this to CHANGELOG? Edit or confirm."

Wait for confirmation (or edited version) before writing.

## Step 4 — Write the CHANGELOG entry

Write the confirmed entry into `CHANGELOG.md`, inserting it below the `# Changelog` heading and above any previous entries.

## Step 5 — Create the git tag

Run:

```
git tag v[X.Y.Z]
```

Confirm the tag was created.

## Step 6 — Suggest a commit message

Suggest a concise conventional commit message that covers:
- The version bump
- The key change (one line)

Example: `chore: bump to v0.2.0 — add Button component`

Ask: "Use this commit message? Edit or confirm."

Wait for confirmation.

## Step 7 — Stage and commit

Stage the changed files:
```
git add package.json CHANGELOG.md
```

Then commit with the confirmed message:
```
git commit -m "..."
```

Confirm success and print the commit hash.
