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

import { updateDashboard } from './dashboard.js';

// Waiting for the HTML layout to load completely
document.addEventListener('DOMContentLoaded', () => {

    //getting html elements
    const form = document.getElementById('expense-form');
    const sortSelect = document.getElementById('sort-select');
    const searchInput = document.getElementById('search-pattern');
    const ignoreCaseCheck = document.getElementById('ignore-case');

    //The centralised view manager
    function updateView() {
        // Re-arranging data positions based on the user drop down menu choice
        if (sortSelect) {
            sortRecords(sortSelect.value);
        }
        //Re-rendering the arranged table rows
        renderTableRows();
        //updating the dashboard
        updateDashboard();
    }
    loadStateFromStorage();//pulling past entries from local storage
    updateView();

    // we now replace the re-rendering with the function updateView
    if (sortSelect) {
        sortSelect.addEventListener('change', updateView);
    }
    
    if (searchInput) {
        searchInput.addEventListener('input', updateView);
        }

    if (ignoreCaseCheck) {
        ignoreCaseCheck.addEventListener('change', updateView);
    }

    //Real time field validation alerts
    if (!form) return; 

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