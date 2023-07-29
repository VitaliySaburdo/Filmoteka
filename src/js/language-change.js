import { addToStorage, getFromStorage } from './local-storage';
const languageToggleBtn = document.getElementById('language-toggle');

languageToggleBtn.addEventListener('click', toggleLanguage);

let currentLanguage = getFromStorage('lang') || 'en';

addToStorage('lang', currentLanguage);

function toggleLanguage() {
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
    }
  });
}

const languages = {
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
};

setLanguage(currentLanguage);
