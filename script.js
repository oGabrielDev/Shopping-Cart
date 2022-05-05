// const text = document.getElementsByClassName('items')[0];

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

function cartItemClickListener(event, sku) {
  const receber = getSavedCartItems();
  const arrayFilter = receber.filter((recebe) => recebe.sku !== sku);
  console.log(arrayFilter);
  saveCartItems(arrayFilter);
  event.target.remove();
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', (event) => cartItemClickListener(event, sku));
  return li;
}

const cartItens = ({ sku, name, image, salePrice }) => {
  const pai = document.querySelector('.cart__items');
  const cart = createCartItemElement({ sku, name, image, salePrice });
  pai.appendChild(cart);
  const pegarLocal = getSavedCartItems();
  // console.log(pegarLocal);
  if (pegarLocal !== null) {
    saveCartItems([{ sku, name, image, salePrice }, ...pegarLocal]);
  } else {
    saveCartItems([{ sku, name, image, salePrice }]);
  }
};
function createProductItemElement({ sku, name, image, salePrice }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createCustomElement('span', 'item__price', salePrice));
  const botão = (createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  section.appendChild(botão);
  botão.addEventListener('click', () => cartItens({ sku, name, image, salePrice }));
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
      salePrice: product[1].price,
    });
      sectionItens.appendChild(novo);
  });
};
itens();

// function getSkuFromProductItem(item) {
//   return item.querySelector('span.item__sku').innerText;
// }

window.onload = () => {
  fetchProducts('computador');
  const load = getSavedCartItems();
  if (load !== null) {
    load.forEach((element) => {
      const pai = document.querySelector('.cart__items');
      const cart = createCartItemElement(element);
      pai.appendChild(cart);
    });
  }
};
