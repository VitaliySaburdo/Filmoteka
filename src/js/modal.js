import newsApiService from './fetch';
import { murkupMovie } from './markupModal';
import { libraryEl } from './library-storage';
import { scrollController } from './scroll';
import { libraryStorage } from './library-storage.js';

const newData = new newsApiService();

const cardContainer = document.querySelector('.modal-window');
const card = document.querySelector('.gallery-list');
const modal = document.querySelector('.modal-backdrop');

if (card) {
  card.addEventListener('click', onOpenModal);
}
if (libraryEl) {
  libraryEl.addEventListener('click', onOpenModal);
}

function onOpenModal(event) {
  const selectedMovie = event.target.closest('.gallery__item');
  // Получаю id
  const selectedMovieId = selectedMovie.getAttribute('data-id');
  if (event.target.nodeName !== 'BUTTON') {
    // Открываю окно
    openModal();
    //Получение данных о фильме в модалку
    newData
      .getFilmDetails(selectedMovieId)
      .then(data => {
        renderModalContent(data);
        addModalMovieListeners();
        return data;
      })
      .then(data => libraryStorage(data))
      .catch(error => console.log(error));
  }
}

function renderModalContent(data) {
  cardContainer.innerHTML = murkupMovie(data);
}
function openModal() {
  // Тут бы спинер добавить
  setTimeout(() => {
    modal.classList.remove('is-hidden');
    scrollController.disabledScroll();
  }, 300);
}

function onCloseModal() {
  modal.classList.add('is-hidden');
  scrollController.enabledScroll();
  cardContainer.innerHTML = '';
  removeModalMovieListeners();
}
function addModalMovieListeners() {
  const closeBtn = document.querySelector('.js-close');
  closeBtn.addEventListener('click', onCloseModal);
  document.addEventListener('keydown', onEscBtn);
  document.addEventListener('click', onBackDrop);
}
function removeModalMovieListeners() {
  document.removeEventListener('keydown', onEscBtn);
  document.removeEventListener('click', onBackDrop);
}

function onBackDrop(event) {
  if (event.target === modal) {
    onCloseModal();
  }
}

function onEscBtn(event) {
  if (event.key === 'Escape') {
    onCloseModal();
  }
}
