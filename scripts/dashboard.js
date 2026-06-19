import { state } from './state.js';
//import { formatCurrency } from './currency.js';

// === 1. LIVE NUMERIC AGGREGATION FUNCTIONS ===
export function getTotalRecords(expenses) {
    return expenses.length;
}

export function getTotalSpending(expenses) {
    return expenses.reduce((total, expense) => total + expense.amount, 0);
}

export function getTopCategory(expenses) {
    if (expenses.length === 0) return "None";
    const counts = {};
    expenses.forEach(expense => {
        if (!counts[expense.category]) counts[expense.category] = 0;
        counts[expense.category]++;
    });
    let topCategory = "";
    let highestCount = 0;
    for (const category in counts) {
        if (counts[category] > highestCount) {
            highestCount = counts[category];
            topCategory = category;
        }
    }
    return topCategory;
}

export function getBudgetStatus(expenses, budgetCap, settings) {
    if (!budgetCap || budgetCap <= 0) return "No budget set";
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const remaining = budgetCap - total;
    const currency = settings.baseCurrency;

    if (remaining > 0) return `${currency} ${remaining} remaining`;
    return `Overspent by ${currency} ${Math.abs(remaining)}`;
}
// Temporary internal currency formatter fallback to prevent 404 errors until my m6
function formatCurrency(amount, settings) {
    return `${settings.baseCurrency} ${Number(amount).toFixed(2)}`;
}

// === 2. ARIA LIVE BUDGET ALARM ORCHESTRATOR ===
export function updateDashboard() {
    // Corrected budgetCap casing to match state.js configurations
    const currentCap = parseFloat(state.settings.BudgetCap) || 0;
    const total = getTotalSpending(state.expenses);

    document.getElementById("total-records").textContent = getTotalRecords(state.expenses);
    document.getElementById("total-spending").textContent = formatCurrency(total, state.settings);
    document.getElementById("top-category").textContent = getTopCategory(state.expenses);
    document.getElementById("budget-status").textContent = getBudgetStatus(state.expenses, currentCap, state.settings);

    const budgetMessage = document.getElementById("budget-message");
    const budgetAlert = document.getElementById("budget-alert");

    if (currentCap > 0) {
        const remaining = currentCap - total;
        if (budgetMessage) budgetMessage.textContent = `Remaining Budget: ${state.settings.baseCurrency} ${remaining}`;
        
        if (budgetAlert) {
            if (remaining < 0) {
                budgetAlert.textContent = "Warning: Budget exceeded!";
            } else {
                budgetAlert.textContent = "";
            }
        }
    } else {
        if (budgetMessage) budgetMessage.textContent = "";
        if (budgetAlert) budgetAlert.textContent = "";
    }

    // re-renders the table 
    renderTrendChart(state.expenses);
}

// === 3. YOUR TREND CHARTING LOGIC ===
export function getLastSevenDaysData(expenses) {
    const data = [];
    for (let i = 6; i >= 0; i--) {
        const day = new Date();
        day.setDate(day.getDate() - i);
        const dateString = day.toISOString().split("T")[0];

        const total = expenses
            .filter(expense => expense.date === dateString)
            .reduce((sum, expense) => sum + expense.amount, 0);

        data.push({ date: dateString, total });
    }
    return data;
}

export function renderTrendChart(expenses) {
    const container = document.getElementById("chart-container");
    if (!container) return;

    const data = getLastSevenDaysData(expenses);
    container.innerHTML = "";

    const max = Math.max(...data.map(day => day.total), 1);

    data.forEach(day => {
        const bar = document.createElement("div");
        bar.className = "chart-bar";

        const height = day.total === 0 ? 5 : (day.total / max) * 200;

        bar.innerHTML = `
            <div class="bar" style="height:${height}px"></div>
            <small>${day.date.slice(5)}</small>
        `;
        container.appendChild(bar);
    });
}