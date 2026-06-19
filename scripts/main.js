import { 
    validateDescription, 
    validateAmount, 
    validateDate, 
    validateCategory 
} from './validators.js';

import { 
    loadStateFromStorage, 
    sortRecords,
    addRecord,
    state,               
    saveStateToStorage,
    deleteRecord, 
    editRecord    
} from './state.js';

import { 
    renderTableRows 
} from './ui.js';

import { updateDashboard } from './dashboard.js';
import { exportDataAsJSON, importDataFromJSON } from './files.js';

// Waiting for the HTML layout to load completely
document.addEventListener('DOMContentLoaded', () => {

    // 1. ALL GLOBAL ELEMENT SELECTORS AT THE TOP
    const form = document.getElementById('expense-form');
    const sortSelect = document.getElementById('sort-select');
    const searchInput = document.getElementById('search-pattern');
    const ignoreCaseCheck = document.getElementById('ignore-case');
    const currencySelect = document.getElementById('base-currency'); 
    const budgetCapInput = document.getElementById('budget-cap');
    const exportBtn = document.getElementById('export-btn');
    const importInput = document.getElementById('import-file');

    // The centralized view manager
    function updateView() {
        if (sortSelect && sortSelect.value) {
            sortRecords(sortSelect.value);
        }
        renderTableRows();
        updateDashboard();
    }
    
    // 2. BOOTSTRAP MEMORY STATE
    loadStateFromStorage(); 
    
    // Pre-fill input fields with saved configurations from LocalStorage
    if (currencySelect) currencySelect.value = state.settings.baseCurrency || "KES";
    if (budgetCapInput) budgetCapInput.value = state.settings.BudgetCap || "";

    // Draw the initial screen
    updateView();

    // 3. SETTINGS & INTERFACE LISTENERS (SAFE FROM GUARD CLAUSES)
    if (sortSelect) sortSelect.addEventListener('change', updateView);
    if (searchInput) searchInput.addEventListener('input', updateView);
    if (ignoreCaseCheck) ignoreCaseCheck.addEventListener('change', updateView);

    if (currencySelect) {
        currencySelect.addEventListener('change', () => {
            state.settings.baseCurrency = currencySelect.value;
            saveStateToStorage();
            updateView();
        });
    }

    if (budgetCapInput) {
        budgetCapInput.addEventListener('input', () => {
            state.settings.BudgetCap = budgetCapInput.value;
            saveStateToStorage();
            updateView(); 
        });
    }

    if (exportBtn) exportBtn.addEventListener('click', exportDataAsJSON);
    if (importInput) {
        importInput.addEventListener('change', (event) => {
            importDataFromJSON(event, updateView);
            importInput.value = ""; 
        });
    }

    // === TABLE ACTIONS LISTENERS (EDIT / DELETE) ===
    const tableBody = document.getElementById('expense-list');
    if (tableBody) {
        tableBody.addEventListener('click', event => {
            // Delete Logic
            if (event.target.classList.contains("delete-btn")) {
                const id = event.target.dataset.id;
                const confirmed = confirm("Are you sure you want to delete this expense?");
                if (!confirmed) return;
                
                deleteRecord(id); 
                updateView();    
            }
            
            // Edit Logic
            if (event.target.classList.contains("edit-btn")) {
                const id = event.target.dataset.id;
                const expense = state.expenses.find(expense => expense.id == id);
                if (!expense) return;

                document.getElementById("expense-id").value = expense.id;
                document.getElementById("description").value = expense.description;
                document.getElementById("amount").value = expense.amount;
                document.getElementById("category").value = expense.category;
                document.getElementById("date").value = expense.date;

                const submitBtn = document.querySelector("#expense-form button[type='submit']");
                if (submitBtn) {
                    submitBtn.textContent = "Update Expense";
                }
            }
        });
    }

    // 4. GUARD CLAUSE FOR FORM DEPENDENT CODE
    if (!form) return; 

    const descriptionInput = document.getElementById('description');
    const amountInput = document.getElementById('amount');
    const dateInput = document.getElementById('date');
    const categorySelect = document.getElementById('category');

    // Real-time fields validations
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
        event.preventDefault(); 

        const descriptionCheck = validateDescription(descriptionInput.value);
        const amountCheck = validateAmount(amountInput.value);
        const dateCheck = validateDate(dateInput.value);
        const catCheck = validateCategory(categorySelect.value);

        document.getElementById('description-error').innerText = descriptionCheck.valid ? "" : descriptionCheck.message;
        document.getElementById('amount-error').innerText = amountCheck.valid ? "" : amountCheck.message;
        document.getElementById('date-error').innerText = dateCheck.valid ? "" : dateCheck.message;
        document.getElementById('category-error').innerText = catCheck.valid ? "" : catCheck.message;

        if (descriptionCheck.valid && amountCheck.valid && dateCheck.valid && catCheck.valid) {
            const existingId = document.getElementById("expense-id").value;

            if (existingId) {
                editRecord(existingId, {
                    description: descriptionInput.value,
                    amount: parseFloat(amountInput.value) || 0,
                    category: categorySelect.value,
                    date: dateInput.value
                });
                document.getElementById("expense-id").value = "";
                //reset the button back to "add expense"
                const submitBtn = document.querySelector("#expense-form button[type='submit']");
                if (submitBtn) submitBtn.textContent = "Add Expense";
                
                alert("Expense record successfully updated!");

            } else {
                addRecord(
                    descriptionInput.value,
                    amountInput.value,
                    categorySelect.value,
                    dateInput.value
                );
                alert("Expense record successfully captured!");
            }

            updateView(); 
            form.reset();
        }
    });
});