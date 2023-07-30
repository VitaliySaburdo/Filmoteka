import { addToStorage, getFromStorage } from './local-storage';

const languageToggleBtn = document.getElementById('language-toggle');
const toggleTheme = document.querySelector('.language');

languageToggleBtn.addEventListener('click', toggleLanguage);

let currentLanguage = localStorage.getItem('lang') || 'en';
addToStorage('lang', currentLanguage);
if (currentLanguage === 'ua') {
  toggleTheme.classList.toggle('toggle__lang');
}

function toggleLanguage() {
toggleTheme.classList.toggle('toggle__lang')

  currentLanguage = currentLanguage === 'en' ? 'ua' : 'en';

  setLanguage(currentLanguage);
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
};

setLanguage(currentLanguage);
