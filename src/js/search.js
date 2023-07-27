import NewsApiService from './api-services';
import { renderGalleryFilms } from './markup-gallery';
import Notiflix from 'notiflix';
import { generatePagination } from './pagination';
import { Loading } from 'notiflix/build/notiflix-loading-aio';

const ApiService = new NewsApiService();
const searchForm = document.querySelector('#header-form');
const cardsContainer = document.querySelector('.gallery-list');

searchForm.addEventListener('submit', onSubmit);

async function onSubmit(e) {
  e.preventDefault();
  ApiService.searchQuery = e.currentTarget.elements.searchQuery.value.trim();
  e.currentTarget.elements.searchQuery.value = '';
  if (ApiService.searchQuery === '') {
    Notiflix.Notify.info(`Please enter your query`, {
      position: 'center-top',
      distance: '40px',
      cssAnimationStyle: 'from-top',
    });
    return;
  }

  ApiService.currentPage = 1;

  Loading.standard();

  try {
    const data = await ApiService.getFilmOnSearch();
    if (data.results.length !== 0) {
      cardsContainer.innerHTML = '';
      renderGalleryFilms(data.results);
      generatePagination(
        ApiService.searchQuery,
        data.total_pages,
        ApiService.currentPage
      );
    } else {
      return Notiflix.Notify.info(`${ApiService.searchQuery} movie not found`, {
        position: 'center-top',
        distance: '40px',
        cssAnimationStyle: 'from-top',
      });
    }
  } catch (error) {
    console.log(error);
  } finally {
    Loading.remove(300);
  }
}
