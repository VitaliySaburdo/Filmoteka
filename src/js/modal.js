import newsApiService from './api-services';
import { markupModalById } from './markup-modal';
import { libraryEl } from './library-storage';
import { scrollController } from './scroll';
import { libraryStorage } from './library-storage.js';
import {openVideoModal} from './modal-trailer';

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

      renderModalContent(filmDetails, trailerData);

      addModalMovieListeners();

      libraryStorage(filmDetails);
      
    } catch (error) {
      console.log(error);
    }
  }
}

function renderModalContent(filmDetails, trailerData) {

  cardContainer.innerHTML = markupModalById(filmDetails, trailerData);

  const youtubeButton = document.querySelector('.modal__btn--youtube');

  if (youtubeButton) {
      youtubeButton.addEventListener('click', () => {
    const videoKey = youtubeButton.getAttribute('data-trailer');
    openVideoModal(videoKey);
  });
  }

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
