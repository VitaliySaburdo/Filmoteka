import NewsApiService from './api-services';
import {renderGalleryFilms} from './markup-gallery';

const ApiService = new NewsApiService();

import { getFromStorage } from './local-storage';

const selectEl = document.getElementById('genre_select');

const genres = getFromStorage('genresList');



  const allGenresOption = document.createElement('option');
  allGenresOption.textContent = 'All genres';
  selectEl.appendChild(allGenresOption);
  selectEl.value = 'All genres';
  genres.forEach(genre => {
    const options = document.createElement('option');
    options.textContent = genre.name;
    options.dataset.id = genre.id;
    selectEl.appendChild(options);
  });
  selectEl.addEventListener('change', async(e) => {
    ApiService.genre = e.target.options[e.target.selectedIndex].dataset.id;
    const data = await ApiService.getFilteredMovies() || await ApiService.fetchTrendingMovie()
    console.log(data);
    // renderGalleryFilms(data.results);
  });



