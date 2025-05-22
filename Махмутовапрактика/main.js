document.addEventListener("DOMContentLoaded", function () {
  // Мобильное меню
  const burger = document.getElementById("burger");
  const nav = document.querySelector(".nav");

  burger.addEventListener("click", function () {
    this.classList.toggle("active");
    nav.classList.toggle("active");
  });

  // Плавная прокрутка для якорных ссылок
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      if (this.getAttribute("href") === "#") return;

      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 70,
          behavior: "smooth",
        });

        // Закрываем меню, если оно открыто
        if (nav.classList.contains("active")) {
          burger.classList.remove("active");
          nav.classList.remove("active");
        }
      }
    });
  });

  // Фиксированная шапка при скролле
  const header = document.querySelector(".header");
  let lastScroll = 0;

  window.addEventListener("scroll", function () {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
      header.classList.remove("scroll-up");
    }

    if (
      currentScroll > lastScroll &&
      !header.classList.contains("scroll-down")
    ) {
      header.classList.remove("scroll-up");
      header.classList.add("scroll-down");
    }

    if (
      currentScroll < lastScroll &&
      header.classList.contains("scroll-down")
    ) {
      header.classList.remove("scroll-down");
      header.classList.add("scroll-up");
    }

    lastScroll = currentScroll;
  });

  // Добавление товара в избранное
  document.querySelectorAll(".wishlist").forEach((button) => {
    button.addEventListener("click", function () {
      this.classList.toggle("active");
      const icon = this.querySelector("i");

      if (this.classList.contains("active")) {
        icon.classList.remove("far");
        icon.classList.add("fas");
        icon.style.color = "#ff0000";
      } else {
        icon.classList.remove("fas");
        icon.classList.add("far");
        icon.style.color = "";
      }
    });
  });

  // Быстрый просмотр товара
  document.querySelectorAll(".quick-view").forEach((button) => {
    button.addEventListener("click", function () {
      // Здесь можно добавить модальное окно с подробной информацией о товаре
      alert("Функция быстрого просмотра товара будет реализована позже");
    });
  });

  // Добавление товара в корзину
  document.querySelectorAll(".btn--small").forEach((button) => {
    button.addEventListener("click", function () {
      const product = this.closest(".product__item");
      const productName = product.querySelector("h3").textContent;
      const productPrice = product.querySelector(".product__price").textContent;

      // Здесь можно добавить логику добавления товара в корзину
      alert(`Товар "${productName}" (${productPrice}) добавлен в корзину`);
    });
  });
});
