export default {
  formatCurrency(value: number): string {
    return value ? `$${value.toFixed(2)}` : "";
  }
};
