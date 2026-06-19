import { 
    validateDescription, 
    validateAmount, 
    validateDate, 
    validateCategory 
} from './validators.js';

import { 
    loadStateFromStorage, 
    sortRecords,
    addRecord 
} from './state.js';

import { 
    renderTableRows 
} from './ui.js';

// Waiting for the HTML layout to load completely
document.addEventListener('DOMContentLoaded', () => {

    // === 1. STATE INITIALIZATION & INITIAL RENDER ===
    loadStateFromStorage();
    renderTableRows();

    // === 2. SORT AND LIVE REGEX SEARCH CONTROLS (Milestone 4) ===
    const sortSelect = document.getElementById('sort-select');
    const searchInput = document.getElementById('search-pattern');
    const ignoreCaseCheck = document.getElementById('ignore-case');

    if (sortSelect) {
        sortSelect.addEventListener('change', () => {
            sortRecords(sortSelect.value); // Rearrange data positions in state array
            renderTableRows();             // Redraw updated order on screen
        });
    }

    if (searchInput) {
        searchInput.addEventListener('input', () => {
            renderTableRows(); // Filter and highlight table live on every single keystroke!
        });
    }

    if (ignoreCaseCheck) {
        ignoreCaseCheck.addEventListener('change', () => {
            renderTableRows(); // Instantly update text casing search parameters
        });
    }

    // === 3. CORE ADD-EXPENSE FORM WORKSPACE ===
    const form = document.getElementById('expense-form');
    if (!form) return; // Prevent errors if executing script on non-existent view markup

    // Monitor input changes 
    const descriptionInput = document.getElementById('description');
    const amountInput = document.getElementById('amount');
    const dateInput = document.getElementById('date');
    const categorySelect = document.getElementById('category');

    // Attaching real-time validation alerts
    descriptionInput.addEventListener('input', () => {
        const result = validateDescription(descriptionInput.value);
        document.getElementById('description-error').innerText = result.valid ? "" : result.message;
    });

    amountInput.addEventListener('input', () => {
        const result = validateAmount(amountInput.value);
        document.getElementById('amount-error').innerText = result.valid ? "" : result.message;
    });

    dateInput.addEventListener('change', () => {
        const result = validateDate(dateInput.value);
        document.getElementById('date-error').innerText = result.valid ? "" : result.message;
    });

    categorySelect.addEventListener('change', () => {
        const result = validateCategory(categorySelect.value);
        document.getElementById('category-error').innerText = result.valid ? "" : result.message;
    });

    // Handles form submission 
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Stop page refresh

        const descriptionCheck = validateDescription(descriptionInput.value);
        const amountCheck = validateAmount(amountInput.value);
        const dateCheck = validateDate(dateInput.value);
        const catCheck = validateCategory(categorySelect.value);

        // Display all errors if any field is invalid
        document.getElementById('description-error').innerText = descriptionCheck.valid ? "" : descriptionCheck.message;
        document.getElementById('amount-error').innerText = amountCheck.valid ? "" : amountCheck.message;
        document.getElementById('date-error').innerText = dateCheck.valid ? "" : dateCheck.message;
        document.getElementById('category-error').innerText = catCheck.valid ? "" : catCheck.message;

        if (descriptionCheck.valid && amountCheck.valid && dateCheck.valid && catCheck.valid) {
            
            // 4. SAVE NEW EXPENSE TO STATE ENGINE (Milestone 4 Integration)
            addRecord(
                descriptionInput.value,
                amountInput.value,
                categorySelect.value,
                dateInput.value
            );

            // 5. RE-RENDER TABLE MATRIX & RESET THE FORM INTERFACES
            renderTableRows();
            form.reset();
            
            alert("Expense record successfully captured and stored in LocalStorage!");
        }
    });
});