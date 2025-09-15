document.addEventListener('DOMContentLoaded', () => {
    // Плавный скролл
    const anchors = document.querySelectorAll('a[href*="#"]');

    for (let anchor of anchors) {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const blockID = anchor.getAttribute("href").substring(1);
            document.getElementById(blockID).scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        });
    }
    // Бургер
    const burger = document.querySelector('.header__burger');
    const nav = document.querySelector('.header__nav');
    const body = document.body;

    if (burger && nav) {
        burger.addEventListener('click', () => {
            // Переключаем классы
            burger.classList.toggle('header__burger--active');
            nav.classList.toggle('header__nav--open');
            body.classList.toggle('no-scroll');

            // Обновляем ARIA атрибут
            const isExpanded = burger.getAttribute('aria-expanded') === 'true';
            burger.setAttribute('aria-expanded', !isExpanded);
        });

        // Закрытие меню при клике на ссылку (для одностраничников)
        nav.querySelectorAll('.header__nav-link').forEach(link => {
            link.addEventListener('click', () => {
                burger.classList.remove('header__burger--active');
                nav.classList.remove('header__nav--open');
                body.classList.remove('no-scroll');
                burger.setAttribute('aria-expanded', 'false');
            });
        });
    }
  })