import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = 'ab57a8d74b0df3fdba80a78e42f32d17';

export default class NewsApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.lang = '';
    this.genre = null;
  }

  async fetchTrendingMovie() {
    try {
      const url = `${BASE_URL}trending/movie/week?api_key=${API_KEY}&page=${this.currentPage}&language=${this.currentLanguage}`;
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async getFilteredMovies() {
    try {
      console.log(this.genre);
      const url = `${BASE_URL}discover/movie?api_key=${API_KEY}&with_genres=${this.genre}&language=${this.currentLanguage}`;
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      return error;
    }
  }

  async getTrailerById(id) {
    try {
      const url = `${BASE_URL}movie/${id}/videos?api_key=${API_KEY}&language=${this.currentLanguage}`;
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async getFilmDetails(id) {
    try {
      const url = `${BASE_URL}movie/${id}?api_key=${API_KEY}&language=${this.currentLanguage}`;
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async getFilmOnSearch() {
    try {
      const url = `${BASE_URL}search/movie?api_key=${API_KEY}&language=${this.currentLanguage}&query=${this.searchQuery}&page=${this.currentPage}`;
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async getGenres() {
    try {
      const url = `${BASE_URL}genre/movie/list?api_key=${API_KEY}&language=${this.currentLanguage}`;
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  get currentPage() {
    return this.page;
  }

  set currentPage(newPage) {
    this.page = newPage;
  }

  get currentLanguage() {
    return this.lang;
  }

  set currentLanguage(newLanguage) {
    return (this.lang = newLanguage);
  }
}
