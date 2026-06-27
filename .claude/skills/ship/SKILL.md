---
name: ship
description: Full PR lifecycle after work is done — commit (with optional changelog and version bump), push, open PR, watch CI, merge to main.
---

You are running an interactive ship workflow. Follow these steps in order, pausing for user confirmation at each marked pause.

## Step 1 — Guard check

Run `git branch --show-current`. If on `main`, **stop** and tell the user to run `/branch` first to create a feature branch before shipping.

Run `git status`. Summarize what has changed (modified, added, deleted files). This is what will be committed — make sure the user is aware of everything in scope.

## Step 2 — Determine commit type

Check whether `src/index.ts` changed (consumer-facing package change).

**If `src/index.ts` changed:**
1. Explain what changed and recommend a semver bump (patch / minor / major).
   Ask: "Version bump? (patch / minor / major)"
   Wait for answer.
2. Run `npm version [patch|minor|major] --no-git-tag-version`
3. Read new version from `package.json` and confirm it.
4. Suggest a CHANGELOG entry using [Keep a Changelog](https://keepachangelog.com) format. Show it and ask: "Add to CHANGELOG? (y / n / or anything else)"
   - `y` → write the suggested entry
   - `n` → stop
   - anything else → process what the user said
   Wait before writing.
5. Write the confirmed entry into `CHANGELOG.md` below the `# Changelog` heading.
6. Run `git tag v[X.Y.Z]`

**If `src/index.ts` did not change:**
Skip version bump and CHANGELOG. Proceed to step 3.

## Step 3 — Suggest commit message

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

## Step 4 — Stage and commit

Show all files that will be staged (`git status`). Ask: "Stage all and commit? (y / n)"

- `y` → use the suggestion
- `n` → stop

Wait for confirmation. If `y`, run:
```
git add -A
git commit -m "$(cat <<'EOF'
<confirmed message>

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
EOF
)"
```

Print the commit hash on success.

## Step 5 — Push

Run:
```
git push -u origin <branch-name>
```

Confirm the push succeeded.

## Step 6 — Open PR

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

## Step 7 — Watch CI checks

Run:
```
gh pr checks --watch
```

This streams live check results in the terminal and blocks until all checks complete.

If any check failed: **stop**. List the failed checks and tell the user to fix the failures before merging. Do not proceed.

If all checks passed: ask "All checks passed. Merge to main? (y / n)"

- `y` → merge and clean up (see step 8)
- `n` → stop

Wait for confirmation before proceeding.

## Step 8 — Merge and clean up

Run:
```
gh pr merge --merge --delete-branch
```

Confirm the merge succeeded, the branch was deleted, and the user is back on `main`.

## Step 9 — Publish to npm (only if a version tag was created in step 2)

If no version bump happened in step 2, skip this step entirely.

Pull the latest `main` so the local branch is up to date after the merge:
```
git pull origin main
```

Then push the tag that was created in step 2. This triggers the `publish-npm.yml` GitHub Actions workflow which builds and publishes the package to npm automatically:
```
git push origin v[X.Y.Z]
```

Watch the publish workflow:
```
gh run watch $(gh run list --workflow=publish-npm.yml --limit=1 --json databaseId --jq '.[0].databaseId')
```

If the workflow succeeds: tell the user the package is live on npm under the new version.
If it fails: tell the user to check the logs with `gh run view --log-failed`.
