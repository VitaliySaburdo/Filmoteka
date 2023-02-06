import Pagination from 'tui-pagination';

import newsApiService from './fetch';
import { renderGalleryFilms } from './gallery';

const ApiService = new newsApiService();
const galleryEl = document.querySelector('.gallery-list');
const container = document.getElementById('pagination');

export const options = {
  totalItems: 10,
  itemsPerPage: 1,
  visiblePages: 5,
  page: 1,
  centerAlign: true,
  template: {
    page: '<a href="#" class="tui-page-btn">{{page}}</a>',
    currentPage:
      '<strong class="tui-page-btn tui-is-selected" >{{page}}</strong>',
    moveButton:
      '<a href="#" class="tui-page-btn tui-{{type}} custom-class-{{type}}">' +
      '<span class="tui-ico-{{type}}"></span>' +
      '</a>',
    disabledMoveButton:
      '<span class="tui-page-btn tui-is-disabled tui-{{type}} custom-class-{{type}}">' +
      '<span class="tui-ico-{{type}}"></span>' +
      '</span>',
    moreButton:
      '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip custom-class-{{type}}">' +
      '<span class="tui-ico-ellip"></span>' +
      '</a>',
  },
};

const pagination = new Pagination(container, options);

ApiService.fetchTrendingMovie().then(data => {
  let total = data.total_pages;
  pagination.reset(total);
});

pagination.on('afterMove', event => {
  let currentPage = event.page;
  ApiService.page = currentPage;

  ApiService.fetchTrendingMovie().then(data => {
    data;
    galleryEl.innerHTML = '';
    renderGalleryFilms(data.results);
  });
  backToTop();
});

export function backToTop() {
  if (window.pageYOffset > 0) {
    window.scrollBy(0, -30);
    setTimeout(backToTop, 0);
  }
}
