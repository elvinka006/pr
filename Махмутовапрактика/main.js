document.addEventListener("DOMContentLoaded", function () {
  // Слайдер
  const initSlider = () => {
    const slider = document.querySelector(".hero");
    if (!slider) return;

    const slides = [
      {
        image:
          "https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        title: "Эксклюзивные ювелирные украшения из серебра 925 пробы",
        text: "Роскошные изделия ручной работы с драгоценными камнями для тех, кто ценит качество и уникальность",
      },
      {
        image:
          "https://images.unsplash.com/photo-1603974372031-6dd7b4247284?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        title: "ROYAL GEMS",
        text: "Открой для себя мир роскошных украшений",
      },
      {
        image:
          "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        title: "Специальное предложение для новых клиентов",
        text: "Скидка 15% на первый заказ при подписке на рассылку",
      },
    ];

    let currentSlide = 0;
    const sliderContent = slider.querySelector(".hero__content");
    const prevBtn = document.createElement("button");
    const nextBtn = document.createElement("button");

    // Создаем кнопки навигации
    prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
    nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
    prevBtn.className = "slider-btn slider-btn--prev";
    nextBtn.className = "slider-btn slider-btn--next";
    slider.appendChild(prevBtn);
    slider.appendChild(nextBtn);

    // Функция обновления слайда
    const updateSlide = () => {
      slider.style.backgroundImage = `url(${slides[currentSlide].image})`;
      sliderContent.querySelector("h1").textContent =
        slides[currentSlide].title;
      sliderContent.querySelector("p").textContent = slides[currentSlide].text;
    };

    // Обработчики кнопок
    prevBtn.addEventListener("click", () => {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      updateSlide();
    });

    nextBtn.addEventListener("click", () => {
      currentSlide = (currentSlide + 1) % slides.length;
      updateSlide();
    });

    // Автоматическое переключение слайдов
    let slideInterval = setInterval(() => {
      currentSlide = (currentSlide + 1) % slides.length;
      updateSlide();
    }, 5000);

    // Остановка авто-переключения при наведении
    slider.addEventListener("mouseenter", () => {
      clearInterval(slideInterval);
    });

    slider.addEventListener("mouseleave", () => {
      slideInterval = setInterval(() => {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlide();
      }, 5000);
    });

    // Инициализация первого слайда
    updateSlide();
  };

  // main.js
  document.addEventListener("DOMContentLoaded", function () {
    // Инициализация корзины
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    updateCartCount();

    // Обработчики для кнопок "В корзину"
    const addToCartButtons = document.querySelectorAll(".btn--small");
    addToCartButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const productItem = this.closest(".product__item");
        const product = {
          id: productItem.dataset.id || Date.now().toString(),
          name: productItem.querySelector("h3").textContent,
          price: productItem.querySelector(".product__price--current")
            .textContent,
          image: productItem.querySelector("img").src,
          quantity: 1,
        };

        addToCart(product);
      });
    });

    // Функция добавления в корзину
    function addToCart(product) {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      const existingItem = cart.find((item) => item.id === product.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push(product);
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartCount();
      showAddToCartMessage(product.name);
    }

    // Обновление счетчика корзины
    function updateCartCount() {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
      document.querySelectorAll(".cart-count").forEach((count) => {
        count.textContent = totalItems;
      });
    }

    // Показ сообщения о добавлении в корзину
    function showAddToCartMessage(productName) {
      const message = document.createElement("div");
      message.className = "cart-message";
      message.innerHTML = `
      <span>${productName} добавлен в корзину</span>
      <a href="cart.html" class="btn btn--small">Перейти в корзину</a>
    `;
      document.body.appendChild(message);

      setTimeout(() => {
        message.classList.add("show");
      }, 10);

      setTimeout(() => {
        message.classList.remove("show");
        setTimeout(() => {
          document.body.removeChild(message);
        }, 300);
      }, 3000);
    }

    // Анимация бургер-меню (если еще не добавлена)
    const burger = document.getElementById("burger");
    const nav = document.querySelector(".nav");

    if (burger && nav) {
      burger.addEventListener("click", function () {
        this.classList.toggle("active");
        nav.classList.toggle("active");
      });
    }
  });
  // Мобильное меню
  const initMobileMenu = () => {
    const burger = document.getElementById("burger");
    const nav = document.querySelector(".nav");

    if (burger && nav) {
      burger.addEventListener("click", () => {
        burger.classList.toggle("active");
        nav.classList.toggle("active");
      });
    }
  };

  // Быстрый просмотр
  const initQuickView = () => {
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("quick-view")) {
        // Здесь можно реализовать модальное окно с деталями товара
        alert("Функция быстрого просмотра будет реализована позже");
      }
    });
  };

  // Избранное
  const initWishlist = () => {
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("fa-heart")) {
        const heartIcon = e.target;
        heartIcon.classList.toggle("far");
        heartIcon.classList.toggle("fas");

        if (heartIcon.classList.contains("fas")) {
          heartIcon.style.color = "#ff4757";
        } else {
          heartIcon.style.color = "";
        }
      }
    });
  };

  // Инициализация всех функций
  initSlider();
  initCart();
  initMobileMenu();
  initQuickView();
  initWishlist();
});

document.addEventListener("DOMContentLoaded", function () {
  // Меню бургер
  const burger = document.getElementById("burger");
  const nav = document.querySelector(".nav");

  if (burger && nav) {
    burger.addEventListener("click", function () {
      this.classList.toggle("active");
      nav.classList.toggle("active");
    });
  }

  // Функционал добавления в корзину
  document.querySelectorAll(".btn--small").forEach((button) => {
    if (button.textContent.trim() === "В корзину") {
      button.addEventListener("click", function (e) {
        e.preventDefault();
        addToCart(this.closest(".product__item"));
      });
    }
  });

  // Обновляем счетчик корзины при загрузке
  updateCartCounter();
});

// Добавление товара в корзину
function addToCart(productItem) {
  if (!productItem) return;

  const productName = productItem.querySelector("h3").textContent;
  const productPrice = productItem.querySelector(
    ".product__price--current"
  ).textContent;
  const productImage = productItem.querySelector("img").src;
  const productId = productItem
    .querySelector("h3")
    .textContent.replace(/\s+/g, "-")
    .toLowerCase();

  // Получаем текущую корзину из localStorage
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Проверяем, есть ли уже такой товар в корзине
  const existingItem = cart.find((item) => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: productId,
      name: productName,
      price: productPrice,
      image: productImage,
      quantity: 1,
    });
  }

  // Сохраняем обновленную корзину
  localStorage.setItem("cart", JSON.stringify(cart));

  // Обновляем счетчик
  updateCartCounter();

  // Показываем сообщение
  showCartMessage(`Товар "${productName}" добавлен в корзину`);
}

// Обновление счетчика корзины
function updateCartCounter() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  document.querySelectorAll(".cart-count").forEach((element) => {
    element.textContent = totalItems;
  });

  localStorage.setItem("cartCount", totalItems.toString());
}

// Показ сообщения о добавлении в корзину
function showCartMessage(text) {
  const message = document.createElement("div");
  message.className = "cart-message show";
  message.innerHTML = `
    <i class="fas fa-check-circle"></i>
    ${text}
    <a href="cart.html" class="btn btn--small">Перейти в корзину</a>
  `;

  document.body.appendChild(message);

  setTimeout(() => {
    message.classList.remove("show");
    setTimeout(() => {
      if (message.parentNode) {
        message.parentNode.removeChild(message);
      }
    }, 300);
  }, 3000);
}



// Калькулятор стоимости
document.addEventListener('DOMContentLoaded', function() {
  const calculateBtn = document.getElementById('calculate-btn');
  const consultBtn = document.getElementById('consult-btn');
  const resultPrice = document.getElementById('result-price');
  
  if (calculateBtn) {
    calculateBtn.addEventListener('click', calculatePrice);
  }
  
  if (consultBtn) {
    consultBtn.addEventListener('click', function() {
      // Здесь можно добавить код для открытия формы консультации
      alert('Наш менеджер свяжется с вами для уточнения деталей заказа. Спасибо!');
    });
  }
  
  function calculatePrice() {
    // Базовые цены
    const materialPrices = {
      '925': 80, // цена за грамм серебра
      'gold_plated': 120, // цена за грамм серебра с позолотой
      'gold': 3500 // цена за грамм золота
    };
    
    const typeMultipliers = {
      'ring': 1.2,
      'earrings': 1.5,
      'pendant': 1.3,
      'bracelet': 1.8
    };
    
    const stonesPrices = [0, 1000, 2500, 5000, 10000];
    const complexityMultipliers = [1, 1.3, 1.7, 2.5];
    
    // Получаем значения из формы
    const material = document.getElementById('material').value;
    const productType = document.getElementById('product-type').value;
    const weight = parseFloat(document.getElementById('weight').value);
    const stones = parseInt(document.getElementById('stones').value);
    const complexity = parseInt(document.getElementById('complexity').value) - 1;
    
    // Проверка веса
    if (isNaN(weight)) {
      alert('Пожалуйста, введите корректный вес изделия');
      return;
    }
    
    // Расчет стоимости
    let price = materialPrices[material] * weight;
    price *= typeMultipliers[productType];
    price += stonesPrices[stones];
    price *= complexityMultipliers[complexity];
    
    // Округление
    price = Math.round(price / 100) * 100;
    
    // Отображение результата
    resultPrice.textContent = price.toLocaleString('ru-RU') + ' ₽';
  }
});