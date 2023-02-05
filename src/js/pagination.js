import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
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
  centerAlign: false,
  firstItemClassName: 'tui-first-child',
  lastItemClassName: 'tui-last-child',
  template: {
    page: '<a href="#" class="tui-page-btn">{{page}}</a>',
    currentPage:
      '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
    moveButton:
      '<a href="#" class="tui-page-btn tui-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</a>',
    disabledMoveButton:
      '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</span>',
    moreButton:
      '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
      '<span class="tui-ico-ellip">...</span>' +
      '</a>',
  },
};

const pagination = new Pagination(container, options);

ApiService.fetchTrendingMovie().then(data => {
  let total = data.total_pages;
  pagination.reset(total);
});

pagination.on('afterMove', event => {
  const currentPage = event.page;
  ApiService.fetchPaginationMovie(currentPage).then(data => {
    data;
    console.log(data);
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
