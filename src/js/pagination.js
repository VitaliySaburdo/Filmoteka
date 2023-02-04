import newsApiService from './fetch';
import { addToStorage, getFromStorage, moviesDataUpdate } from './localStorage';
import { renderGalleryFilms } from './gallery';

const ApiService = new newsApiService();

const galleryEl = document.querySelector('.gallery-list');
const paginationBar = document.querySelector('.pagination-btns');
const prevBtn = document.querySelector('.page-btn.prev');
const nextBtn = document.querySelector('.page-btn.next');

if (!getFromStorage('total-pages')) {
  addToStorage('total-pages', 1000);
}
if (!getFromStorage('page-pg')) {
  addToStorage('page-pg', 1);
}

let page = getFromStorage('page-pg');
let amountOfPages = getFromStorage('total-pages');

if (prevBtn) {
  prevBtn.classList.add('is-hidden');
}

if (nextBtn) {
  nextBtn.addEventListener('click', onNextBtnClick);
  prevBtn.addEventListener('click', onPrevBtnClick);
  paginationBar.addEventListener('click', onPageClick);
}

if (galleryEl) {
  amountOfPages = 1000;
  page = 1;
  addToStorage('page-pg', page);
  addToStorage('total-pages', amountOfPages);

  ApiService.fetchPaginationMovie(page).then(data => {
    galleryEl.innerHTML = '';
    renderGalleryFilms(data.results);
    moviesDataUpdate(data);
  });
  addToStorage('page-pg', page);
  if (amountOfPages > 1 && amountOfPages < 6) {
    paginationBar.children[page - 1].classList.remove('active');
    paginationBar.children[page - 1].classList.add('active');
  } else {
    if (page == 1) {
      paginationBar.innerHTML = `
			<li class="page is-hidden">1</li>
			<li class="dots is-hidden">...</li>
			<li class="page active">1</li>
			<li class="page">2</li>
			<li class="page">3</li>
			<li class="page">4</li>
			<li class="page">5</li>
			<li class="dots">...</li>
			<li class="page">${amountOfPages}</li>`;
    } else if (page == 2) {
      paginationBar.innerHTML = `
			<li class="page is-hidden">1</li>
			<li class="dots is-hidden">...</li>
			<li class="page">1</li>
			<li class="page active">2</li>
			<li class="page">3</li>
			<li class="page">4</li>
			<li class="page">5</li>
			<li class="dots">...</li>
			<li class="page">${amountOfPages}</li>`;
    } else if (page == 3) {
      paginationBar.innerHTML = `
			<li class="page is-hidden">1</li>
			<li class="dots is-hidden">...</li>
			<li class="page">1</li>
			<li class="page">2</li>
			<li class="page active">3</li>
			<li class="page">4</li>
			<li class="page">5</li>
			<li class="dots">...</li>
			<li class="page">${amountOfPages}</li>`;
    } else if (page > 3) {
      if (page <= amountOfPages - 2) {
        paginationBar.innerHTML = `
			<li class="page">1</li>
			<li class="dots">...</li>
			<li class="page">${page - 2}</li>
			<li class="page">${page - 1}</li>
			<li class="page active">${page}</li>
			<li class="page">${page + 1}</li>
			<li class="page">${page + 2}</li>
			<li class="dots">...</li>
			<li class="page">${amountOfPages}</li>`;
      }
      if (page >= amountOfPages - 2) {
        paginationBar.innerHTML = `
			<li class="page">1</li>
			<li class="dots">...</li>
			<li class="page">${page - 2}</li>
			<li class="page">${page - 1}</li>
			<li class="page active">${page}</li>
			<li class="page">${page + 1}</li>
			<li class="page">${page + 2}</li>
			<li class="dots is-hidden">...</li>
			<li class="page is-hidden">${amountOfPages}</li>`;
      }
      if (page == amountOfPages - 1) {
        paginationBar.innerHTML = `
				<li class="page">1</li>
				<li class="dots">...</li>
				<li class="page">${amountOfPages - 4}</li>
				<li class="page">${amountOfPages - 3}</li>
				<li class="page">${amountOfPages - 2}</li>
				<li class="page active">${amountOfPages - 1}</li>
				<li class="page">${amountOfPages}</li>
				<li class="dots is-hidden">...</li>
				<li class="page is-hidden">${amountOfPages}</li>`;
      }
    }
    if (page == amountOfPages) {
      paginationBar.innerHTML = `
				<li class="page">1</li>
				<li class="dots">...</li>
				<li class="page">${amountOfPages - 4}</li>
				<li class="page">${amountOfPages - 3}</li>
				<li class="page">${amountOfPages - 2}</li>
				<li class="page">${amountOfPages - 1}</li>
				<li class="page active">${amountOfPages}</li>
				<li class="dots is-hidden">...</li>
				<li class="page is-hidden">${amountOfPages}</li>`;
    }
  }
  if (page == amountOfPages) {
    nextBtn.classList.add('is-hidden');
  } else {
    nextBtn.classList.remove('is-hidden');
  }
  if (page == 1) {
    prevBtn.classList.add('is-hidden');
  } else {
    prevBtn.classList.remove('is-hidden');
  }
}

function onNextBtnClick() {
  if (page == amountOfPages - 1) {
    nextBtn.classList.add('is-hidden');
  }
  if (page == 1) {
    prevBtn.classList.remove('is-hidden');
  }
  if (amountOfPages > 1 && amountOfPages < 6) {
    paginationBar.children[page].classList.add('active');
    paginationBar.children[page - 1].classList.remove('active');
    page += 1;
  } else {
    if (page < 3) {
      page += 1;
      paginationBar.children[page + 1].classList.add('active');
      paginationBar.children[page].classList.remove('active');
    } else if (page >= 3) {
      page += 1;
      if (page <= amountOfPages - 2) {
        paginationBar.children[0].classList.remove('is-hidden');
        paginationBar.children[1].classList.remove('is-hidden');
        paginationBar.children[2].textContent = page - 2;
        paginationBar.children[3].textContent = page - 1;
        paginationBar.children[4].textContent = page;
        paginationBar.children[5].textContent = page + 1;
        paginationBar.children[6].textContent = page + 2;
      }
      if (page >= amountOfPages - 2) {
        paginationBar.children[7].classList.add('is-hidden');
        paginationBar.children[8].classList.add('is-hidden');
      }
      if (page == amountOfPages - 1) {
        paginationBar.children[4].classList.remove('active');
        paginationBar.children[5].classList.add('active');
      }
    }
    if (page == amountOfPages) {
      paginationBar.children[5].classList.remove('active');
      paginationBar.children[6].classList.add('active');
    }
  }

  ApiService.fetchPaginationMovie(page).then(data => {
    window.scrollTo({
      top: 100,
      behavior: 'smooth',
    });
    galleryEl.innerHTML = '';
    renderGalleryFilms(data.results);
    moviesDataUpdate(data);
  });
  addToStorage('page-pg', page);
}
function onPrevBtnClick() {
  if (page == amountOfPages) {
    nextBtn.classList.remove('is-hidden');
  }
  if (page == 2) {
    prevBtn.classList.add('is-hidden');
  }
  if (amountOfPages > 1 && amountOfPages < 6) {
    paginationBar.children[page - 2].classList.add('active');
    paginationBar.children[page - 1].classList.remove('active');
    page -= 1;
  } else {
    if (page < 4) {
      page -= 1;
      paginationBar.children[page + 1].classList.add('active');
      paginationBar.children[page + 2].classList.remove('active');
    } else if (page >= 3 && page < amountOfPages - 2) {
      page -= 1;
      paginationBar.children[2].textContent = page - 2;
      paginationBar.children[3].textContent = page - 1;
      paginationBar.children[4].textContent = page;
      paginationBar.children[5].textContent = page + 1;
      paginationBar.children[6].textContent = page + 2;
      if (page == 3) {
        paginationBar.children[0].classList.add('is-hidden');
        paginationBar.children[1].classList.add('is-hidden');
      }
    }
    if (page == amountOfPages - 2) {
      page -= 1;
      paginationBar.children[7].classList.remove('is-hidden');
      paginationBar.children[8].classList.remove('is-hidden');
      paginationBar.children[2].textContent = page - 2;
      paginationBar.children[3].textContent = page - 1;
      paginationBar.children[4].textContent = page;
      paginationBar.children[5].textContent = page + 1;
      paginationBar.children[6].textContent = page + 2;
    } else if (page == amountOfPages - 1) {
      page -= 1;
      paginationBar.children[4].classList.add('active');
      paginationBar.children[5].classList.remove('active');
    } else if (page == amountOfPages) {
      page -= 1;
      paginationBar.children[5].classList.add('active');
      paginationBar.children[6].classList.remove('active');
    }
  }

  ApiService.fetchPaginationMovie(page).then(data => {
    window.scrollTo({
      top: 100,
      behavior: 'smooth',
    });
    galleryEl.innerHTML = '';
    renderGalleryFilms(data.results);

    moviesDataUpdate(data);
  });
  addToStorage('page-pg', page);
}
function onPageClick(e) {
  if (e.target.className == 'page') {
    renderPagination(e);
  }
}
function renderPagination(e) {
  page = parseInt(e.target.textContent);
  if (amountOfPages > 1 && amountOfPages < 6) {
    paginationBar.children[page - 1].classList.remove('active');
    paginationBar.children[page - 1].classList.add('active');
  } else {
    if (page == 1) {
      paginationBar.innerHTML = `
			<li class="page is-hidden">1</li>
			<li class="dots is-hidden">...</li>
			<li class="page active">1</li>
			<li class="page">2</li>
			<li class="page">3</li>
			<li class="page">4</li>
			<li class="page">5</li>
			<li class="dots">...</li>
			<li class="page">${amountOfPages}</li>`;
    } else if (page == 2) {
      paginationBar.innerHTML = `
			<li class="page is-hidden">1</li>
			<li class="dots is-hidden">...</li>
			<li class="page">1</li>
			<li class="page active">2</li>
			<li class="page">3</li>
			<li class="page">4</li>
			<li class="page">5</li>
			<li class="dots">...</li>
			<li class="page">${amountOfPages}</li>`;
    } else if (page == 3) {
      paginationBar.innerHTML = `
			<li class="page is-hidden">1</li>
			<li class="dots is-hidden">...</li>
			<li class="page">1</li>
			<li class="page">2</li>
			<li class="page active">3</li>
			<li class="page">4</li>
			<li class="page">5</li>
			<li class="dots">...</li>
			<li class="page">${amountOfPages}</li>`;
    } else if (page > 3) {
      if (page <= amountOfPages - 2) {
        paginationBar.innerHTML = `
			<li class="page">1</li>
			<li class="dots">...</li>
			<li class="page">${page - 2}</li>
			<li class="page">${page - 1}</li>
			<li class="page active">${page}</li>
			<li class="page">${page + 1}</li>
			<li class="page">${page + 2}</li>
			<li class="dots">...</li>
			<li class="page">${amountOfPages}</li>`;
      }
      if (page >= amountOfPages - 2) {
        paginationBar.innerHTML = `
			<li class="page">1</li>
			<li class="dots">...</li>
			<li class="page">${page - 2}</li>
			<li class="page">${page - 1}</li>
			<li class="page active">${page}</li>
			<li class="page">${page + 1}</li>
			<li class="page">${page + 2}</li>
			<li class="dots is-hidden">...</li>
			<li class="page is-hidden">${amountOfPages}</li>`;
      }
      if (page == amountOfPages - 1) {
        paginationBar.innerHTML = `
				<li class="page">1</li>
				<li class="dots">...</li>
				<li class="page">${amountOfPages - 4}</li>
				<li class="page">${amountOfPages - 3}</li>
				<li class="page">${amountOfPages - 2}</li>
				<li class="page active">${amountOfPages - 1}</li>
				<li class="page">${amountOfPages}</li>
				<li class="dots is-hidden">...</li>
				<li class="page is-hidden">${amountOfPages}</li>`;
      }
    }
    if (page == amountOfPages) {
      paginationBar.innerHTML = `
				<li class="page">1</li>
				<li class="dots">...</li>
				<li class="page">${amountOfPages - 4}</li>
				<li class="page">${amountOfPages - 3}</li>
				<li class="page">${amountOfPages - 2}</li>
				<li class="page">${amountOfPages - 1}</li>
				<li class="page active">${amountOfPages}</li>
				<li class="dots is-hidden">...</li>
				<li class="page is-hidden">${amountOfPages}</li>`;
    }
  }
  if (page == amountOfPages) {
    nextBtn.classList.add('is-hidden');
  } else {
    nextBtn.classList.remove('is-hidden');
  }
  if (page == 1) {
    prevBtn.classList.add('is-hidden');
  } else {
    prevBtn.classList.remove('is-hidden');
  }
  ApiService.fetchPaginationMovie(page).then(data => {
    window.scrollTo({
      top: 100,
      behavior: 'smooth',
    });
    galleryEl.innerHTML = '';
    renderGalleryFilms(data.results);
    moviesDataUpdate(data);
  });
  addToStorage('page-pg', page);
}
