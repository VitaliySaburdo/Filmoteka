import newsApiService from './api-services';
import { renderGalleryFilms } from './markup-gallery';

const ApiService = new newsApiService();

let totalItems;
let query;

export function generatePagination(querySearch, itemsCount, page) {
  totalItems = itemsCount;
  query = querySearch;
  localStorage.setItem('page', ApiService.currentPage)

  const paginationContainer = document.querySelector('.pagination');
  paginationContainer.innerHTML = '';

  if (totalItems <= 1) {
    document.querySelector('.next').style.display = 'none';
    document.querySelector('.prev').style.display = 'none';
    return;
  } else {
    document.querySelector('.next').style.display = 'block';
    document.querySelector('.prev').style.display = 'block';
  }

  if (totalItems <= 1) {
    return;
  }

  if (page) {
    ApiService.currentPage = 1;
  }

  const createPageElement = (pageNumber, isActive) => {
    const li = document.createElement('li');
    li.textContent = pageNumber;
    li.classList.add('page');
    if (isActive) {
      li.classList.add('active');
    }
    li.addEventListener('click', async () => {
      ApiService.currentPage = pageNumber;
      localStorage.setItem('page', ApiService.currentPage)
      handleButtonClick();
      backToTop();
    });
    return li;
  };

  const paginationFragment = document.createDocumentFragment();

  if (totalItems <= 7) {
    for (let i = 1; i <= totalItems; i++) {
      paginationFragment.appendChild(
        createPageElement(i, i === ApiService.currentPage)
      );
    }
  } else {
    if (ApiService.currentPage <= 4) {
      for (let i = 1; i <= 6; i++) {
        paginationFragment.appendChild(
          createPageElement(i, i === ApiService.currentPage)
        );
      }
      paginationFragment.appendChild(document.createElement('li')).textContent =
        '...';
      paginationFragment.appendChild(createPageElement(totalItems, false));
    } else if (ApiService.currentPage > totalItems - 4) {
      paginationFragment.appendChild(createPageElement(1, false));
      paginationFragment.appendChild(document.createElement('li')).textContent =
        '...';
      for (let i = totalItems - 5; i <= totalItems; i++) {
        paginationFragment.appendChild(
          createPageElement(i, i === ApiService.currentPage)
        );
      }
    } else {
      paginationFragment.appendChild(createPageElement(1, false));
      paginationFragment.appendChild(document.createElement('li')).textContent =
        '...';
      for (
        let i = ApiService.currentPage - 2;
        i <= ApiService.currentPage + 2;
        i++
      ) {
        paginationFragment.appendChild(
          createPageElement(i, i === ApiService.currentPage)
        );
      }
      paginationFragment.appendChild(document.createElement('li')).textContent =
        '...';
      paginationFragment.appendChild(createPageElement(totalItems, false));
    }
  }
  paginationContainer.appendChild(paginationFragment);
}

const nextButton = document.querySelector('.next');
nextButton.addEventListener('click', async () => {
  if (ApiService.currentPage < totalItems) {
    ApiService.currentPage++;
    localStorage.setItem('page', ApiService.currentPage)
    handleButtonClick();
    backToTop();
  }
});

const prevButton = document.querySelector('.prev');
prevButton.addEventListener('click', async () => {
  if (ApiService.currentPage > 1) {
    ApiService.currentPage--;
    localStorage.setItem('page', ApiService.currentPage)
    handleButtonClick();
    backToTop();
  }
});

async function handleButtonClick() {
  if (query) {
    generatePagination(query, totalItems);
    ApiService.searchQuery = query;
    ApiService.currentLanguage = localStorage.getItem('lang');
    const { results } = await ApiService.getFilmOnSearch();
    renderGalleryFilms(results);
  } else {
    ApiService.currentLanguage = localStorage.getItem('lang');
    const { results } = await ApiService.fetchTrendingMovie();
    generatePagination('', totalItems);
    renderGalleryFilms(results);
  }
}

function backToTop() {
  if (window.pageYOffset > 0) {
    window.scrollBy(0, -30);
    setTimeout(backToTop, 0);
  }
}
