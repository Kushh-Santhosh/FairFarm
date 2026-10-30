/**
 * FAIRFARM Standard Indian Currency and Quantity Formatters
 * Uses Intl.NumberFormat with 'en-IN' and 'INR' currency.
 */

/**
 * Formats a monetary amount into standard Indian Rupees (INR)
 * e.g. 27500 -> "₹27,500", 14000.5 -> "₹14,000.50" (if showDecimals: true)
 */
export const formatINR = (amount: number, showDecimals: boolean = false): string => {
  if (isNaN(amount) || amount === null || amount === undefined) {
    return '₹0';
  }
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: showDecimals ? 2 : 0,
    minimumFractionDigits: showDecimals ? 2 : 0,
  }).format(amount);
};

/**
 * Formats a rate per kilogram
 * e.g. 14 -> "₹14/kg", 13.5 -> "₹13.50/kg"
 */
export const formatINRPerKg = (rate: number): string => {
  if (isNaN(rate) || rate === null || rate === undefined) {
    return '₹0/kg';
  }
  const formatted = rate % 1 === 0 ? rate.toString() : rate.toFixed(2);
  return `₹${formatted}/kg`;
};

/**
 * Formats quantity with Indian thousand/lakh separators
 * e.g. 10000 -> "10,000"
 */
export const formatIndianNumber = (num: number): string => {
  if (isNaN(num) || num === null || num === undefined) {
    return '0';
  }
  return new Intl.NumberFormat('en-IN').format(num);
};

/**
 * Formats quantity in kilograms with Indian separator
 * e.g. 10000 -> "10,000 kg"
 */
export const formatKg = (qty: number): string => {
  return `${formatIndianNumber(qty)} kg`;
};

