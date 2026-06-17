# Publishing an npm Package — Field Notes

Personal notes while building and publishing `@salimdellali/ui`.
Goal: turn this into a talk at a local JS event.

---

## The Big Picture

When you publish a package to npm, you are putting a file archive (a **tarball**) on npm's registry.
Anyone who runs `npm install your-package` downloads that tarball, unpacks it into their `node_modules`, and uses whatever files were inside it.

Three things you control:
1. **What goes into the tarball** — the `files` field in `package.json`
2. **How consumers import it** — the `main`, `module`, `exports` fields
3. **What npm does automatically** — lifecycle scripts like `prepublishOnly`

---

## package.json Fields That Matter for Publishing

### `name`
The package identifier on npm. Scoped packages (`@scope/name`) are useful for personal or org namespacing and avoid name collisions.

```json
"name": "@salimdellali/ui"
```

A scoped package is **private by default**. You must opt into public publishing:
```json
"publishConfig": { "access": "public" }
```

---

### `version`
Follows **semver** — `MAJOR.MINOR.PATCH`.

| Change | Bump |
|--------|------|
| Breaking change | MAJOR (`1.0.0 → 2.0.0`) |
| New feature, backwards-compatible | MINOR (`1.0.0 → 1.1.0`) |
| Bug fix | PATCH (`1.0.0 → 1.0.1`) |

npm will reject a publish if the version already exists. You cannot overwrite a published version (by design — consumers depend on immutability).

---

### `files`
Whitelist of what gets packed into the tarball. Everything else is excluded.

```json
"files": ["dist"]
```

Without this, npm uses a default exclusion list, which often packs too much (source files, tests, Storybook config). Be explicit.

**Always check what you are actually publishing:**
```bash
npm pack --dry-run
```
This prints every file that would be included. Run it before every publish.

---

### `main`, `module`, `exports`

These tell consumers (and their bundlers) where to find your code.

```json
"main": "./dist/index.cjs.js",
"module": "./dist/index.es.js",
"types": "./dist/index.d.ts",
"exports": {
  ".": {
    "types": "./dist/index.d.ts",
    "import": "./dist/index.es.js",
    "require": "./dist/index.cjs.js"
  }
}
```

- `main` — CommonJS entry, used by Node.js and older bundlers
- `module` — ES module entry, used by modern bundlers (Vite, Rollup)
- `types` — TypeScript type declarations
- `exports` — modern field that takes priority over `main`/`module`. Supports conditions (`import`, `require`, `types`)

**Why two formats (ES + CJS)?**
- ES modules (`import/export`) enable tree-shaking — bundlers can drop unused code
- CommonJS (`require`) supports older toolchains and Node.js scripts

---

### `peerDependencies`
Libraries your package needs but expects the **consumer to provide**.

```json
"peerDependencies": {
  "react": ">=18.0.0",
  "react-dom": ">=18.0.0"
}
```

React should not be in `dependencies` because:
- You would ship React inside your package → consumer now has two copies of React
- Two React instances break hooks

Rule of thumb: anything the consumer's app already has → `peerDependencies`.
Your own internal utilities → `dependencies`.
Build tools, test frameworks → `devDependencies`.

---

### `sideEffects`
Tells bundlers which files cannot be safely tree-shaken away even if they are not explicitly imported.

```json
"sideEffects": ["**/*.css"]
```

CSS files have side effects (they inject styles globally). Without this flag, a bundler might drop your CSS during tree-shaking and the consumer's UI would break silently.

Set to `false` if your package is entirely side-effect-free (pure functions only).

---

### `private`
```json
"private": false
```
Must be `false` (or absent) to allow publishing. Set to `true` to permanently block publishing — useful for monorepo roots or internal apps.

---

### `type`
```json
"type": "module"
```
Tells Node.js to treat `.js` files in this package as ES modules. Without it, `.js` files are treated as CommonJS.

---

## Lifecycle Scripts

npm runs certain scripts automatically at specific points.

```json
"prepublishOnly": "npm run build"
```

`prepublishOnly` runs **before** `npm publish` but **not** on `npm install`. It is the right place to ensure the `dist/` folder is always fresh before publishing. Without it, you could accidentally publish a stale build.

Common lifecycle order for publishing:
1. `prepublishOnly` — build the package
2. npm packs the tarball
3. npm uploads to the registry

---

## The Build Step

For a component library, you do not publish source TypeScript. You publish compiled output:
- `.js` files — compiled JavaScript (one per format: ES, CJS)
- `.d.ts` files — TypeScript declarations so consumers get autocomplete
- `.css` files — styles

This project uses **Vite** in library mode + **vite-plugin-dts** to generate types:

```ts
// vite.config.ts (simplified)
build: {
  lib: {
    entry: "src/index.ts",
    formats: ["es", "cjs"],
  },
  rollupOptions: {
    external: ["react", "react-dom", "react/jsx-runtime"], // peer deps → exclude from bundle
  },
}
```

`external` is how you tell the bundler not to bundle your peer dependencies. If you forget this, React ends up inside your package's JS file.

---

## Tarball vs Gzipped Bundle

Two different concepts, both involve compression:

**Tarball (`.tgz`)** — the file npm downloads when you `npm install`.
- Contains your `dist/` files, `package.json`, README, LICENSE
- Does NOT contain `node_modules`
- Gets unpacked into the consumer's `node_modules/your-package/`
- Size matters for install speed

**Gzipped bundle** — your JS after a consumer's bundler (Vite, webpack) has processed it, served compressed over HTTP to a browser.
- The consumer builds their app, the bundler pulls in only the parts of your package they use (tree-shaking), bundles it, and the web server gzips the result
- Size matters for the end user's page load time
- A 50KB tarball can produce a 3KB gzipped bundle if most of it is unused and tree-shaken away

---

## Scoped Packages and Access

```bash
# Log in once
npm login

# Publish a scoped public package
npm publish --access public

# Or configure it permanently in package.json:
# "publishConfig": { "access": "public" }
# Then just:
npm publish
```

---

## Checking Before You Publish

```bash
# See exactly what files would be in the tarball
npm pack --dry-run

# Actually create the tarball locally (without uploading)
npm pack

# Install your local tarball in another project to test it
npm install /path/to/your-package-1.0.0.tgz
```

The local tarball install is the most reliable way to test that your package works as a consumer would use it — it bypasses any local symlink tricks.

---

## `.npmignore` vs `files`

Two ways to control what gets published:

- **`files` in package.json** — whitelist (only include what you list). Preferred.
- **`.npmignore`** — blacklist (exclude what you list). Falls back to `.gitignore` if absent.

If both exist, `files` takes precedence. Stick to `files` — it is easier to reason about.

---

## Things That Surprised Me

- **You cannot unpublish after 72 hours.** npm allows unpublish within the first 72 hours, after that the package is permanent (you can deprecate but not delete). Publish deliberately.
- **Version immutability.** You cannot overwrite a published version. If you publish `1.0.0` with a bug, you must publish `1.0.1`.
- **README is your npm page.** Whatever is in `README.md` at publish time is what appears on `npmjs.com`. Write it for consumers, not for contributors.
- **`prepare` vs `prepublishOnly`.** `prepare` runs on `npm install` too (when someone installs your package from git). `prepublishOnly` runs only before publishing. Use the right one.
- **Peer dependency warnings.** If a consumer's React version does not satisfy your `peerDependencies` range, npm will warn them. Set the range generously unless you truly require a specific version.

---

## Bundling Assets — The Self-Contained vs CDN Tradeoff

When your package includes static assets (fonts, icons, images), you have three options:

| Approach | Predictable | Zero deps | Lean bundle |
|---|---|---|---|
| Embed assets (woff2, etc.) | ✓ | ✓ | ✗ |
| npm asset packages (e.g. Fontsource) | ✓ | ✗ | ✗ |
| CDN import (`@import url(...)`) | ✗ | ✓ | ✓ |

The CDN option looks attractive — no bundle cost, no dependencies — but it violates the most important property a package can have: **predictability**.

### What actually happened

This project originally shipped fonts as embedded woff2 files (~1.4 MB). An experiment swapped them for a Google Fonts CDN `@import` to reduce bundle size. The result:

- Google silently served Inter v4 instead of the locally bundled Inter v3
- Inter v4 has different line metrics — different enough to cause visual regressions in Chromatic at font sizes ≥16px
- There is no way to pin a version on the Google Fonts CDN URL
- jsDelivr supports version pinning but is still a runtime network dependency — one that can be blocked (e.g. China), go down, or change

### The rule of thumb

- **Apps** → CDN is fine. You control the deployment environment and a network request is negligible.
- **Libraries/packages** → embed assets. You do not control where your package runs — CI pipelines, offline dev environments, locked-down enterprise networks. Predictability beats leanness.

A 1.4 MB font cost shipped inside a package is paid once and cached by the browser. A CDN dependency is paid on every environment, forever, with no guarantee of consistency.

### Lesson

If your package produces different visual output depending on what a third-party server decides to serve that day, it is not a reliable package. For a UI kit, stability is more valuable than a smaller tarball.

---

## Talk Outline Ideas

1. What is npm and the registry
2. Anatomy of a package.json (name, version, files, exports, peerDeps)
3. Why you build before publish (source → dist)
4. The tarball — what is actually uploaded
5. Scoped packages and access
6. `npm pack --dry-run` — always check before you ship
7. Semver — why it matters for consumers
8. Common mistakes (forgetting `external`, no `files` field, wrong `peerDependencies`)
9. Live demo: publish v1.0.0 of a toy package
