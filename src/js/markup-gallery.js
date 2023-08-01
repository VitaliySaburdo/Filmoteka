import { getFromStorage } from './local-storage';

const imageGalleryRef = document.querySelector('.gallery-list');

export function renderGalleryFilms(moviesCards) {
  const markupGallery = moviesCards
    .map(
      ({
        id,
        poster_path,
        title,
        genre_ids,
        release_date,
      }) => `<li class="gallery__item" data-id="${id}">
        <img src="${renderImg(
          poster_path
        )}" alt="${title}" class="gallery_img" width="395" height="574" />
        <h2 class="gallery__title">${checkTitle(title)}</h2>
        <p class="gallery__txt">${changeGenre(genre_ids)} | ${checkDate(
        release_date
      )}
      </li>`
    )
    .join('');

  imageGalleryRef.innerHTML = markupGallery;
}

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

function checkTitle(title) {
  const arr = title.split('');

  if (arr.length >= 30) {
    return arr.slice(0, 30).join('') + '...';
  }
  return title;
}

function changeGenre(genre_ids) {
  const genresInfo = getFromStorage('genresList');

  const genreArray = genresInfo
    .filter(genre => genre_ids.includes(genre.id))
    .map(genre => genre.name);
  
    if (genreArray.length > 2) {
    return genreArray.slice(0, 2).join(', ') + ' ...';
  }
  return genreArray.join(', ');
}
