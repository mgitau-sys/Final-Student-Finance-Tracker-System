// Ensure no trailing spaces in description
export const descriptionRegex = /^\S(?:.*\S)?$/;

// Ensure only whole numbers with upto 2 decimal places
export const amountRegex = /^(0|[1-9]\d*)(\.\d{1,2})?$/;

// Regex for date
export const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

// Regex to ensure letters,spaces and hyphen
export const categoryRegex = /^[A-Za-z]+(?:[ -][A-Za-z]+)*$/;

// Detect duplicate consecutive words
export const duplicateWordRegex = /\b(\w+)\s+\1\b/i;

// Functions for validation

// Validating Description
export function validateDescription(description) {
    // 1. First test: Ensure the text matches our character rules and isn't empty
    if (!descriptionRegex.test(description)) {
        return {
            valid: false,
            message: "Description cannot be empty, and cannot have leading or trailing spaces."
        };
    }
    
    // 2. Second test: Ensure no accidental double words are added
    if (duplicateWordRegex.test(description)) {
        return {
            valid: false,
            message: "Duplicate consecutive words (like 'Coffee Coffee') are not allowed."
        };
    }

    return {
        valid: true,
        message: ""
    };
}

// Validating Amount
export function validateAmount(amount) {
    if (!amountRegex.test(amount)) {
        return {
            valid: false,
            message: "Enter a valid amount (e.g., 100 or 50.50). No leading zeros."
        };
    }

    return {
        valid: true,
        message: ""
    };
}

// Validating date
export function validateDate(date) {
    if (!dateRegex.test(date)) {
        return {
            valid: false,
            message: "Date must be a real date in YYYY-MM-DD format."
        };
    }

    return {
        valid: true,
        message: ""
    };
}

// Validating category
export function validateCategory(category) {
    if (!categoryRegex.test(category)) {
        return {
            valid: false,
            message: "Category may contain only letters, spaces, or hyphens."
        };
    }

    return {
        valid: true,
        message: ""
    };
}