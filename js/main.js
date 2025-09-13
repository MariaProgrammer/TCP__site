document.addEventListener('DOMContentLoaded', () => {
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

    // Логика для табов
    const tabsContainer = document.querySelector('.tabs');
    if (!tabsContainer) return;

    const tabList = tabsContainer.querySelector('.tabs__list');
    const tabButtons = tabsContainer.querySelectorAll('.tabs__button');
    const tabPanels = tabsContainer.querySelectorAll('.tabs__content-panel');

    // Функция для переключения табов
    const switchTab = (newTab) => {
        const targetPanelId = newTab.getAttribute('aria-controls');
        const targetPanel = tabsContainer.querySelector(`#${targetPanelId}`);

        // Убираем активность со всех кнопок и панелей
        tabButtons.forEach(button => {
            button.setAttribute('aria-selected', 'false');
            button.setAttribute('tabindex', '-1');
            button.classList.remove('tabs__button--active');
        });
        tabPanels.forEach(panel => {
            panel.setAttribute('hidden', true);
            panel.classList.remove('tabs__content-panel--active');
        });

        // Устанавливаем активность для выбранной кнопки и панели
        newTab.setAttribute('aria-selected', 'true');
        newTab.removeAttribute('tabindex');
        newTab.classList.add('tabs__button--active');
        newTab.focus(); // Перемещаем фокус для доступности

        targetPanel.removeAttribute('hidden');
        targetPanel.classList.add('tabs__content-panel--active');
    };

    // Обработчик клика по кнопке таба
    tabList.addEventListener('click', (e) => {
        const clickedTab = e.target.closest('.tabs__button');
        if (!clickedTab) return;
        
        e.preventDefault();
        switchTab(clickedTab);
    });

    // Обработчик навигации с клавиатуры
    tabList.addEventListener('keydown', (e) => {
        const currentTab = e.target.closest('.tabs__button');
        if (!currentTab) return;

        let currentTabIndex = Array.from(tabButtons).indexOf(currentTab);
        let newTabIndex = currentTabIndex;

        if (e.key === 'ArrowRight') {
            newTabIndex = (currentTabIndex + 1) % tabButtons.length;
        } else if (e.key === 'ArrowLeft') {
            newTabIndex = (currentTabIndex - 1 + tabButtons.length) % tabButtons.length;
        } else {
            return; // Не обрабатываем другие клавиши
        }

        e.preventDefault();
        switchTab(tabButtons[newTabIndex]);
    });
    // Categories
     // Новый брейкпоинт
    const breakpoint = 780;
    let categoriesSwiper;

    const initDestroySwiper = () => {
        const screenWidth = window.innerWidth;

        if (screenWidth <= breakpoint && categoriesSwiper === undefined) {
            // Инициализируем Swiper
            categoriesSwiper = new Swiper('.categories-slider', {
                loop: true,
                slidesPerView: 1,
                spaceBetween: 20,
                
                autoplay: {
                    delay: 3000,
                    disableOnInteraction: true, // Отключает автопрокрутку после ручного свайпа
                },

                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },

                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
            });

        } else if (screenWidth > breakpoint && categoriesSwiper !== undefined) {
            // Уничтожаем Swiper
            categoriesSwiper.destroy(true, true);
            categoriesSwiper = undefined;
        }
    };

    // Запускаем функцию при загрузке и при ресайзе окна
    initDestroySwiper();
    window.addEventListener('resize', initDestroySwiper);

    // --- Логика для сброса фильтров в каталоге ---

    const catalogFiltersForm = document.getElementById('catalog-filters');

    if (catalogFiltersForm) {
        // Слушаем стандартное событие 'reset' на форме
        catalogFiltersForm.addEventListener('reset', (event) => {
            // Даем браузеру мгновение, чтобы выполнить стандартный сброс
            setTimeout(() => {
                // Дополнительно гарантируем, что select'ы вернутся в исходное состояние
                const selects = catalogFiltersForm.querySelectorAll('select');
                selects.forEach(select => {
                    // Устанавливаем выбранным первый option
                    select.selectedIndex = 0; 
                });
                
                console.log('Фильтры сброшены!');
                // Здесь можно добавить логику для перезагрузки/обновления списка товаров
            }, 0);
        });
    }

    const faqList = document.getElementById('faq-list');

    if (faqList) {
        // Используем делегирование событий для эффективности
        faqList.addEventListener('click', (event) => {
            const button = event.target.closest('.faq__button');
            
            // Если клик был не по кнопке, ничего не делаем
            if (!button) return;

            const item = button.closest('.faq__item');
            
            // --- ИСПРАВЛЕННАЯ СТРОКА ---
            // Ищем панель внутри родительского элемента .faq__item
            const panel = item.querySelector('.faq__panel');
            
            if (!panel) return; // Дополнительная проверка на всякий случай

            const isExpanded = button.getAttribute('aria-expanded') === 'true';

            // Переключаем ARIA-атрибут и класс
            button.setAttribute('aria-expanded', !isExpanded);
            item.classList.toggle('faq__item--open');

            // Анимируем открытие/закрытие
            if (!isExpanded) {
                // Открываем: устанавливаем max-height равным высоте контента
                panel.style.maxHeight = panel.scrollHeight + 'px';
            } else {
                // Закрываем: сбрасываем max-height, чтобы сработал CSS transition к 0
                panel.style.maxHeight = null;
            }
        });
    }

    // const breakpoint = 780;
    let newsSwiper;

    const initDestroyNewsSwiper = () => {
        const screenWidth = window.innerWidth;
        const newsSliderElement = document.querySelector('.news-slider');

        if (!newsSliderElement) return;

        if (screenWidth <= breakpoint && newsSwiper === undefined) {
            // Инициализируем Swiper с уникальным селектором
            newsSwiper = new Swiper('.news-slider', {
                loop: true,
                slidesPerView: 1,
                spaceBetween: 20,
                
                autoplay: {
                    delay: 4000, // Немного другая задержка для разнообразия
                    disableOnInteraction: true,
                },

                pagination: {
                    // Используем уникальный класс для пагинации
                    el: '.news-slider__pagination',
                    clickable: true,
                },
            });

        } else if (screenWidth > breakpoint && newsSwiper !== undefined) {
            // Уничтожаем Swiper
            newsSwiper.destroy(true, true);
            newsSwiper = undefined;
        }
    };

    // Запускаем функцию при загрузке и при ресайзе окна
    initDestroyNewsSwiper();
    window.addEventListener('resize', initDestroyNewsSwiper);


});