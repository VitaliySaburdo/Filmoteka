import NewsApiService from './fetch';
import { renderGalleryFilms } from './gallery';
import Pagination from 'tui-pagination';
import Notiflix from 'notiflix';

import { options, backToTop } from './pagination';

const ApiService = new NewsApiService();
const searchForm = document.querySelector('#header-form');
const cardsContainer = document.querySelector('.gallery-list');
const container = document.getElementById('pagination');

searchForm.addEventListener('submit', onSubmit);

async function onSubmit(e) {
  e.preventDefault();
  ApiService.searchQuery = e.currentTarget.elements.searchQuery.value.trim();

  if (ApiService.searchQuery === '') {
    Notiflix.Notify.init(`Please enter your query`, {
      position: 'center-top',
      distance: '40px',
      cssAnimationStyle: 'from-top',
    });
    return;
  }

  const pagination = new Pagination(container, options);

  ApiService.getFilmOnSearch().then(data => {
    const total = data.total_pages;
    pagination.reset(total);
  });

  ApiService.getFilmOnSearch().then(data => {
    data;
    console.log(data.results);
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

  pagination.on('afterMove', event => {
    let currentPage = event.page;
    ApiService.page = currentPage;
    ApiService.getFilmOnSearch().then(data => {
      data;
      cardsContainer.innerHTML = '';
      renderGalleryFilms(data.results);
    });
    backToTop();
  });
}
