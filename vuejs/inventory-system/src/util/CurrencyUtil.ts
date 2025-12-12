const currencyFormat = new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR"});

export const formatCurrency = (value : number) => currencyFormat.format(value);