const text = document.getElementsByClassName('items')[0];

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

// const loading = () => {
//   text.appendChild(createCustomElement('p', 'loading', 'carregando...'));
// };
// loading();
function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  const botão = (createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  section.appendChild(botão);
  botão.addEventListener('click', () => console.log('oi'));
  return section;
}

const sectionItens = document.querySelector('.items');
const itens = async () => {
  const produtos = await fetchProducts('computador');
  const { results } = produtos;
  const array = Object.entries(results);
  array.forEach((product) => {
    const novo = createProductItemElement({
      sku: product[1].id, 
      name: product[1].title,
      image: product[1].thumbnail,
    });
      // console.log(product);
      sectionItens.appendChild(novo);
    });
};
itens();

// function getSkuFromProductItem(item) {
//   return item.querySelector('span.item__sku').innerText;
// }

// function cartItemClickListener(event) {
//   // coloque seu código aqui
// }

// function createCartItemElement({ sku, name, salePrice }) {
//   const li = document.createElement('li');
//   li.className = 'cart__item';
//   li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
//   li.addEventListener('click', cartItemClickListener);
//   return li;
// }

window.onload = () => {
  fetchProducts('computador');
};
