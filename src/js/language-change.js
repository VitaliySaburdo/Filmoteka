import { addToStorage, getFromStorage } from './local-storage';
const languageToggleBtn = document.getElementById('language-toggle');

languageToggleBtn.addEventListener('click', toggleLanguage);

let currentLanguage = getFromStorage('lang') ||'en';

function toggleLanguage() {
  currentLanguage = currentLanguage === 'en' ? 'ua' : 'en';
  
    setLanguage(currentLanguage);
    console.log(typeof currentLanguage);
    addToStorage('lang', currentLanguage);
}



function setLanguage(currentLanguage) {
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
    en: 'My library ',
    ua: 'Моя бібліотека',
  },
};

setLanguage(currentLanguage);