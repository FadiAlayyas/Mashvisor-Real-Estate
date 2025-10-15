module.exports = {
  // Capitalize every word for city names in responses
  capitalize: (str) =>
    String(str)
      .toLowerCase()
      .split(' ')
      .filter(Boolean)
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' '),
  // Format price consistently with two decimals
  formatPrice: (price) => Number.parseFloat(price).toFixed(2)
};
