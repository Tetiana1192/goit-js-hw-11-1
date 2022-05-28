
// import { Notify } from 'notiflix/build/notiflix-notify-aio';

// import SimpleLightbox from 'simplelightbox';
// import 'simplelightbox/dist/simple-lightbox.min.css';

// import ImageApiService from './js/imageApiService.js';
// import './sass/main.scss';

const refs = {
  searchForm: document.querySelector('.search-form'),
  galleryEl: document.querySelector('.gallery'),
};

refs.searchForm.addEventListener('submit', onSearch);
// посилання на форму 
 const searchQuery = e.currentTarget.elements.query.value;

function onSearch(e) {
    e.preventDefault();

    // caмбіт форми 
const options = {
    headers: {
        Authorization: '27708114 - f07adda4c4d657f777ca692dd',
    },
};
const url = 'https://pixabay.com/api/q=&{searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=1&per_page=40'

fetch(url, options)
    .then(r => r.json())
    .then(console.log);

}






