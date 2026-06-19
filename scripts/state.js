// Central Application Memory State
export let state = {
    expenses: [],
    settings: {
        baseCurrency: "KES",
        BudgetCap: 0,
        usdRate: 1,
        eurRate: 1
    }
};

// Key LocalStorage Save Token Key
const STORAGE_KEY = "student_finance_tracker_data";

/**
 * Loads saved state from localStorage or initial defaults
 */
export function loadStateFromStorage() {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
        try {
            state = JSON.parse(savedData);
        } catch (e) {
            console.error("Storage corrupted, fallback to empty arrays", e);
        }
    }
}

/**
 * Saves current app state to localStorage automatically
 */
export function saveStateToStorage() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

/**
 * Adds a verified record item to memory list
 */
export function addRecord(description, amount, category, date) {
    const newRecord = {
        id: "rec_" + Date.now(),
        description: description,
        amount: parseFloat(amount),
        category: category,
        date: date,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };
    state.expenses.push(newRecord); // Fixed: changed .records to .expenses
    saveStateToStorage();
    return newRecord;
}

/**
 * Sorts array records natively based on requested selection key paths
 */
export function sortRecords(criteria) {
    state.expenses.sort((a, b) => { // Fixed: changed .records to .expenses
        if (criteria === "description-asc") return a.description.localeCompare(b.description);
        if (criteria === "description-desc") return b.description.localeCompare(a.description);
        if (criteria === "amount-asc") return a.amount - b.amount;
        if (criteria === "amount-desc") return b.amount - a.amount;
        if (criteria === "date-asc") return new Date(a.date) - new Date(b.date);
        if (criteria === "date-desc") return new Date(b.date) - new Date(a.date);
        return 0;
    });
}
export function deleteRecord(expenseId) {
    // Keep everything EXCEPT the item matching the deleted ID
    state.expenses = state.expenses.filter(expense => expense.id != expenseId);
    saveStateToStorage();
}
export function editRecord(expenseId, updatedData) {
    const index = state.expenses.findIndex(expense => expense.id == expenseId);
    if (index !== -1) {
        // Merge the old expense data with the new updated values
        state.expenses[index] = { ...state.expenses[index], ...updatedData };
        saveStateToStorage();
    }
}
