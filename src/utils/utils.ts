export const toMoney = (amount: number) => {
  return new Intl.NumberFormat().format(amount);
}

export const toPercent = (number: number) => {
  return number.toLocaleString('en', {style: 'percent'});
}