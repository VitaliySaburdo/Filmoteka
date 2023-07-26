import newsApiService from './api-services';
import { addToStorage, getFromStorage } from './local-storage';
import { generatePagination } from './pagination';

const imageGalleryRef = document.querySelector('.gallery-list');

const ApiService = new newsApiService();

async function startGalleryFilms() {
  try {
    const [genresData, movieData] = await Promise.all([
      ApiService.getGenres(),
      ApiService.fetchTrendingMovie()
    ]);

    addToStorage('genresList', genresData.genres);
    renderGalleryFilms(movieData.results);
    generatePagination('', 500);
    
  } catch (error) {
    console.log(error)
  }
}
startGalleryFilms();




export function renderGalleryFilms(data) {
  imageGalleryRef.innerHTML = '';
  const markupGallery = data
    .map(
      ({
        id,
        original_title,
        poster_path,
        title,
        genre_ids,
        release_date,
      }) => `<li class="gallery__item" data-id="${id}">
        <img src="${renderImg(
          poster_path
        )}" alt="${title}" class="gallery_img" width="395" height="574" />
        <h2 class="gallery__title">${checkTitle(original_title)}</h2>
        <p class="gallery__txt">${changeGenre(genre_ids)} | ${checkDate(
        release_date
      )}
      </li>`
    )
    .join('');

  imageGalleryRef.insertAdjacentHTML('beforeend', markupGallery);

  function renderImg(poster_path) {
    if (poster_path) {
      return `https://image.tmdb.org/t/p/w500${poster_path}`;
    }
    return `https://upload.wikimedia.org/wikipedia/commons/c/c2/No_image_poster.png?20170513175923`;
  }

  function checkDate(release_date) {
    if (release_date) {
      return release_date.split('-')[0];
    }
    return '';
  }

  function checkTitle(original_title) {
    const arr = original_title.split('');

    if (arr.length >= 33) {
      return arr.slice(0, 33).join('') + '...';
    }
    return original_title;
  }

  function changeGenre(genre_ids) {
    const genresInfo = getFromStorage('genresList');

    const genreArray = [];

    for (const genre_id of genre_ids) {
      for (const genreInfo of genresInfo) {
        if (genreInfo.id === genre_id) {
          genreArray.push(genreInfo.name);
        }
      }
    }
    if (genreArray.length > 2) {
      return genreArray.slice(0, 2).join(', ') + ' and Other';
    }
    return genreArray.join(', ');
  }
}
