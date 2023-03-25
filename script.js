const pai = document.querySelector('.cart__items');
const totalPrice = document.querySelector('.total-price');
const products = document.querySelector('.items');
const sumValues = () => {
  let result = 0;
  const items = document.querySelectorAll('.cart__item');
  items.forEach((item) => {
    const product = item.innerText.split('$');
    result += parseFloat(product[1]);
  });
  if (items.length === 0) {
    result += 0;
  }
  totalPrice.innerText = result.toFixed(2);
};

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

function cartItemClickListener(event, sku) {
  const receber = getSavedCartItems();
  const arrayFilter = receber.filter((recebe) => recebe.sku !== sku);
  saveCartItems(arrayFilter);
  event.target.remove();
  sumValues();
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `Nome: ${name} | Valor: R$${salePrice}`;
  li.addEventListener('click', (event) => cartItemClickListener(event, sku));
  sumValues();
  return li;
}

const loading = () => {
  const load = document.createElement('p');
  load.className = 'loading';
  load.innerHTML = 'carregando...';
  products.appendChild(load);
};
loading();

const unloading = () => {
  products.innerHTML = ' ';
};

const cartItens = ({ sku, name, image, salePrice }) => {
  const cart = createCartItemElement({ sku, name, image, salePrice });
  pai.appendChild(cart);
  const pegarLocal = getSavedCartItems();
  if (pegarLocal !== null) {
    saveCartItems([...pegarLocal, { sku, name, image, salePrice }]);
    sumValues();
  } else {
    saveCartItems([{ sku, name, image, salePrice }]);
    sumValues();
  }
};
function createProductItemElement({ sku, name, image, salePrice }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createCustomElement('span', 'item__price', `R$ ${salePrice}`));
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

const btn = document.querySelector('.empty-cart');
const limparCart = () => {
  localStorage.clear();
  pai.innerHTML = '';
  totalPrice.innerHTML = '';
};
btn.addEventListener('click', limparCart);

window.onload = () => {
  fetchProducts('computador');
  unloading();
  const load = getSavedCartItems();
  if (load !== null) {
    load.forEach((element) => {
      const cart = createCartItemElement(element);
      console.log(cart);
      pai.appendChild(cart);
    });
  }
  sumValues();
};
