import NewsApiService from './api-services';
import { getFromStorage } from './local-storage';
import { renderGalleryFilms } from './markup-gallery';
import { generatePagination } from './pagination';

const ApiService = new NewsApiService();

const selectEl = document.getElementById('genre_select');

export async function genresChoose(langGenres) {
  const { genres } = await ApiService.getGenres();
  let savedGenres = getFromStorage('genresList');

  let currentGenre = savedGenres || langGenres || genres;
  let totalPages;

  if (selectEl) {
    selectEl.innerHTML = '';
    const allGenresOption = document.createElement('option');
    let currentLanguage = localStorage.getItem('lang');
    allGenresOption.textContent =
      currentLanguage === 'en' ? 'All genres' : 'Всі жанри';
    selectEl.appendChild(allGenresOption);
    selectEl.value = 'All genres';

    currentGenre.forEach(genre => {
      const options = document.createElement('option');
      options.textContent = genre.name;
      options.dataset.id = genre.id;
      selectEl.appendChild(options);
    });

    selectEl.addEventListener('change', async e => {
      ApiService.genre = e.target.options[e.target.selectedIndex].dataset.id;

      ApiService.currentPage = 1;
      ApiService.currentLanguage = localStorage.getItem('lang');
      const { results, total_pages } = await ApiService.getFilteredMovies();

      totalPages = total_pages > 500 ? 500 : movieData.total_pages;

      generatePagination(
        '',
        totalPages,
        ApiService.currentPage,
        ApiService.genre
      );
      renderGalleryFilms(results);
    });
  }
}

genresChoose();
