 // Фильтрация и сортировка для каталога
 document.addEventListener('DOMContentLoaded', function() {
  // Обработчики фильтров
  const categoryFilter = document.getElementById('category');
  const materialFilter = document.getElementById('material');
  const sortFilter = document.getElementById('sort');
  
  // Функция применения фильтров
  function applyFilters() {
      const category = categoryFilter.value;
      const material = materialFilter.value;
      const sort = sortFilter.value;
      
      // Здесь будет логика фильтрации и сортировки
      console.log('Применены фильтры:', {category, material, sort});
      
      // В реальном проекте здесь будет AJAX-запрос или фильтрация уже загруженных товаров
  }
  
  // Назначение обработчиков
  categoryFilter.addEventListener('change', applyFilters);
  materialFilter.addEventListener('change', applyFilters);
  sortFilter.addEventListener('change', applyFilters);
  
  // Инициализация корзины и других функций из main.js
  if (typeof initCart === 'function') initCart();
  if (typeof initMobileMenu === 'function') initMobileMenu();
  if (typeof initQuickView === 'function') initQuickView();
  if (typeof initWishlist === 'function') initWishlist();
});


document.addEventListener('DOMContentLoaded', function() {
  // Меню бургер
  const burger = document.getElementById('burger');
  const nav = document.querySelector('.nav');
  
  if (burger && nav) {
    burger.addEventListener('click', function() {
      this.classList.toggle('active');
      nav.classList.toggle('active');
    });
  }

  // Функционал добавления в корзину
  document.querySelectorAll('.btn--small').forEach(button => {
    if (button.textContent.trim() === 'В корзину') {
      button.addEventListener('click', function(e) {
        e.preventDefault();
        addToCart(this.closest('.product__item'));
      });
    }
  });
  
  // Обновляем счетчик корзины при загрузке
  updateCartCounter();
});

// Добавление товара в корзину
function addToCart(productItem) {
  if (!productItem) return;

  const productName = productItem.querySelector('h3').textContent;
  const productPrice = productItem.querySelector('.product__price--current').textContent;
  const productImage = productItem.querySelector('img').src;
  const productId = productItem.querySelector('h3').textContent.replace(/\s+/g, '-').toLowerCase();

  // Получаем текущую корзину из localStorage
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  // Проверяем, есть ли уже такой товар в корзине
  const existingItem = cart.find(item => item.id === productId);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: productId,
      name: productName,
      price: productPrice,
      image: productImage,
      quantity: 1
    });
  }
  
  // Сохраняем обновленную корзину
  localStorage.setItem('cart', JSON.stringify(cart));
  
  // Обновляем счетчик
  updateCartCounter();
  
  // Показываем сообщение
  showCartMessage(`Товар "${productName}" добавлен в корзину`);
}

// Обновление счетчика корзины
function updateCartCounter() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  
  document.querySelectorAll('.cart-count').forEach(element => {
    element.textContent = totalItems;
  });
  
  localStorage.setItem('cartCount', totalItems.toString());
}

// Показ сообщения о добавлении в корзину
function showCartMessage(text) {
  const message = document.createElement('div');
  message.className = 'cart-message show';
  message.innerHTML = `
    <i class="fas fa-check-circle"></i>
    ${text}
    <a href="cart.html" class="btn btn--small">Перейти в корзину</a>
  `;
  
  document.body.appendChild(message);
  
  setTimeout(() => {
    message.classList.remove('show');
    setTimeout(() => {
      if (message.parentNode) {
        message.parentNode.removeChild(message);
      }
    }, 300);
  }, 3000);
}