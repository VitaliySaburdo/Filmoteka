import newsApiService from './api-services';
import {
  addToStorage,
  getFromStorage,
  removeFromStorage,
} from './local-storage';
import { generatePagination } from './pagination';
import { renderGalleryFilms } from './markup-gallery';
import { Loading } from 'notiflix/build/notiflix-loading-aio';

const ApiService = new newsApiService();

(async function startGalleryFilms() {
  let totalPages;
  Loading.standard();
  try {
    ApiService.currentLanguage = localStorage.getItem('lang') || 'en';
    const [genresData, movieData] = await Promise.all([
      ApiService.getGenres(),
      ApiService.fetchTrendingMovie(),
    ]);
    if (getFromStorage('currentGenre')) {
      removeFromStorage('currentGenre');
    }
    addToStorage('genresList', genresData.genres);
    renderGalleryFilms(movieData.results);
    totalPages = movieData.total_pages > 500 ? 500 : movieData.total_pages;
    generatePagination('', totalPages);
  } catch (error) {
    console.log(error);
  } finally {
    Loading.remove(300);
  }
})();
