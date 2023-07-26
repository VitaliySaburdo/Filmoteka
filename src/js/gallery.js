import newsApiService from './api-services';
import { addToStorage } from './local-storage';
import { generatePagination } from './pagination';
import {renderGalleryFilms} from './markup-gallery';

const ApiService = new newsApiService();

async function startGalleryFilms() {
  try {
    const [genresData, movieData] = await Promise.all([
      ApiService.getGenres(),
      ApiService.fetchTrendingMovie()
    ]);

    addToStorage('genresList', genresData.genres);
    renderGalleryFilms(movieData.results);
    generatePagination('', 500);
    
  } catch (error) {
    console.log(error)
  }
}
startGalleryFilms();





