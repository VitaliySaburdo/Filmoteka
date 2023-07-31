import icons from '../images/sprite.svg';
import { genresConverting, imgRender } from './checkers';

export const markupModalById = (
  {
    poster_path,
    popularity,
    vote_average,
    vote_count,
    title,
    genres,
    overview,
  },
  { results }
) => {
  return ` <button class="modal__btn-close js-close">
  <svg width="18" height="18">
    <use href=${icons + '#icon-close'}></use>
  </svg>
</button>
<div class="modal__sidebar--left">
  <img
    class="modal__img"
    src="${imgRender(poster_path)}"
    alt="${title}"
    width="395"
    height="574"
  />
</div>

<div class="modal__sidebar--right">
  <h2 class="modal__title">${title}</h2>
  <ul class="modal__list lst">
    <li class="modal__item">
      <p class="modal__heading lng-vote">${
        localStorage.getItem('lang') === 'en'
          ? 'Vote / Votes'
          : 'Рейтинг / Голосів'
      }</p>
      <p class="modal__txt">
        <span class="modal__vote">${vote_average.toFixed(1)}</span> /
        <span class="modal__votes">${vote_count.toFixed(1)}</span>
      </p>
    </li>
    <li class="modal__item">
      <p class="modal__heading lng-popular">${
        localStorage.getItem('lang') === 'en' ? 'Popularity' : 'Популярність'
      }</p>
      <p class="modal__txt">${popularity.toFixed(1)}</p>
    </li>
    <li class="modal__item">
      <p class="modal__heading lng-originalTitle">${
        localStorage.getItem('lang') === 'en'
          ? 'Original Title'
          : 'Оригінальна Назва'
      }</p>
      <p class="modal__txt">${title}</p>
    </li>
    <li class="modal__item">
      <p class="modal__heading lng-genre">${
        localStorage.getItem('lang') === 'en' ? 'Genre' : 'Жанр'
      }</p>
      <p class="modal__txt">${genresConverting(genres)}</p>
    </li>
  </ul>
  <h3 class="modal__subtitle lng-about">${
    localStorage.getItem('lang') === 'en' ? 'ABOUT' : 'ОПИС'
  }</h3>
  <p class="modal__desc">${overview}</p>
  <div class="modal__box">
    <button name=watched type="button" class="modal__btn--left js-watched">
    ${
      localStorage.getItem('lang') === 'en'
        ? 'add to Watched'
        : 'додати до переглянутих'
    }
      
    </button>
    <button name=queue type="button" class="modal__btn--right js-queue">
    ${
      localStorage.getItem('lang') === 'en'
        ? 'add to queue'
        : 'додати до черги перегляду'
    }
      
    </button>
  </div>
    ${
      results.length
        ? `<button type="button" class="modal__btn--youtube" data-trailer=${
            results[0].key
          }>  
    <svg width="160" height="64">
      <use href=${icons + '#icon-youtube'}></use>
    </svg>
  </button>`
        : ''
    }
</div>`;
};
