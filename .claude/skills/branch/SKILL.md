---
name: branch
description: Start a new branch from a clean main — checks for uncommitted changes, suggests a branch name, creates the branch, and prompts you to start working.
---

You are running an interactive branch creation workflow. Follow these steps in order.

## Step 1 — Clean slate check

Run `git status`.

If there are uncommitted changes, list every dirty file and **stop**. Tell the user exactly what is uncommitted and ask them to stash or revert before running `/branch` again. Do not proceed.

If the working tree is clean, proceed to step 2.

## Step 2 — Suggest a branch name

If the user passed arguments to `/branch` (e.g. `/branch add button component`), use those as context for the branch name suggestion.

If no arguments were passed, ask the user in one sentence: "What are you working on?"

Wait for their answer, then suggest a branch name following this convention:
- `claude/feat/` — new feature or story
- `claude/fix/` — bug fix
- `claude/ci/` — CI/CD or workflow changes
- `claude/chore/` — tooling, config, non-src maintenance
- `claude/docs/` — documentation only

Keep the slug short and kebab-case (e.g. `claude/feat/add-button-component`).

Show the suggestion and ask: "Branch name? (y / n / or anything else)"

- `y` → use the suggested name
- `n` → stop
- anything else typed → use that as the branch name

## Step 3 — Create the branch

Run:
```
git checkout -b <branch-name>
```

Confirm the branch was created and which branch you're now on.

## Step 4 — Go

Tell the user: "You're on `<branch-name>`. Start your work — run `/ship` when you're done."
