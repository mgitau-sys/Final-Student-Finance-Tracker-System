// Static conversion database matrix using KES as the structural base line anchor
const EXCHANGE_RATES = {
    "KES": 1.0,
    "USD": 0.0077, 
    "EUR": 0.0071, 
    "GBP": 0.0061  
};

/**
 * Standard utility to format raw numbers into neat money values based on current settings
 */
export function formatCurrency(amount, settings) {
    const currency = settings.baseCurrency || "KES";
    return `${currency} ${Number(amount).toFixed(2)}`;
}

/**
 * Converts an expense amount value from one currency to another dynamically
 */
export function convertAmount(amount, fromCurrency, toCurrency) {
    if (fromCurrency === toCurrency) return amount;
    
    // Convert back into base anchor units (KES), then multiply to get target units
    const amountInBase = amount / (EXCHANGE_RATES[fromCurrency] || 1.0);
    return amountInBase * (EXCHANGE_RATES[toCurrency] || 1.0);
}