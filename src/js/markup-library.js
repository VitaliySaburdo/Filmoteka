const libraryEl = document.querySelector('.library__list');

export function renderLibrary(data) {
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
        <h2 class="gallery__title">${checkTitle(title)}</h2>
        <p class="gallery__txt">${genresConverting(
          genres
        )} | ${release_date.slice(0, 4)}
        </li>`
    )
    .join('');

  if (libraryEl) {
    libraryEl.innerHTML =
      markup ||
      (localStorage.getItem('lang') === 'en'
        ? `<div class="library__background">
      <h2 class='library__title' data-lang='library__title'>Sorry, there are no attached movies here</h2>
      </div>`
        : `<div class="library__background">
      <h2 class='library__title' data-lang='library__title'>Нажаль тут немає доданих фільмів</h2>
      </div>`);
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
    return genres.map(genre => genre.name).join(', ');
  }
  return 'N/A';
}

function checkTitle(title) {
  const arr = title.split('');

  if (arr.length >= 30) {
    return arr.slice(0, 30).join('') + '...';
  }
  return title;
}