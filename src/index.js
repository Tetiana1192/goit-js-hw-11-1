import Notify from 'notiflix';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import LoadMoreBtn from './js/load-moreBtn';
import ImagesApiService from './js/imageApiService.js';
import './sass/main.scss';
import Markup from './js/gallerymerkup';


const refs = {
  searchForm: document.querySelector('.search-form'),
    galleryEl: document.querySelector('.gallery'),
  loadMoreBtn:document.querySelector('.load-more')
};
const imagesAPIService = new ImagesAPIService();  
const loadMoreBtn = new LoadMoreBtn({ selector: '.load-more' });
const renderMarkup = new Markup({ selector: refs.gallery });

refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.button.addEventListener('click', onloadMoreBtnClick);



async function onSearch(e) {
  e.preventDefault();
  renderMarkup.reset();
  imagesAPIService.query = e.currentTarget.searchQuery.value.trim();

  if (imagesAPIService.query === '') {
    loadMoreBtn.hideBtn();
    Notify.info('Your query is empty. Try again!');
    return;
  }

  imagesAPIService.resetPage();

  try {
    loadMoreBtn.showBtn();
    await initFetchImages();
  } catch (error) {
    loadMoreBtn.hideBtn();
    Notify.failure(error.message);
  }

  refs.form.reset();
}




async function onloadMoreBtnClick() {
  try {
    await initFetchImages();
  } catch {
    Notify.failure(error.message);
  }
  pageScroll();
  renderMarkup.lightbox.refresh();
}

async function initFetchImages() {
  
  try {
    loadMoreBtn.disable();
    const images = await imagesAPIService.fetchImages();
    renderMarkup.items = images;
    renderMarkup.render();
  } catch {
    Notify.failure(error.message);
  }
   

  if (imagesAPIService.endOfHits) {
    loadMoreBtn.hideBtn();
    return;
  }
  loadMoreBtn.enable();
}

function pageScroll() {
    const { height: formHeight } = refs.form.getBoundingClientRect();
    const { height: cardHeight } = refs.gallery.firstElementChild.getBoundingClientRect();

    window.scrollBy({
        top: cardHeight * 2 - formHeight * 2,
        behavior: 'smooth',
    });
}