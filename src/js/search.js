import NewsApiService from './fetch';
import { renderGalleryFilms } from './gallery';

const NewApiService = new NewsApiService();
const searchForm = document.querySelector('#header-form');
const cardsContainer = document.querySelector('.gallery-list');

searchForm.addEventListener('submit', onSubmit);

let currentPage = 1;
let amountOfPages = 1;
let query = '';
let dataArray = [];

async function onSubmit(e) {
  e.preventDefault();
  query = e.currentTarget.elements.searchQuery.value.trim();
  try {
    const { results, page, total_pages } = await NewApiService.getFilmOnSearch(
      query
    );
    currentPage = page;
    amountOfPages = total_pages;
    dataArray = results;
  } catch (error) {
    console.log(error);
  }
  cardsContainer.innerHTML = '';
  renderGalleryFilms(dataArray);
  console.log(amountOfPages);
}
