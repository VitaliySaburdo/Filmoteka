import icons from '../images/sprite.svg';
import { genresConverting, imgRender } from './checkers';

export const markupModalById = (
  {
    poster_path,
    popularity,
    vote_average,
    vote_count,
    title,
    original_title,
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
    alt="${original_title}"
    width="395"
    height="574"
  />
</div>

<div class="modal__sidebar--right">
  <h2 class="modal__title">${title}</h2>
  <ul class="modal__list lst">
    <li class="modal__item">
      <p class="modal__heading lng-vote">Vote / Votes</p>
      <p class="modal__txt">
        <span class="modal__vote">${vote_average.toFixed(1)}</span> /
        <span class="modal__votes">${vote_count.toFixed(1)}</span>
      </p>
    </li>
    <li class="modal__item">
      <p class="modal__heading lng-popular">Popularity</p>
      <p class="modal__txt">${popularity.toFixed(1)}</p>
    </li>
    <li class="modal__item">
      <p class="modal__heading lng-originalTitle">Original Title</p>
      <p class="modal__txt">${original_title}</p>
    </li>
    <li class="modal__item">
      <p class="modal__heading lng-genre">Genre</p>
      <p class="modal__txt">${genresConverting(genres)}</p>
    </li>
  </ul>
  <h3 class="modal__subtitle lng-about">ABOUT</h3>
  <p class="modal__desc">${overview}</p>
  <div class="modal__box">
    <button name=watched type="button" class="modal__btn--left js-watched">
      add to Watched
    </button>
    <button name=queue type="button" class="modal__btn--right js-queue">
      add to queue
    </button>
  </div>
    ${results.length ?
      `<button type="button" class="modal__btn--youtube" data-trailer=${results[0].key}>  
    <svg width="160" height="64">
      <use href=${icons + '#icon-youtube'}></use>
    </svg>
  </button>` : ''}
</div>`;
};

