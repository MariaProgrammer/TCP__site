// --- Логика для сброса фильтра новостей ---
document.addEventListener('DOMContentLoaded', () => {
    const newsFiltersForm = document.getElementById('news-filters-form');

    if (newsFiltersForm) {
        // Слушаем стандартное событие 'reset' на форме
        newsFiltersForm.addEventListener('reset', (event) => {
            console.log('Форма фильтров новостей сброшена!');
            
            // В будущем здесь будет логика для AJAX-запроса,
            // чтобы обновить список новостей без перезагрузки страницы.
            // Например: fetchNewsWithFilters();
        });
    }
//Логика плавного открытия и закрытия карточек на Новостей
    const newsListContainer = document.getElementById('news-list-container');

    if (newsListContainer) {
        // Используем делегирование событий
        newsListContainer.addEventListener('click', (event) => {
            const toggleButton = event.target.closest('.news-card-detailed__toggle-btn');

            // Если клик был не по кнопке, выходим
            if (!toggleButton) return;

            const card = toggleButton.closest('.news-card-detailed');
            const contentBody = card.querySelector('.news-card-detailed__body');
            const buttonText = toggleButton.querySelector('span');
            
            if (!card || !contentBody || !buttonText) return;

            const isExpanded = card.classList.contains('is-expanded');

            // Переключаем состояние
            card.classList.toggle('is-expanded');
            toggleButton.setAttribute('aria-expanded', !isExpanded);

            if (!isExpanded) {
                // --- Открываем ---
                contentBody.style.maxHeight = contentBody.scrollHeight + 'px';
                buttonText.textContent = 'Свернуть';
            } else {
                // --- Закрываем ---
                contentBody.style.maxHeight = null;
                buttonText.textContent = 'Читать полностью';
            }
        });
    }
});
