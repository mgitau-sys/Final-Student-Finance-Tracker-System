# Student Finance Tracker (Vanilla Web Suite)

An accessible, responsive, mobile-first single-page application built using pure vanilla HTML5, CSS3, and modern modular JavaScript (ES Modules). Designed for students to seamlessly manage personal budgets, track expenses across multiple currencies, and perform deep analytical live searches using safe Regular Expressions.

**Live Deployment URL:** [https://YOUR-GITHUB-USERNAME.github.io/YOUR-REPO-NAME/](https://YOUR-GITHUB-USERNAME.github.io/YOUR-REPO-NAME/)  
**Demo Video Presentation:** [Unlisted Video Link Here (Walkthrough of Keyboard Navigation, Regex, and Import/Export)]

---

## 📋 Table of Contents
1. [Core Features](#-core-features)
2. [Regular Expression (Regex) Catalog](#-regular-expression-regex)
3. [Accessibility (a11y) & UX Engineering](#-accessibility-a11y--ux)
4. [Keyboard Navigation Map](#-keyboard-navigation-map)
5. [System Architecture & Module Layout](#-system-architecture)
6. [Testing Environment Framework](#-testing-environment)
7. [Development Roadmap (Commit Progress)](#-development-roadmap)

---

## 🛠️ Core Features

*   **Dynamic Sections Layout:** A completely responsive Single Page Application (SPA) structured using native semantic milestones including: *About, Dashboard/Stats, Records Matrix, Entry Forms, and Settings*.
*   **Live Aggregates & Chart Metrics:** Automatically tallies spending metrics, dynamically flags top categorical spending groups, and tracks trailing 7-day spending trends via a native CSS/JS visualization component.
*   **Flexible Currency Conversions:** Runs on a base currency configuration ($USD) with multi-conversion fields supporting alternate exchange calculations ($EUR, $GBP) modifiable inside local application settings panels.
*   **State Automation Engine:** Keeps operations localized using automated background updates to local transaction tracking properties (`localStorage`) combined with comprehensive structural validations matching external JSON imports/exports.

---

## 📊 Regular Expression (Regex) Catalog

The input filtering framework uses strict regular expressions to validate manual user data entries, alongside a highly resilient live search processing compiler wrapped safely within execution boundary blocks (`try/catch`).

| Target Input Element | Regular Expression Expression | Validation Logic & Boundaries |
| :--- | :--- | :--- |
| **Description / Title** | `/^\S(?:.*\S)?$/` | Mandates text input entry; strictly forbids or strips leading/trailing blanks while compressing nested double spaces. |
| **Numeric Expense Amount**| `^(0\|[1-9]\d*)(\.\d{1,2})?$` | Enforces absolute numeric bounds; accepts whole counts or integers terminating at exact 2-decimal fractional limits (e.g., `15`, `45.50`). |
| **Calendar Tracker Date**| `^\d{4}-(0[1-9]\|1[0-2])-(0[1-9]\|[12]\d\|3[01])$` | Enforces structural standard compliance; tracks input layout syntax using strict `YYYY-MM-DD` notation formats. |
| **Category Selection / Tag**| `^[A-Za-z]+(?:[ -][A-Za-z]+)*$` | Confirms structural labels use literal alphabet arrays separated by internal hyphens or spaces without trailing grammar marks. |
| **Advanced Syntax Match** | `\b(\w+)\s+\1\b` | **Back-reference Lookback:** Catches duplicate input anomalies in real time (e.g., intercepts accidental double entries like `"Coffee Coffee"`). |

### Custom Live Search Patterns (Examples to Test)
*   **Cents Search:** `/\.\d{2}\b/` — Instantly surfaces items matching exact decimal fractional structures.
*   **Beverage Keyword Match:** `/(coffee\|tea)/i` — Filters relevant string values globally disregarding text casing boundaries.

---

## ♿ Accessibility (a11y) & UX Engineering

This interface was designed from the ground up for strict accessibility compliance, making it fully usable via screen readers and keyboard controls alone.

*   **Skip-to-Content Utility Link:** The absolute first focusable element inside the document layout, enabling keyboard-only users to skip past navigation menus directly to the workspace area.
*   **Visual Focus Highlight Indicators:** Built using zero-fallout, modern `:focus-visible` outline boundaries (`3px solid var(--accent-focus)`) with a clean layout separation space (`outline-offset: 2px`). This ensures high visibility without impacting standard mouse click events.
*   **Proactive ARIA Live Announcements:**
    *   Monitors and announces structural application shifts or error entries using an explicit live component container: `<div role="status" aria-live="polite"></div>`.
    *   **Budget Cap Logic:** If spending remains securely under specified limitations, updates are broadcast quietly (`polite`). The moment expenditures push past the user-defined cap, the container switches programmatically to an urgent alert level (`aria-live="assertive"`), prompting screen readers to interrupt immediately.

---

## ⌨️ Keyboard Navigation Map

| Target Hotkey Control | Functional Event Path Triggered |
| :--- | :--- |
| `Tab` | Progresses structural keyboard focus down through input items, selection buttons, and link options. |
| `Shift + Tab` | Reverses keyboard focus vector upwards back through accessible layout interactive nodes. |
| `Enter` / `Space` | Fires selected button events, registers operational input forms, or toggles interface section links. |
| `Escape (Esc)` | Immediately dismisses open entry dialog windows or safely cancels active entry modifications. |

---

## 📁 System Architecture & Module Layout

The application utilizes a clean, modular structure built entirely on native ES Modules, keeping code organized without any complex build tools.

```text
├── index.html          # Core single-page template with semantic structural milestones
├── seed.json           # 10 diverse, complex testing entries initialized for ingestion
├── styles/
│   ├── main.css        # System layout design variables, standard reset rules, typography tokens
│   ├── layout.css      # Mobile-first design framework supporting 3 distinct responsive breakpoints
│   └── components.css  # Presentation rules for form controls, matrix sheets, alerts, and custom metrics
└── scripts/
    ├── main.js         # Entry bootstrap orchestrator managing structural view transitions
    ├── state.js        # Single-source state manager handling calculations and mutations
    ├── storage.js      # Local storage access layer and import/export structural sanitizers
    ├── ui.js           # Document renderer managing data grids, charts, and secure text highlighting
    ├── validators.js   # Pure regex validation engines confirming field entry configurations
    └── search.js       # Safe live dynamic search runtime wrapped within try/catch blocks