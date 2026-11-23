# QA Bootcamp Week 2 Starter

This is the starting point for Week 2 of the QA bootcamp. During the week you will use it to practise:

- TypeScript
- Playwright (UI testing)
- Postman (API testing)
- The Toolshop REST API

There are no tests in this repo. You will write them during the week.

## Prerequisites

Install these before you start:

- [Node.js](https://nodejs.org/) (the current LTS version)
- [Git](https://git-scm.com/)
- [VS Code](https://code.visualstudio.com/)

## Setup

Run these steps in order from a terminal.

1. Clone the repo and open the folder:

   ```bash
   git clone <repo-url>
   cd qa-bootcamp-week2-starter
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Install the Chromium browser for Playwright:

   ```bash
   npx playwright install chromium
   ```

4. Copy `.env.example` to `.env`:

   ```bash
   cp .env.example .env
   ```

   `.env` already contains the Toolshop website URL (`TOOLSHOP_URL`) and the Toolshop API URL (`TOOLSHOP_API_URL`). Only change them if your trainer gives you different URLs.

5. Check that your setup works:

   ```bash
   npm run check
   ```

   This sends a GET request to the Toolshop API's `/products` endpoint (no login needed). If everything is set up correctly, it prints your Node version, the HTTP status (200), the number of products, and a last line that says `PASS`.

> **Warning:** never commit `.env`. It is where your own settings and, later in the course, your secrets (keys, tokens, passwords) live. It is listed in `.gitignore` so Git ignores it. Do not remove it from there.

## Folders

| Folder     | What it is for |
|------------|----------------|
| `tests/`   | Your Playwright tests. It is empty for now; you will add tests during the week. |
| `scripts/` | Helper scripts. `check.ts` checks your setup and is run by `npm run check`. |

## Scripts

- `npm run check`: checks your `.env` and that you can reach the Toolshop API.
- `npm test`: runs the Playwright tests in `tests/`.

## Day 6: TypeScript basics and profile validator

### `src/ts-basics/`
One file per topic from the TypeScript tutorial. Run any of them with `npx tsx src/ts-basics/<file>.ts`.

| File | What it shows |
|---|---|
| `first-program.ts` | A variable with a type annotation |
| `tuples.ts` | Fixed length arrays where each position has its own type |
| `functions.ts` | Typed parameters, a default parameter and a return type |
| `objects.ts` | Inline object types, `readonly` and an optional property (`name?`) |
| `type-aliases.ts` | Naming an object shape with `type` so it can be reused |
| `union-types.ts` | A value that can be a `number` or a `string`, with narrowing |
| `optional-chaining.ts` | Reading values that might be missing with `?.` |

### `src/profile-validator.ts`
A typed user profile where `settings` and `settings.notifications` are optional, as they often are in API responses. `isNotified(user)` returns the `notifications` value, or `false` when either field is missing, without any runtime errors. It uses optional chaining (`?.`) and nullish coalescing (`??`).

Run it:

```bash
npx tsx src/profile-validator.ts
```

Expected output:

```
User 1 (alice): notified = true
User 2 (bob): notified = false
User 3 (carol): notified = false
```

Check the types with `npx tsc --noEmit`.
