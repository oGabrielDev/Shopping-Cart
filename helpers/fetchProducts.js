const endPoint = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';

const fetchProducts = async () => {
  const response = await fetch(endPoint);
  const responseJson = await response.json();
  return responseJson;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
