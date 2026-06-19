import { state } from './state.js';
import { compileSearchRegex, highlightTextMatches } from './search.js';

/**
 * Renders the expense array into your HTML <tbody> with live search filtering and highlighting
 */
export function renderTableRows() {
    const tableBody = document.getElementById('expense-list');
    const searchInput = document.getElementById('search-pattern');
    const ignoreCaseCheck = document.getElementById('ignore-case');
    const searchError = document.getElementById('search-error');

    if (!tableBody) return;

    // 1. Clear out the old rows
    tableBody.innerHTML = "";

    // 2. Compile our live search regular expression safely
    const queryText = searchInput ? searchInput.value : "";
    const ignoreCase = ignoreCaseCheck ? ignoreCaseCheck.checked : true;
    
    const searchResult = compileSearchRegex(queryText, ignoreCase);

    // If the regex has a syntax error (like an open brackets [), show it on screen
    if (searchResult && searchResult.error) {
        if (searchError) searchError.innerText = "Invalid Regex: " + searchResult.error;
        return; 
    } else if (searchError) {
        searchError.innerText = ""; // Clear any old errors
    }

    const regex = searchResult ? searchResult.regex : null;

    // 3. Filter and Draw Rows
    state.expenses.forEach((expense) => {
        // If a regex search pattern is typed, see if it matches our item description or category
        if (regex) {
            const matchesDesc = regex.test(expense.description);
            const matchesCat = regex.test(expense.category);
            if (!matchesDesc && !matchesCat) return; // Skip this item if it doesn't match
        }

        // Apply visual highlighting tags safely using our search tool
        const displayedDesc = regex ? highlightTextMatches(expense.description, regex) : expense.description;
        const displayedCat = regex ? highlightTextMatches(expense.category, regex) : expense.category;

        // Generate the native table row markup
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${expense.date}</td>
            <td>${displayedDesc}</td>
            <td>${expense.category}</td>
            <td>${state.settings.baseCurrency} ${expense.amount.toFixed(2)}</td>
            <td>
                <button class="edit-btn" data-id="${expense.id}">Edit</button>
                <button class="delete-btn" style="background-color: #c62828;" data-id="${expense.id}">Delete</button>
            </td>
        `;
        tableBody.appendChild(tr);
    });
}