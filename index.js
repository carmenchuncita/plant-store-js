import { products } from './data.js';
var cart = [];
//@TODO errors,
const cartIcon = document.getElementById('cart-icon');
const shoppingCart = document.getElementById('shopping-cart');


function toggleCartVisibility() {
  shoppingCart.classList.toggle('hidden');
}
cartIcon.addEventListener('click', toggleCartVisibility);



function buyProduct(product) {
  let productInCart = cart.find(item => item.id === product.id);

  if (productInCart) {
    if (1 > product.stock) {
      alert("No quedan suficientes productos en stock");
    } else {
      productInCart.quantity++;
      product.stock -= 1;
    }
  } else {
    if (product.stock <= 0) {
      alert("No quedan productos en stock");
    } else {
      cart.push({ ...product, quantity: 1 });
      product.stock -= 1;
    }
  }

  updateCart();
  if (product.stock > 0) {
    shoppingCart.classList.remove('hidden');
  }
  shoppingCart.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function updateCart() {
  const $rowCart = document.querySelector('.row-cart');
  $rowCart.innerHTML = '';

  cart.forEach(product => {
    $rowCart.innerHTML += `
    <div class="product-row">
      <img class="product-img" src="${product.image}" alt="${product.name}">

      <div class="product-info">
          <p class="product-name">${product.name} </p>
          <div class="product-price">
            <p>${product.price.toFixed(2)}€ - X <span class="product-quantity">${product.quantity}</span></p> 
              <div class="product-btns">
                  <button class="deleteProductBtn" data-id="${product.id}">Eliminar</button>
                  <button class="plusProductBtn" data-id="${product.id}">+</button>
                  <button class="restProductBtn" data-id="${product.id}">-</button>
              </div>
          </div>
      </div>
    </div>`;
  });

  const total = totalPrice();
  const $totalDisplay = document.querySelector('.total-display');
  $totalDisplay.innerHTML = `Total: ${total.toFixed(2)} €`;

  btnEventListeners();
}

function totalPrice() {
  let total = 0;

  cart.forEach(product => {
    total += product.price * product.quantity;
  });

  return total;
}

function btnEventListeners() {

  // Botones de restar
  const $minusButtons = document.querySelectorAll('.restProductBtn');
  $minusButtons.forEach($minusButton => {
    $minusButton.addEventListener('click', (e) => {
      const productId = e.target.getAttribute('data-id');
      const productToRest = cart.find(p => p.id === parseInt(productId));
      restProduct(productToRest);
    });
  });

  // Botones de sumar
  const $plusButtons = document.querySelectorAll('.plusProductBtn');
  $plusButtons.forEach($plusButton => {
    $plusButton.addEventListener('click', (e) => {
      const productId = e.target.getAttribute('data-id');
      const productToSum = cart.find(p => p.id === parseInt(productId));
      sumProduct(productToSum);
    });
  });

  // Botones de eliminar
  const $deleteButtons = document.querySelectorAll('.deleteProductBtn');
  $deleteButtons.forEach($deleteButton => {
    $deleteButton.addEventListener('click', (e) => {
      const productId = e.target.getAttribute('data-id');
      const productToDelete = cart.find(p => p.id === parseInt(productId));
      deleteProduct(productToDelete);
    });
  });
}

function restProduct(product) {
  let productInCart = cart.find(item => item.id === product.id);

  if (productInCart) {
    if (productInCart.quantity > 1) {
      productInCart.quantity -= 1;
      product.stock += 1;
    } else {
      // Si solo queda una unidad, eliminarlo del carrito despues de restar
      cart = cart.filter(item => item.id !== product.id);
      product.stock += 1;
    }
    updateCart();
  } else {
    alert("El producto no está en el carrito");
  }
}

function sumProduct(product) {
  let productInCart = cart.find(item => item.id === product.id);

  if (productInCart) {
    // Solo aumentar si hay stock
    if (product.stock > 0) {
      productInCart.quantity += 1;
      product.stock -= 1;
    } else {
      alert("No queda suficiente stock");
    }
    updateCart();
  } else {
    alert("El producto no está en el carrito");
  }
}

function deleteProduct(product) {
  cart = cart.filter(item => item.id !== product.id);
  product.stock += product.quantity;
  updateCart();
}

function emptyCart(){
  shoppingCart.innerHTML = "";
  updateCart();
}
const emptyBtn = document.getElementById('empty-cart');
emptyBtn.addEventListener('click', emptyCart);

const finalizeBtn = document.getElementById('btn-finalize');
finalizeBtn.addEventListener('click', finalize);

function finalize() {
  alert('Tu compra ha sido realizada correctamente');
}

function renderCards(products) {
  const container = document.getElementById('container-items');

  products.forEach(product => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" class="card-img">
      <div class="card-content">
        <h2 class="card-title">${product.name}</h2>
        <p class="card-description">${product.description}</p>
        <p class="card-price">Precio: ${product.price.toFixed(2)} €</p>
        <button class="buy-button">Comprar</button>
      </div>
    `;

    container.appendChild(card);

    const $buyButton = card.querySelector('.buy-button');
    $buyButton.addEventListener('click', () => buyProduct(product));
  });
}

renderCards(products);
