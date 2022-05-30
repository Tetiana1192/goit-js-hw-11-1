import SimpleLightbox from "simplelightbox";
import './css/styles.css';
import "simplelightbox/dist/simple-lightbox.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import NewFetchPictures from "./JS/fetchPictures.js";

const refs = {
    searchForm: document.querySelector(`#search-form`),
    inputEl: document.querySelector(`input`),
    btnEL: document.querySelector(`button[type="submit"]`),
    galleryEL:document.querySelector(`.gallery`),
    loadMoreBtn: document.querySelector(`button[type="button"]`),
}

const newFetchPictures = new NewFetchPictures();

refs.searchForm.addEventListener(`submit`, onSearch);
refs.galleryEL.addEventListener(`click`, onViewingStart);
refs.loadMoreBtn.addEventListener(`click`, onloadMoreBtnClick);

async function onSearch(event) {
event.preventDefault();
removeActiveClassOnBtn();
refs.galleryEL.innerHTML = "";
newFetchPictures.searchQuery = event.currentTarget.elements.searchQuery.value;
newFetchPictures.resetPage();
if(newFetchPictures.searchQuery) {
  try{
    const pictures = await newFetchPictures.fetchPictures();
    renderPictures(pictures);        
  }
   catch(error) {
    console.log(error.message);
     }       
   } 
 };

async function onloadMoreBtnClick() { 
  try {
    
    const pictures = await newFetchPictures.fetchPictures();
    renderPictures(pictures); 
          
  } 
  
  catch(error) {
    console.log(error.message);
  } 
  pageScroll();
};

function renderPictures(pictures) {

  if(pictures.hits.length === 0) {    
    removeActiveClassOnBtn();
    Notify.failure("Sorry, there are no images matching your search query. Please try again.");
  }  else {
    Notify.success(`Hooray! We found totalHits ${pictures.total} images.`);
    const pictureList = pictures.hits.map((picture) => 
     `     
    <a class="photo-card" href="${picture.largeImageURL}">
    <img src=${picture.webformatURL}" alt="${picture.tags}" title="${picture.tags}" loading="lazy" />      
<div class="info">
 <p class="info-item">
   <b>Likes</b>${picture.likes}
 </p>
 <p class="info-item">
   <b>Views</b>${picture.views}
 </p>
 <p class="info-item">
   <b>Comments</b>${picture.comments}
 </p>
 <p class="info-item">
   <b>Downloads</b>${picture.downloads}
 </p>
</div>
</a>  
`
).join("");

refs.galleryEL.insertAdjacentHTML("beforeend", pictureList);

if(newFetchPictures.page <= Math.ceil(pictures.total / 40)) {
  addActiveClassOnBtn();  
} else {
  removeActiveClassOnBtn();
   Notify.failure("We're sorry, but you've reached the end of search results."); 
}

     } 
  };

  function addActiveClassOnBtn() {
    refs.loadMoreBtn.classList.add(`active`);
  };

  function removeActiveClassOnBtn() {
    refs.loadMoreBtn.classList.remove(`active`);
  };

 
  
  let gallery = new SimpleLightbox('.gallery a',{captionsData: "alt"}); 
  

function onViewingStart(event) {  
  
  gallery.on('show.simplelightbox'); 
  
  gallery.refresh(); 
};


function pageScroll() {
  const { height: formHeight } = refs.searchForm.getBoundingClientRect();
  const { height: cardHeight } = refs.galleryEL.firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2 - formHeight * 2,
    behavior: 'smooth',
  });
}