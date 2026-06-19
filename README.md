# Student Finance Tracker

A responsive, accessible, vanilla HTML/CSS/JavaScript web app that helps
students log expenses, track spending by category, set a monthly budget,
and search/sort their records — all stored locally in the browser.

**Live demo:** `https://<your-username>.github.io/<your-repo-name>/`
**Author:** Marion Gitau
**Email:** m.gitau@alustudent.com
**GitHub:** [mgitau-sys] https://github.com/mgitau-sys/Final-Student-Finance-Tracker-System.git
     
    Live github pages url:[ https://mgitau-sys.github.io/Final-Student-Finance-Tracker-System/]
    unlisted demo video url:



---

## Chosen Theme

**Student Finance Tracker** — tracks transactions with a description,
amount, category, and date. Includes a dashboard with totals, a budget
cap with live status messages, and manual currency conversion.

---

## Setup / How to Run

This is a static site — no build step, no npm install required.

1. Clone the repository:
   ```bash
   git clone https://github.com/mgitau-sys/<your-repo-name>.git
   cd <your-repo-name>
   ```
2. Open `index.html` directly in your browser, **or** serve it locally
   (recommended, since ES modules require a server in some browsers):
   ```bash
   npx serve .
   ```
   or, if you have Python installed:
   ```bash
   python3 -m http.server
   ```
3. Visit the local address shown in your terminal (e.g.
   `http://localhost:3000`).

No API keys, accounts, or backend are needed. All data is saved to your
browser's `localStorage`.

---

## Features

- **Dashboard** — total records, total spending, top category, and a
  7-day spending trend chart.
- **Budget cap** — set a monthly limit in Settings; see remaining
  budget or an over-budget warning, announced via ARIA live regions.
- **Records table** — view all transactions, sortable by date,
  description (A–Z / Z–A), or amount (low–high / high–low).
- **Regex-powered live search** — type a pattern to filter records in
  real time, with a case-insensitive toggle and safe error handling for
  invalid patterns.
- **Add / Edit form** — fully validated with regex rules (see catalog
  below); inline error messages per field.
- **Edit & delete** — inline edit pre-fills the form; delete asks for
  confirmation before removing a record.
- **Currency settings** — base currency (KES/USD/EUR) with manually
  entered exchange rates.
- **Import / Export** — back up all data as a JSON file, or load it
  back in with structure validation.
- **Accessibility-first** — semantic landmarks, labeled inputs, visible
  focus states, skip link, and ARIA live announcements throughout.
- **Responsive design** — mobile-first layout tested at ~360px, 768px,
  and 1024px breakpoints.

---

## Regex Catalog

All validation patterns live in `scripts/validators.js`.

| Field | Pattern | Purpose | Valid Example | Invalid Example |
|---|---|---|---|---|
| Description | `/^\S(?:.*\S)?$/` | No leading/trailing spaces | `Lunch at cafeteria` | `  Lunch ` |
| Amount | `/^(0\|[1-9]\d*)(\.\d{1,2})?$/` | Whole number or up to 2 decimals, no leading zeros | `12.50` | `12.500`, `-5` |
| Date | `/^\d{4}-(0[1-9]\|1[0-2])-(0[1-9]\|[12]\d\|3[01])$/` | Strict `YYYY-MM-DD` format | `2025-09-29` | `29-09-2025` |
| Category | `/^[A-Za-z]+(?:[ -][A-Za-z]+)*$/` | Letters, spaces, and hyphens only | `Self-Care` | `Food2` |
| **Advanced:** Duplicate word | `/\b(\w+)\s+\1\b/i` | Back-reference — flags a word repeated consecutively in the description | rejects `coffee coffee` | allows `coffee and coffee` |

The duplicate-word rule is the **advanced regex** requirement: it uses a
**back-reference** (`\1`) to catch a captured word (`\w+`) repeated
immediately after itself, separated only by whitespace.

---

## Keyboard Map

The app is fully operable without a mouse.

| Key | Action |
|---|---|
| `Tab` / `Shift + Tab` | Move forward / backward through links, inputs, and buttons |
| `Enter` | Activate the focused link or button; submit the form when focused on the submit button |
| `Space` | Activate a focused button or toggle a checkbox |
| `Escape` | Close the mobile navigation menu (when open) |
| `Arrow keys` | Move between options in `<select>` dropdowns (native browser behavior) |

The **skip link** (first focusable element on the page) lets keyboard
users jump straight to `<main>`, bypassing the header and navigation.

---

## Accessibility (a11y) Notes

- **Landmarks:** `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`
  are used throughout for clear page structure.
- **Labels:** Every form input has a `<label for="">` correctly bound
  to its `id` — no placeholder-only labeling.
- **Skip link:** `Skip to content` link at the very top of the page.
- **Visible focus:** All interactive elements show a visible focus
  outline; outlines are never removed without a replacement style.
- **Live regions:**
  - `#budget-message` uses `role="status"` + `aria-live="polite"` for
    routine remaining-budget updates.
  - `#budget-alert` uses `aria-live="assertive"` so an over-budget
    warning interrupts and is announced immediately.
  - `#search-error` uses `role="alert"` for invalid regex patterns.
- **Color contrast:** Text/background combinations meet WCAG AA
  contrast (4.5:1 minimum for normal text).
- **Responsive & zoom-friendly:** Layout adapts at ~360px, 768px, and
  1024px and remains readable when the page is zoomed.

---

## How to Run Tests

Validator tests live in `tests.html` at the project root and run
directly in the browser — no test framework or build step needed.

1. Open `tests.html` in your browser (double-click the file, or visit
   it via your local server, e.g. `http://localhost:3000/tests.html`).
2. Results appear directly on the page: each test shows a **PASS** or
   **FAIL** badge, grouped by validator function.
3. A summary banner at the top shows whether all tests passed.

The tests cover `validateDescription`, `validateAmount`, `validateDate`,
and `validateCategory`, including specific cases for the advanced
duplicate-word back-reference rule.

---

## Project Structure

```
project/
├── index.html                          — main page markup, all 5 sections
├── tests.html                          — validator test runner (M3)
├── seed.json                           — sample starter records
├── README.md                           — this file
├── docs/
│   └── M1-spec.md                      — written spec, data model, a11y plan
├── assets/
│   └── docs/
│       └── wireframes/
│           ├── Dashboard.jpeg          — dashboard wireframe sketch
│           ├── expenses.jpeg           — records/table wireframe sketch
│           └── settings.jpeg           — settings wireframe sketch
├── styles/
│   ├── main.css                        — variables, base styles, header/nav
│   ├── components.css                  — cards, buttons, table, form styling
│   └── layout.css                      — responsive grid/spacing, breakpoints
└── scripts/
    ├── main.js        — entry point; wires up all event listeners and form submit
    ├── state.js        — central in-memory state + localStorage load/save + CRUD (add/edit/delete/sort records)
    ├── validators.js   — all regex validation rules (description, amount, date, category, duplicate-word)
    ├── search.js       — safely compiles the live regex search pattern and highlights matches
    ├── ui.js            — renders the expense table rows, applying search filtering/highlighting
    ├── dashboard.js    — stats calculations (totals, top category, budget status) and 7-day trend chart
    ├── currency.js     — exchange rate conversion and currency formatting
    └── files.js         — JSON export and import (with structure validation)
```

---

## Demo Video

`<link to your unlisted demo video here>`

The video demonstrates keyboard-only navigation, regex search edge
cases, and the JSON import/export round-trip.