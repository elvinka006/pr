document.addEventListener('DOMContentLoaded', function() {
  // Загружаем корзину из localStorage
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  // Отображаем товары в корзине
  renderCartItems(cart);
  
  // Обновляем итоговую сумму
  updateCartSummary(cart);
  
  // Обработчики для кнопок изменения количества
  document.querySelectorAll('.quantity-btn').forEach(button => {
    button.addEventListener('click', function() {
      const input = this.parentElement.querySelector('.quantity-input');
      let value = parseInt(input.value);
      const productId = this.closest('.cart-item').dataset.id;
      
      if (this.classList.contains('minus')) {
        value = value > 1 ? value - 1 : 1;
      } else if (this.classList.contains('plus')) {
        value += 1;
      }
      
      input.value = value;
      
      // Обновляем количество в корзине
      cart = cart.map(item => {
        if (item.id === productId) {
          return {...item, quantity: value};
        }
        return item;
      });
      
      localStorage.setItem('cart', JSON.stringify(cart));
      updateCartItemTotal(this.closest('.cart-item'));
      updateCartSummary(cart);
      updateCartCounter();
    });
  });
  
  // Обработчики для удаления товаров
  document.querySelectorAll('.remove-btn').forEach(button => {
    button.addEventListener('click', function() {
      const cartItem = this.closest('.cart-item');
      const productId = cartItem.dataset.id;
      
      // Удаляем товар из корзины
      cart = cart.filter(item => item.id !== productId);
      localStorage.setItem('cart', JSON.stringify(cart));
      
      cartItem.remove();
      updateCartSummary(cart);
      showCartMessage('Товар удален из корзины');
      updateCartCounter();
    });
  });
  
  // Обработчик оформления заказа
  const checkoutBtn = document.querySelector('.btn--checkout');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', function() {
      alert('Заказ оформлен! Спасибо за покупку!');
      localStorage.removeItem('cart');
      window.location.href = 'index.html';
    });
  }
  
  // Функция отображения товаров в корзине
  function renderCartItems(cartItems) {
    const cartItemsContainer = document.querySelector('.cart-items');
    if (!cartItemsContainer) return;
    
    // Очищаем контейнер, кроме заголовка
    const cartHeader = cartItemsContainer.querySelector('.cart-header');
    cartItemsContainer.innerHTML = '';
    if (cartHeader) cartItemsContainer.appendChild(cartHeader);
    
    if (cartItems.length === 0) {
      cartItemsContainer.innerHTML += `
        <div class="empty-cart">
          <i class="fas fa-shopping-bag"></i>
          <p>Ваша корзина пуста</p>
          <a href="index.html" class="btn">Вернуться к покупкам</a>
        </div>
      `;
      return;
    }
    
    cartItems.forEach(item => {
      const priceNumber = parseFloat(item.price.replace(/[^\d.]/g, ''));
      const total = priceNumber * item.quantity;
      
      cartItemsContainer.innerHTML += `
        <div class="cart-item" data-id="${item.id}">
          <div class="cart-item__product">
            <img src="${item.image}" alt="${item.name}" />
            <div class="cart-item__info">
              <h3>${item.name}</h3>
              <p>Артикул: ${item.id.toUpperCase()}</p>
            </div>
          </div>
          <div class="cart-item__price">${item.price}</div>
          <div class="cart-item__quantity">
            <button class="quantity-btn minus">-</button>
            <input type="number" value="${item.quantity}" min="1" class="quantity-input" />
            <button class="quantity-btn plus">+</button>
          </div>
          <div class="cart-item__total">${total.toLocaleString('ru-RU')} ₽</div>
          <div class="cart-item__remove">
            <button class="remove-btn"><i class="fas fa-times"></i></button>
          </div>
        </div>
      `;
    });
  }
  
  // Обновление итоговой суммы по товару
  function updateCartItemTotal(item) {
    const priceText = item.querySelector('.cart-item__price').textContent;
    const price = parseFloat(priceText.replace(/[^\d.]/g, ''));
    const quantity = parseInt(item.querySelector('.quantity-input').value);
    const total = price * quantity;
    
    item.querySelector('.cart-item__total').textContent = total.toLocaleString('ru-RU') + ' ₽';
  }
  
  // Обновление итоговой суммы заказа
  function updateCartSummary(cartItems) {
    let subtotal = cartItems.reduce((sum, item) => {
      const price = parseFloat(item.price.replace(/[^\d.]/g, ''));
      return sum + (price * item.quantity);
    }, 0);
    
    const summaryRows = document.querySelectorAll('.summary-row');
    if (summaryRows.length > 0) {
      summaryRows[0].querySelector('span:last-child').textContent = 
        subtotal.toLocaleString('ru-RU') + ' ₽';
    }
    
    const totalRow = document.querySelector('.summary-row.total');
    if (totalRow) {
      totalRow.querySelector('span:last-child').textContent = 
        subtotal.toLocaleString('ru-RU') + ' ₽';
    }
  }
  
  // Обновление счетчика в корзине
  function updateCartCounter() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    
    document.querySelectorAll('.cart-count').forEach(element => {
      element.textContent = totalItems;
    });
    
    localStorage.setItem('cartCount', totalItems.toString());
  }
  
  // Показ сообщения
  function showCartMessage(text) {
    const message = document.createElement('div');
    message.className = 'cart-message show';
    message.innerHTML = `
      <i class="fas fa-check-circle"></i>
      ${text}
    `;
    
    document.body.appendChild(message);
    
    setTimeout(() => {
      message.remove();
    }, 3000);
  }
});