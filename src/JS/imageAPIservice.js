
import axios from "axios";

 const BASE_URL = 'https://pixabay.com/api/';
// const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '27708114 - f07adda4c4d657f777ca692dd'
// caмбіт форми 
        const options = {
            headers: {
                Authorization: API_KEY,
            },
        };


export default class ImageApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }


    fetchArticles() {
        
const url = `${BASE_URL}?key=${KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`;

        return fetch(url, options)
            .then(r => r.json())
            //якщо результат успішний збільшуємо на 1
            .then(data => {
                this.incrementPage();
                return data.articles;
            });
    }
    incrementPage() {
      this.page += 1;
  }

    resetPage() {
        this.page = 1;
}


    get query() {
        return this.searchQuery;
    }
    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}