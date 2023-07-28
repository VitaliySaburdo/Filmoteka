import { Loading } from 'notiflix/build/notiflix-loading-aio';

document.addEventListener('DOMContentLoaded', function () {
  const libraryPageLink = document.querySelector('.library__link');

  if (libraryPageLink) {
    libraryPageLink.addEventListener('click', function () {
      Loading.standard();
    });
  }
});

document.addEventListener('DOMContentLoaded', function () {
  // Call the remove method after 300 milliseconds to remove the loader
  setTimeout(function () {
    Loading.remove(300);
  }, 300);
});
