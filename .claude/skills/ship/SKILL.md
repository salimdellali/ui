---
name: ship
description: Full PR lifecycle after work is done — commit (with optional changelog and version bump), push, open PR, watch CI, merge to main.
---

You are running an interactive ship workflow. Follow these steps in order, pausing for user confirmation at each marked pause.

## Step 1 — Guard check

Run `git branch --show-current`. If on `main`, **stop** and tell the user to run `/branch` first to create a feature branch before shipping.

Run `git status`. Summarize what has changed (modified, added, deleted files). This is what will be committed — make sure the user is aware of everything in scope.

## Step 2 — Run tests locally

Run:
```
npm run test
```

Component behavior tests (Storybook `play` functions via `@storybook/addon-vitest`) are **not** wired into `ci.yml` — deliberately, to keep CI fast while components are still being scaffolded. This step is the substitute gate: it must pass before shipping.

If it fails: **stop**. Show the failure output and tell the user to fix it before continuing. Do not proceed to Step 3.

If it passes: proceed.

## Step 3 — Determine commit type

Check whether `src/index.ts` changed (consumer-facing package change).

**If `src/index.ts` changed:**
1. Read the current version from `package.json`. Explain what changed and recommend a semver bump:
   - `patch` — fix or tweak to an existing component, no new or removed exports
   - `minor` — new component exported, OR a removal/breaking change while still on v0.x (semver allows this before v1)
   - `major` — breaking change on v1+: removed export, renamed prop, changed behavior that breaks consumers

   Ask: "Version bump? (major / minor / patch)"
   Wait for answer.
2. Run `npm version [patch|minor|major] --no-git-tag-version`
3. Read new version from `package.json` and confirm it.
4. Suggest a CHANGELOG entry using [Keep a Changelog](https://keepachangelog.com) format. Show it and ask: "Add to CHANGELOG? (y / n / or anything else)"
   - `y` → write the suggested entry
   - `n` → stop
   - anything else → process what the user said
   Wait before writing.
5. Write the confirmed entry into `CHANGELOG.md` below the `# Changelog` heading.

**If `src/index.ts` did not change:**
Skip version bump and CHANGELOG. Proceed to step 4.

## Step 4 — Suggest commit message

Suggest a concise conventional commit message using one of:
- `(claude) feat:` — new feature
- `(claude) fix:` — bug fix
- `(claude) ci:` — CI/workflow
- `(claude) chore:` — tooling/config
- `(claude) docs:` — docs only
- `(claude) refactor:` — refactor with no behavior change

Show the suggested message and ask: "Commit message? (y / n / or anything else)"

- `y` → use the suggestion
- `n` → stop
- anything else typed → process what the user said

## Step 5 — Stage and commit

Show all files that will be staged (`git status`). Ask: "Stage all and commit? (y / n)"

- `y` → use the suggestion
- `n` → stop

Wait for confirmation. If `y`, run:
```
git add -A
git commit -m "$(cat <<'EOF'
<confirmed message>

Co-Authored-By: <current model name> <noreply@anthropic.com>
EOF
)"
```

`<current model name>` must be the actual model running this session (e.g. "Claude Sonnet 5", "Claude Fable 5") — check the system info for the session's real model name each time rather than reusing whatever name appears in this file, since that goes stale the moment you switch models (for cost, capability, or availability reasons). Never hardcode a specific model name here.

Print the commit hash on success.

Do **not** tag here — the branch may still get fix commits pushed during Step 8's CI iteration, which would leave an early tag pointing at a stale commit. Tagging happens in Step 10, after everything is actually merged.

## Step 6 — Push

Run:
```
git push -u origin <branch-name>
```

Confirm the push succeeded.

## Step 7 — Open PR

Suggest a PR title (same as the commit message by default) and a short body covering what changed and a markdown test checklist.

Show the planned title and body. Ask: "Open PR with this? (y / n / or anything else)"

- `y` → open the PR as shown
- `n` → stop
- anything else typed → process what the user said

Then run:
```
gh pr create --title "..." --body "..."
```

Print the PR URL.

## Step 8 — Watch CI checks

Run:
```
gh pr checks --watch
```

This streams live check results in the terminal and blocks until all checks complete.

If any check failed: **stop**. List the failed checks and tell the user to fix the failures before merging. Do not proceed.

If all checks passed: ask "All checks passed. Merge to main? (y / n)"

- `y` → merge and clean up (see step 9)
- `n` → stop

Wait for confirmation before proceeding.

## Step 9 — Merge and clean up

Run:
```
gh pr merge --merge --delete-branch
```

Confirm the merge succeeded, the branch was deleted, and the user is back on `main`.

## Step 10 — Tag and publish to npm (only if a version bump happened in step 3)

If no version bump happened in step 3, skip this step entirely.

Pull the latest `main` so the local branch is up to date after the merge:
```
git pull origin main
```

Show the commit that's about to be tagged, so it's visibly the right one before acting:
```
git log -1 --oneline
```

Tag `main`'s current HEAD with the version from step 3 — do this now, not earlier, so the tag always points at the exact commit that was actually merged, including any fix commits pushed during Step 8's CI iteration:
```
git tag v[X.Y.Z]
```

Push the tag. This triggers the `publish-npm.yml` GitHub Actions workflow which builds and publishes the package to npm automatically:
```
git push origin v[X.Y.Z]
```

Watch the publish workflow:
```
gh run watch $(gh run list --workflow=publish-npm.yml --limit=1 --json databaseId --jq '.[0].databaseId')
```

If the workflow succeeds: tell the user the package is live on npm under the new version.
If it fails: tell the user to check the logs with `gh run view --log-failed`.
