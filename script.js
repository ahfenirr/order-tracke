const orders = JSON.parse(localStorage.getItem('orders')) || [];

const pictureInput = document.getElementById('picture');
const sizeInput = document.getElementById('size');
const quantityInput = document.getElementById('quantity');
const saveOrderButton = document.getElementById('saveOrder');
const ordersContainer = document.getElementById('orders');
const searchInput = document.getElementById('search');

function generateCode() {
  return 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase();
}

function renderOrders(filter = '') {
  ordersContainer.innerHTML = '';
  orders
    .filter(order =>
      order.code.includes(filter) || order.size.toLowerCase().includes(filter.toLowerCase())
    )
    .forEach(order => {
      const orderDiv = document.createElement('div');
      orderDiv.className = 'order';

      orderDiv.innerHTML = `
        <img src="${order.picture}" alt="Product Image">
        <span><strong>${order.code}</strong> - Size: ${order.size}, Qty: ${order.quantity}</span>
      `;

      ordersContainer.appendChild(orderDiv);
    });
}

saveOrderButton.addEventListener('click', () => {
  const pictureFile = pictureInput.files[0];
  const size = sizeInput.value.trim();
  const quantity = quantityInput.value.trim();

  if (!pictureFile || !size || !quantity) {
    alert('Please fill all fields.');
    return;
  }

  const reader = new FileReader();

  reader.onload = () => {
    const pictureBase64 = reader.result;
    const code = generateCode();

    const newOrder = {
      code,
      picture: pictureBase64,
      size,
      quantity
    };

    orders.push(newOrder);
    localStorage.setItem('orders', JSON.stringify(orders));

    renderOrders();

    pictureInput.value = '';
    sizeInput.value = '';
    quantityInput.value = '';
    alert(`Order saved with code: ${code}`);
  };

  reader.readAsDataURL(pictureFile);
});

searchInput.addEventListener('input', () => {
  renderOrders(searchInput.value.trim());
});

// Initial render
renderOrders();
