// utils/currency.js
export const rates = { USD: 1, HKD: 7.8, EUR: 0.9 };

export const convertValue = (usdValue, currency) =>
  (usdValue * rates[currency]).toFixed(2);

export const getCurrencySymbol = (currency) => {
  switch (currency) {
    case 'USD': return '$';
    case 'HKD': return 'HK$';
    case 'EUR': return '€';
    default: return '';
  }
};