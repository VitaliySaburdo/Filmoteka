import newsApiService from './api-services';
import { renderGalleryFilms } from './gallery';

const ApiService = new newsApiService();

export function generatePagination(query, totalItems) {
  const paginationContainer = document.querySelector('.pagination');
  paginationContainer.innerHTML = '';

  if (totalItems <= 1) {
    return;
  }

  const createPageElement = (pageNumber, isActive) => {
    const li = document.createElement('li');
    li.textContent = pageNumber;
    li.classList.add('page');
    if (isActive) {
      li.classList.add('active');
    }
    li.addEventListener('click', () => {
      ApiService.currentPage = pageNumber;
      if (query) {
        generatePagination(query, totalItems);
        ApiService.searchQuery = query;
        ApiService.getFilmOnSearch().then(data => {
          renderGalleryFilms(data.results);
        });
      } else {
        ApiService.fetchTrendingMovie().then(data => {
          generatePagination('', totalItems);
          renderGalleryFilms(data.results);
        });
      }
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

  const nextButton = document.querySelector('.next');
  nextButton.addEventListener('click', () => {
    if (ApiService.currentPage < totalItems) {
      ApiService.currentPage++;
      if (query) {
        generatePagination(query, totalItems);
        ApiService.searchQuery = query;
        ApiService.getFilmOnSearch().then(data => {
          renderGalleryFilms(data.results);
        });
      } else {
        generatePagination('', totalItems);
        ApiService.fetchTrendingMovie().then(data => {
          renderGalleryFilms(data.results);
        });
      }

      backToTop();
    }
  }
  );

  const prevButton = document.querySelector('.prev');
  prevButton.addEventListener('click', () => {
    if (ApiService.currentPage > 1) {
      ApiService.currentPage--;
      if (query) {
        console.log(query);
        generatePagination(query, totalItems);
        ApiService.searchQuery = query;
        ApiService.getFilmOnSearch().then(data => {
          renderGalleryFilms(data.results);
        });
      } else {
        generatePagination('', totalItems);
        ApiService.fetchTrendingMovie().then(data => {
          renderGalleryFilms(data.results);
        });
      }
      backToTop();
    }
  });


  function backToTop() {
  if (window.pageYOffset > 0) {
    window.scrollBy(0, -30);
    setTimeout(backToTop, 0);
  }
}
}


