import { 
    validateDescription, 
    validateAmount, 
    validateDate, 
    validateCategory 
} from './validators.js';

// Waiting for the HTML layout to load completely
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('expense-form');
    
    if (!form) return; // Prevent errors if on a different section

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
            alert("Form inputs are perfectly validated via Regex! Ready for state entry storage next.");
        }
    });
});