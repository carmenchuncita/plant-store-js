import { products } from './data.js';
var cart = [];  

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
      cart.push({...product, quantity: 1});
      product.stock -= 1;
    }
  }

  updateCart();

}

function updateCart() {
  const $myCart = document.querySelector('.shopping-cart');
  $myCart.innerHTML = '';  

  cart.forEach(product => {
    $myCart.innerHTML += `
      <div class="row-cart">
        ${product.name} - €${product.price.toFixed(2)} - X ${product.quantity}
        <button class="deleteProductBtn" data-id="${product.id}">Eliminar</button>
        <button class="plusProductBtn" data-id="${product.id}">+</button>
        <button class="restProductBtn" data-id="${product.id}">-</button>
      </div>`;
  });

  // botones de restar
  const $minusButtons = document.querySelectorAll('.restProductBtn');
  $minusButtons.forEach($minusButton => {
    $minusButton.addEventListener('click', (e) => {
      const productId = e.target.getAttribute('data-id');
      const productToRest = products.find(p => p.id === parseInt(productId));
      restProduct(productToRest);
    });
  });

  // botones de sumar
  const $plusButtons = document.querySelectorAll('.plusProductBtn');
  $plusButtons.forEach($plusButton => {
    $plusButton.addEventListener('click', (e) => {
      const productId = e.target.getAttribute('data-id');
      const productToSum = products.find(p => p.id === parseInt(productId));
      sumProduct(productToSum);
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
      // Si solo queda una unidad, eliminarlo del carrito
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
        <p class="card-price">Precio: €${product.price.toFixed(2)}</p>
        <button class="buy-button">Comprar</button>
      </div>
    `;

    container.appendChild(card);

    const $buyButton = card.querySelector('.buy-button');
    $buyButton.addEventListener('click', () => buyProduct(product));
  });
}

renderCards(products);
