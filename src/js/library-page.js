import {
  addToStorage,
  getFromStorage,
} from './local-storage';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import {renderLibrary} from './markup-library';

export const libraryEl = document.querySelector('.library__list');
const queueButton = document.querySelector('.queue_button');
const watchedButton = document.querySelector('.watched_button');

let queueMovie = getFromStorage('queue') || [];
let watchMovie = getFromStorage('watch') || [];

if (libraryEl) {
  Loading.standard();
  Loading.remove(500);
  watchedButton.addEventListener('click', handleClickWatched);
  queueButton.addEventListener('click', handleClickQueue);
}

export function libraryStorage(movieData) {
  const filmObject = JSON.stringify(movieData);

  const watchBtn = document.querySelector('.js-watched');
  const queueBtn = document.querySelector('.js-queue');

  setButtonStatus('watch', watchBtn);
  setButtonStatus('queue', queueBtn);

  function setButtonStatus(type, button) {
    if (
      localStorage.getItem(type) !== null &&
      localStorage.getItem(type).includes(filmObject)
    ) {
      let watchedBtnTxt =
        localStorage.getItem('lang') === 'en'
          ? 'REMOVE FROM WATCHED'
          : 'ВИДАЛИТИ З ПЕРЕГЛЯНУТИХ';
      let queueBtnTxt =
        localStorage.getItem('lang') === 'en'
          ? 'REMOVE TO QUEUE'
          : 'ВИДАЛИТИ З ЧЕРГИ ПЕРЕГЛЯДУ';
      button.textContent = type === 'watch' ? watchedBtnTxt : queueBtnTxt;
      button.classList.add('button--accent');
    }
  }

  watchBtn.addEventListener('click', () =>
    handleButtonClick('watch', watchBtn)
  );
  queueBtn.addEventListener('click', () =>
    handleButtonClick('queue', queueBtn)
  );

  function handleButtonClick(type, button) {
    if (movieData) {
      const movieList = type === 'watch' ? watchMovie : queueMovie;
      const movieIndex = movieList.findIndex(e => e.id === movieData.id);

      if (movieIndex !== -1) {
        button.classList.remove('button--accent');
        let addWatched =
          localStorage.getItem('lang') === 'en'
            ? 'ADD TO WATCHED'
            : 'ДОДАТИ ПО ПЕРЕГЛЯНУТИХ';
        let addQueue =
          localStorage.getItem('lang') === 'en'
            ? 'ADD TO QUEUE'
            : 'ДОДАТИ ПО ЧЕРГИ ПЕРЕГЛЯДУ';

        button.textContent = type === 'watch' ? addWatched : addQueue;
        movieList.splice(movieIndex, 1);
        console.log(movieList);
        addToStorage(type, movieList);
        renderLibrary(movieList, type);
      } else {
        let removedWatched =
          localStorage.getItem('lang') === 'en'
            ? 'REMOVE FROM WATCHED'
            : 'ВИДАЛИТИ З ПЕРЕГЛЯНУТИХ';
        let removeQueue =
          localStorage.getItem('lang') === 'en'
            ? 'REMOVE TO QUEUE'
            : 'ВИДАЛИТИ З ЧЕРГИ ПЕРЕГЛЯДУ';
        button.textContent = type === 'watch' ? removedWatched : removeQueue;
        button.classList.add('button--accent');
        movieList.push(movieData);
        addToStorage(type, movieList);
        renderLibrary(movieList, type);
      }
    }
    if (libraryEl) {
      if (type === 'watch') {
        watchedButton.classList.add('btn__active');
        queueButton.classList.remove('btn__active');
      } else if (type === 'queue') {
        watchedButton.classList.remove('btn__active');
        queueButton.classList.add('btn__active');
      }
    }
  }
}

function handleClickWatched() {
  renderSavedFilms('watch');
  if (libraryEl) {
    watchedButton.classList.add('btn__active');
    queueButton.classList.remove('btn__active');
  }
}
handleClickWatched();

function handleClickQueue() {
  renderSavedFilms('queue');
  if (libraryEl) {
    watchedButton.classList.remove('btn__active');
    queueButton.classList.add('btn__active');
  }
}

function renderSavedFilms(name) {
  const storageMovies = getFromStorage(name);
  if (storageMovies) {
    renderLibrary(storageMovies);
  } else {
    renderLibrary([]);
  }
}
