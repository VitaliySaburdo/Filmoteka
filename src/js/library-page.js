import {
  addToStorage,
  getFromStorage,
  removeFromStorage,
} from './local-storage';
import { Loading } from 'notiflix/build/notiflix-loading-aio';

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
      button.textContent =
        type === 'watch' ? 'REMOVE FROM WATCHED' : 'REMOVE FROM QUEUE';
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
        button.textContent =
          type === 'watch' ? 'ADD TO WATCHED' : 'ADD TO QUEUE';
        movieList.splice(movieIndex, 1);
        removeFromStorage(type);
        renderLibrary(movieList, type);
      } else {
        button.textContent =
          type === 'watch' ? 'REMOVE FROM WATCHED' : 'REMOVE FROM QUEUE';
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
    renderLibrary(storageMovies, name);
  } else {
    renderLibrary([], name);
  }
}

function renderLibrary(data, name) {
  const markup = data
    .map(
      ({
        id,
        poster_path,
        title,
        genres,
        release_date,
      }) => `<li class="gallery__item" data-id="${id}">
        <img src="${renderImg(
          poster_path
        )}" alt="${title}" class="gallery_img" width="395" height="574" />
        <h2 class="gallery__title">${title}</h2>
        <p class="gallery__txt">${genresConverting(
          genres
        )} | ${release_date.slice(0, 4)}
        </li>`
    )
    .join('');

  if (libraryEl) {
    libraryEl.innerHTML =
      markup ||
      `<div class="library__background">
      <h2 class='library__title'>Sorry, you don't have movies in your ${name}</h2>
      </div>`;
  }
}

function renderImg(poster_path) {
  if (poster_path) {
    return `https://image.tmdb.org/t/p/w500${poster_path}`;
  }
  return `https://upload.wikimedia.org/wikipedia/commons/c/c2/No_image_poster.png?20170513175923`;
}

function genresConverting(genres) {
  if (genres.length) {
    const genreArray = [];
    genres.map(genre => {
      genreArray.push(genre.name);
    });

    return genreArray.join(', ');
  }
  return 'N/A';
}
