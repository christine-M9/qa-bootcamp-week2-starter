# Toolshop test suite

Playwright tests for the [Toolshop practice site](https://practicesoftwaretesting.com). The UI tests and the API tests live in one suite and run with one command.

## Before you start

You need [Node.js](https://nodejs.org/) (the current LTS version) and [Git](https://git-scm.com/). Then get the code:

```bash
git clone https://github.com/christine-M9/qa-bootcamp-week2-starter.git
cd qa-bootcamp-week2-starter
```

## Run the suite in three steps

1. **Install** the packages and the Chromium browser:

   ```bash
   npm install
   npx playwright install chromium
   ```

2. **Copy the settings file:**

   ```bash
   cp .env.example .env
   ```

   On Windows Command Prompt, use `copy .env.example .env` instead.

3. **Run the tests:**

   ```bash
   npm test
   ```

   You should see `7 passed`.

## What the suite tests

| File | Type | What it checks |
|---|---|---|
| `tests/home.spec.ts` | UI | The home page has the Toolshop title. |
| `tests/search.spec.ts` | UI | Searching for "pliers" shows only pliers. |
| `tests/login.spec.ts` | UI | A wrong password shows an error message. |
| `tests/cart.spec.ts` | UI | Adding 3 Pliers puts 3 in the cart, with the right line total. It uses the page objects in `pages/`. |
| `tests/products-api.spec.ts` | API | `GET /products` returns 200 and a list of products. |
| `tests/carts-api.spec.ts` | API | Creating a cart and adding 2 Combination Pliers returns the right fields. |
| `tests/carts-api.spec.ts` | API | A cart id that does not exist returns 404. |

The API tests create their own cart and delete it afterwards, even when a test fails, so no test depends on another test's data.

## Settings

`.env` holds the two addresses the tests use. You only need to change them if your trainer gives you different ones.

| Setting | Used by |
|---|---|
| `TOOLSHOP_URL` | The UI tests |
| `TOOLSHOP_API_URL` | The API tests and `npm run check` |

> **Warning:** never commit `.env`. It is where your own settings and, later in the course, your secrets (keys, tokens, passwords) live. It is listed in `.gitignore` so Git ignores it. Do not remove it from there.

## Useful commands

- `npx playwright test tests/carts-api.spec.ts` runs one file.
- `npx playwright test --trace on` records a trace for each test. Open one with `npx playwright show-trace <path to trace.zip>`.
- `npm run check` checks that your `.env` is set up and that you can reach the Toolshop API.

## Folders

| Folder | What it is for |
|---|---|
| `tests/` | The Playwright tests, UI and API. |
| `pages/` | Page objects for the product page and the cart. |
| `features/` | The cart quantity flow written in Gherkin (`cart.feature`). |
| `docs/` | Notes, such as which test cases to automate. |
| `scripts/` | `check.ts`, run by `npm run check`. |
| `src/` | TypeScript practice files from Day 6. |

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
A typed user profile where `settings` and `settings.notifications` are optional, as they often are in API responses. `isNotified(user)` returns the `notifications` value, or `false` when either field is missing or notifications is turned off, without any runtime errors. It uses optional chaining (`?.`) and nullish coalescing (`??`).

Run it:

```bash
npx tsx src/profile-validator.ts
```

Expected output:

```
User 1 (alice): notified = true
User 2 (bob): notified = false
User 3 (carol): notified = false
User 4 (dave): notified = false
```

Check the types with `npx tsc --noEmit`.
