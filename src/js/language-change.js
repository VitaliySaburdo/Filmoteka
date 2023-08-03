import { addToStorage, getFromStorage, removeFromStorage } from './local-storage';
import NewsApiService from './api-services';
import { renderGalleryFilms } from './markup-gallery';
import { genresChoose } from './genres-choose';

const ApiService = new NewsApiService();

const languageToggleBtn = document.getElementById('language-toggle');
const toggleTheme = document.querySelector('.language');

languageToggleBtn.addEventListener('click', toggleLanguage);

let currentLanguage = localStorage.getItem('lang') || 'en';
addToStorage('lang', currentLanguage);
if (currentLanguage === 'uk') {
  toggleTheme.classList.toggle('toggle__lang');
}

async function toggleLanguage() {
  toggleTheme.classList.toggle('toggle__lang');

  currentLanguage = currentLanguage === 'en' ? 'uk' : 'en';

  setLanguage(currentLanguage);

  ApiService.currentLanguage = currentLanguage;
  ApiService.currentPage = JSON.parse(localStorage.getItem('page'));
  const genresData = await ApiService.getGenres();
  addToStorage('genresList', genresData.genres);
  genresChoose(genresData.genres);

  if (getFromStorage('currentGenre')) {
    ApiService.genre = getFromStorage('currentGenre')
    console.log(ApiService.genre);
    
    const { results} = await ApiService.getFilteredMovies();
    renderGalleryFilms(results);
  } else {
    removeFromStorage('currentGenre')
  const data = await ApiService.fetchTrendingMovie();
  renderGalleryFilms(data.results);
  }
  
  


}

function setLanguage(currentLanguage) {
  addToStorage('lang', currentLanguage);
  const langEls = document.querySelectorAll('[data-lang]');
  langEls.forEach(el => {
    const key = el.getAttribute('data-lang');
    if (languages.hasOwnProperty(key)) {
      el.textContent = languages[key][currentLanguage];
      el.placeholder = languages[key][currentLanguage];
    }
  });
}

const languages = {
  filmoteka: {
    en: 'Filmoteka',
    uk: 'Фільмотека',
  },
  home: {
    en: 'Home',
    uk: 'Домашня',
  },
  my_library: {
    en: 'My library',
    uk: 'Моя бібліотека',
  },
  dark_theme: {
    en: 'dark',
    uk: 'темна',
  },
  light_theme: {
    en: 'light',
    uk: 'світла',
  },
  placeholder: {
    en: 'Movie search',
    uk: 'Пошук фільму',
  },
  footer_text: {
    en: '© 2022 | All Rights Reserved',
    uk: '© 2022 | Всі права захищені',
  },
  watched: {
    en: 'Watched',
    uk: 'Переглянуті',
  },
  queue: {
    en: 'Queue',
    uk: 'Черга перегляду',
  },
  library__title: {
    en: 'Sorry, there are no attached movies here',
    uk: 'Нажаль тут немає доданих фільмів',
  },
  add_to_watched: {
    en: 'add to watched',
    uk: 'Додати до переглянутих',
  },
};

setLanguage(currentLanguage);
