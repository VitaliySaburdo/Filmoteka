import NewsApiService from './fetch';
import { renderGalleryFilms } from './gallery';
import Pagination from 'tui-pagination';

import { options, backToTop } from './pagination';

const ApiService = new NewsApiService();
const searchForm = document.querySelector('#header-form');
const cardsContainer = document.querySelector('.gallery-list');
const container = document.getElementById('pagination');

searchForm.addEventListener('submit', onSubmit);

async function onSubmit(e) {
  e.preventDefault();
  ApiService.searchQuery = e.currentTarget.elements.searchQuery.value.trim();

  const pagination = new Pagination(container, options);

  ApiService.getFilmOnSearch().then(data => {
    const total = data.total_pages;
    pagination.reset(total);
  });

  ApiService.getFilmOnSearch().then(data => {
    data;
    console.log(data.results);
    if (data.results !== 0) {
      cardsContainer.innerHTML = '';
      renderGalleryFilms(data.results);
    } else {
      alert('No movies');
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
