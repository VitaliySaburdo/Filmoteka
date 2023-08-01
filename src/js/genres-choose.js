import { getFromStorage } from './local-storage';

const selectEl = document.getElementById('genre_select');

const genres = getFromStorage('genresList');

console.log(genres);

function createElements() {
  genres.forEach(genre => {
    const options = document.createElement('option');
    options.textContent = genre.name;
    selectEl.appendChild(options);
  });
}

createElements();
