
// import { Notify } from 'notiflix/build/notiflix-notify-aio';

// import SimpleLightbox from 'simplelightbox';
// import 'simplelightbox/dist/simple-lightbox.min.css';

// import ImageApiService from './js/imageApiService.js';
// import './sass/main.scss';

const refs = {
  searchForm: document.querySelector('.search-form'),
    galleryEl: document.querySelector('.gallery'),
  loadMoreBtn:document.querySelector('.load-more')
};
const imageApiService =  new ImageApiService();   // отримуємо доступ до об`єктів та масівов/робимо екземпляр

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);



function onSearch(e) {
    e.preventDefault();
    // посилання на форму 
    imageApiService.query = e.currentTarget.elements.query.value;
    imageApiService.resetPage(); // скидання
    imageApiService.fetchArticles().then(generateCardsMurkup);
}

function onLoadMore() {
  imageApiService.fetchArticles().then(generateCardsMurkup);
}


function generateCardsMurkup(articles) {
  return cardsArray
    .map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
      return `<a href="${largeImageURL}" class="photo-card">
        <img src="${webformatURL}" alt="${tags}" class="photo-card__img" width="300" loading="lazy" />
        <div class="info">
          <p class="info-item"><b>Likes</b><br />${likes}</p>
          <p class="info-item"><b>Views</b><br />${views}</p>
          <p class="info-item"><b>Comments</b><br />${comments}</p>
          <p class="info-item"><b>Downloads</b><br />${downloads}</p>
        </div>
      </a>`;
    })
    .join('');
}

function appendCardsMurkup(articles) {
  gallery.insertAdjacentHTML('beforeend', generateCardsMurkup(articles));
}

function resetGallery() {
  gallery.innerHTML = '';
}
