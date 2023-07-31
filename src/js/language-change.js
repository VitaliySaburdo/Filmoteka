import { addToStorage } from './local-storage';
import NewsApiService from './api-services';
import { renderGalleryFilms } from './markup-gallery';

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
  const genresData = await ApiService.getGenres();
  console.log(genresData);
  addToStorage('genresList', genresData.genres);
  const data = await ApiService.fetchTrendingMovie();
  renderGalleryFilms(data.results);
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
    uk: 'До перегляду',
  },
  library__title: {
    en: 'Sorry, there are no attached movies here',
    uk: 'Нажаль тут немає доданих фільмів',
  },
};

setLanguage(currentLanguage);
