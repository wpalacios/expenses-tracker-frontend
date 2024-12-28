type ExchangeRates = {
  [key: string]: number;
};

export const convertCurrency = (
  amount: number,
  fromCurrency: string,
  toCurrency: string,
  rates: ExchangeRates
): number => {
  if (fromCurrency === toCurrency) return amount;

  const rate = rates[fromCurrency]
    ? rates[toCurrency] / rates[fromCurrency]
    : 0;
  return +(amount * rate).toFixed(2);
};
