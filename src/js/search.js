import NewsApiService from './api-services';
import { renderGalleryFilms } from './gallery';
import Notiflix from 'notiflix';

const ApiService = new NewsApiService();
const searchForm = document.querySelector('#header-form');
const cardsContainer = document.querySelector('.gallery-list');

searchForm.addEventListener('submit', onSubmit);

async function onSubmit(e) {
  e.preventDefault();
  ApiService.searchQuery = e.currentTarget.elements.searchQuery.value.trim();

  if (ApiService.searchQuery === '') {
    Notiflix.Notify.info(`Please enter your query`, {
      position: 'center-top',
      distance: '40px',
      cssAnimationStyle: 'from-top',
    });
    return;
  }

  ApiService.getFilmOnSearch().then(data => {
    if (data.results.length !== 0) {
      cardsContainer.innerHTML = '';
      renderGalleryFilms(data.results);
    } else {
      return Notiflix.Notify.info(`${ApiService.searchQuery} movie not found`, {
        position: 'center-top',
        distance: '40px',
        cssAnimationStyle: 'from-top',
      });
    }
  });
  e.currentTarget.elements.searchQuery.value = '';
}
