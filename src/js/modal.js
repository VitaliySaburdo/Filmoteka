import newsApiService from './api-services';
import { markuModalById } from './markup-modal';
import { libraryEl } from './library-storage';
import { scrollController } from './scroll';
import { libraryStorage } from './library-storage.js';

const ApiService = new newsApiService();

const cardContainer = document.querySelector('.modal-window');
const card = document.querySelector('.gallery-list');
const modal = document.querySelector('.modal-backdrop');

if (card) {
  card.addEventListener('click', onOpenModal);
}
if (libraryEl) {
  libraryEl.addEventListener('click', onOpenModal);
}

async function onOpenModal(event) {
  const selectedMovie = event.target.closest('.gallery__item');

  const selectedMovieId = selectedMovie.getAttribute('data-id');
  if (event.target.nodeName !== 'BUTTON') {
    openModal();
    try {
      const [filmDetails, trailerData] = await Promise.all([
        ApiService.getFilmDetails(selectedMovieId),
        ApiService.getTrailerById(selectedMovieId),
      ]);

      console.log(filmDetails);
      console.log(trailerData);

      renderModalContent(filmDetails, trailerData);

      addModalMovieListeners();
      libraryStorage(filmDetails);
    } catch (error) {
      console.log(error);
    }
  }
}

function renderModalContent(filmDetails, trailerData) {
  cardContainer.innerHTML = markuModalById(filmDetails, trailerData);
}
function openModal() {
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
