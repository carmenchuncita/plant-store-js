
import { products } from './data.js';

function renderizarCards(products) {

  const container = document.getElementById('container-items');
  products.forEach(product => {
    
    const card = document.createElement('div');
    card.classList.add('card');

 
    card.innerHTML = `
      <img src="${product.image}" alt="${product.nombre}" class="card-img">
      <div class="card-content">
        <h2 class="card-title">${product.nombre}</h2>
        <p class="card-description">${product.descripcion}</p>
        <p class="card-price">Precio: €${product.precio.toFixed(2)}</p>
      </div>
    `;
    container.appendChild(card);
  });
}

renderizarCards(products);
