import { products } from './data.js';

function buyProduct(product) {
  const $myCart = document.querySelector('.shopping-cart');
 $myCart.innerHTML += `<p class="row-cart">${product.name} - €${product.price.toFixed(2)}</p>`;
  
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

