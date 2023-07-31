import { addToStorage } from './local-storage';
import NewsApiService from './api-services';
import { renderGalleryFilms } from './markup-gallery';

const ApiService = new NewsApiService();

const languageToggleBtn = document.getElementById('language-toggle');
const toggleTheme = document.querySelector('.language');

languageToggleBtn.addEventListener('click', toggleLanguage);

let currentLanguage = localStorage.getItem('lang') || 'en';
addToStorage('lang', currentLanguage);
if (currentLanguage === 'ua') {
  toggleTheme.classList.toggle('toggle__lang');
}

async function toggleLanguage() {
  toggleTheme.classList.toggle('toggle__lang');

  currentLanguage = currentLanguage === 'en' ? 'ua' : 'en';

  setLanguage(currentLanguage);

  ApiService.currentLanguage = currentLanguage;
  const data = await ApiService.fetchTrendingMovie();
  console.log(data.results);
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
    ua: 'Фільмотека',
  },
  home: {
    en: 'Home',
    ua: 'Домашня',
  },
  my_library: {
    en: 'My library',
    ua: 'Моя бібліотека',
  },
  dark_theme: {
    en: 'dark',
    ua: 'темна',
  },
  light_theme: {
    en: 'light',
    ua: 'світла',
  },
  placeholder: {
    en: 'Movie search',
    ua: 'Пошук фільму',
  },
  footer_text: {
    en: '© 2022 | All Rights Reserved',
    ua: '© 2022 | Всі права захищені',
  },
  watched: {
    en: 'Watched',
    ua: 'Переглянуті',
  },
  queue: {
    en: 'Queue',
    ua: 'До перегляду',
  },
  library__title: {
    en: 'Sorry, there are no attached movies here',
    ua: 'Нажаль тут немає доданих фільмів',
  },
};

setLanguage(currentLanguage);
