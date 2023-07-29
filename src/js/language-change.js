const languageToggleBtn = document.getElementById('language-toggle');

languageToggleBtn.addEventListener('click', toggleLanguage);

let currentLanguage = 'en'

function toggleLanguage() {
    currentLanguage = currentLanguage === 'en' ? 'uk' : 'en';

    setLanguage(currentLanguage)
}

function setLanguage(lang) {
    const langEl = document.querySelectorAll(['data-lang']);

    console.log(lang);
}



const lang = {
    home: {
        en: "Home",
        ua: "Домашня"
    },
    my_library: {
         en: "My library ",
        ua: "Моя бібліотека"
    }
}