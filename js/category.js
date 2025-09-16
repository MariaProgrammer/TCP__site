// --- Логика для сброса фильтра категорий ---
document.addEventListener('DOMContentLoaded', () => {
    const categoryFiltersForm = document.getElementById('category-filters-form');

    if (categoryFiltersForm) {
        // Слушаем стандартное событие 'reset' на форме
        categoryFiltersForm.addEventListener('reset', (event) => {
            console.log('Форма фильтров категорий сброшена!');
            
            // В будущем здесь будет логика для AJAX-запроса,
            // чтобы обновить список товаров/производителей без перезагрузки страницы.
        });
    }
});
