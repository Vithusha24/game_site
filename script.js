let cart = [];
let quantities = {};
let favourites = [];


fetch('products.json')
  .then(res => res.json())
  .then(data => {
    const productList = document.getElementById('product-list');

    for (let category in data) {
      const categoryHeader = document.createElement('h2');
      categoryHeader.textContent = category;
      productList.appendChild(categoryHeader);

      const categoryContainer = document.createElement('div');
      categoryContainer.className = 'category-container';

      data[category].forEach(product => {
        quantities[product.id] = 1;

        const productDiv = document.createElement('div');
        productDiv.className = 'product';
        productDiv.innerHTML = `
          <input type="checkbox" data-id="${product.id}">
          <img src="images/${product.image}" alt="${product.title}" style="width:200px;height:auto;">
          <h3>${product.title}</h3>
          <p>${product.description}</p>
          <p><strong>$${product.price}</strong></p>
          <div class="quantity-controls">
            <button onclick="changeQuantity(${product.id}, -1)">-</button>
            <input type="number" id="qty-${product.id}" value="1" min="1" onchange="manualQuantityChange(${product.id})" />
            <button onclick="changeQuantity(${product.id}, 1)">+</button>
          </div>
          <button onclick='addToCart(${JSON.stringify(product)})'>Add to Cart</button>
        `;
        categoryContainer.appendChild(productDiv);
      });

      productList.appendChild(categoryContainer);
    }
  })
  .catch(err => console.error('Failed to load JSON:', err));


function changeQuantity(id, delta) {
  if (!quantities[id]) quantities[id] = 1;
  quantities[id] += delta;
  if (quantities[id] < 1) quantities[id] = 1;
  document.getElementById(`qty-${id}`).value = quantities[id];
}

function manualQuantityChange(id) {
  let input = document.getElementById(`qty-${id}`);
  let value = parseInt(input.value);
  if (isNaN(value) || value < 1) value = 1;
  quantities[id] = value;
  input.value = value;
}

function addToCart(product) {
  const quantity = quantities[product.id] || 1;
  const existing = cart.find(p => p.id === product.id);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ ...product, quantity });
  }
  updateCart();
}

function updateCart() {
  const cartTable = document.getElementById('cart-table');
  const totalPriceElement = document.getElementById('total-price');
  if (!cartTable || !totalPriceElement) return;

  cartTable.innerHTML = '';
  let total = 0;

  cart.forEach(item => {
    total += item.price * item.quantity;
    cartTable.innerHTML += `
      <tr>
        <td>${item.title}</td>
        <td>${item.quantity}</td>
        <td>$${item.price * item.quantity}</td>
      </tr>
    `;
  });

  totalPriceElement.textContent = `$${total}`;
}


function saveToFavorites() {
  const selectedItems = document.querySelectorAll("input[type='checkbox']:checked");
  favourites = [];
  selectedItems.forEach(item => {
    favourites.push(item.dataset.id);
  });
  localStorage.setItem("favourites", JSON.stringify(favourites));
  alert("Favourites saved!");
}

function applyFavorites() {
  const savedFavourites = JSON.parse(localStorage.getItem("favourites"));
  if (savedFavourites && savedFavourites.length > 0) {
    const allCheckboxes = document.querySelectorAll("input[type='checkbox']");
    allCheckboxes.forEach(checkbox => {
      checkbox.checked = savedFavourites.includes(checkbox.dataset.id);
    });
    alert("Favourites applied!");
  } else {
    alert("No favourites saved yet.");
  }
}

function checkout() {
  window.location.href = "checkout.html"; 
}

function checkout() {
  const cartItems = [];

  const rows = document.querySelectorAll("#cart-table tr");
  rows.forEach(row => {
    const columns = row.querySelectorAll("td");
    if (columns.length === 3) {
      const item = {
        title: columns[0].textContent,
        quantity: parseInt(columns[1].textContent),
        price: parseFloat(columns[2].textContent.replace("$", ""))
      };
      cartItems.push(item);
    }
  });

  localStorage.setItem("cart", JSON.stringify(cartItems));
  window.location.href = "checkout.html";
}
