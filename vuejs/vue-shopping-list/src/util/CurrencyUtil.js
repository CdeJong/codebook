const currencyFormat = new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR"});

export const formatCurrency = (value) => currencyFormat.format(value);