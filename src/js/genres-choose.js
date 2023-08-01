import NewsApiService from './api-services';
import { renderGalleryFilms } from './markup-gallery';
import { generatePagination } from './pagination';

const ApiService = new NewsApiService();

const selectEl = document.getElementById('genre_select');

async function genresChoose() {
  const { genres } = await ApiService.getGenres();

  const allGenresOption = document.createElement('option');
  allGenresOption.textContent = 'All genres';
  selectEl.appendChild(allGenresOption);
  selectEl.value = 'All genres';
  genres.forEach(genre => {
    const options = document.createElement('option');
    options.textContent = genre.name;
    options.dataset.id = genre.id;
    selectEl.appendChild(options);
  });

  selectEl.addEventListener('change', async e => {
    ApiService.genre = e.target.options[e.target.selectedIndex].dataset.id;
    ApiService.currentLanguage = localStorage.getItem('lang');
    ApiService.currentPage = 1;
    const { results, total_pages } = await ApiService.getFilteredMovies();
    // generatePagination(
    //   ApiService.genre,
    //   '',
    //   total_pages,
    //   ApiService.currentPage
    // );
    renderGalleryFilms(results);
  });
}

genresChoose();
// {page: 1, results: Array(20), total_pages: 1467, total_results: 29323}
