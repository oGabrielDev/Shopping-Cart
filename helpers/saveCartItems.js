const saveCartItems = (salvar) => {
  localStorage.setItem('cartItems', JSON.stringify(salvar));
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
