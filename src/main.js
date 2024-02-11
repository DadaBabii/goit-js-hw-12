import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import axios from 'axios';


const formEl = document.querySelector('form');
const galleryEl = document.querySelector('.js-gallery-elem');
const loaderEl = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.js-load-more');


let q = '';
let currentPage = 1;
let totalPages = 0;
let scrollHeiht = 0;



 
const lightbox = new SimpleLightbox('.gallery a', {
        captionDelay: 250,
    });

formEl.addEventListener('submit', onSubmit);


async function onSubmit(e) {
    e.preventDefault();
    showLoader();
    hideLoaderBtn();
    q = formEl.elements.query.value.trim();
    currentPage = 1;
    galleryEl.innerHTML = "";
    try {
        const data = await getPhotoBySearch();
        totalPages = Math.ceil(data.totalHits / data.hits.length);
        if (totalPages >= currentPage) {
            renderImages(data.hits);
            checkPages();           
        } else renderError();
      
    
    } catch (error) {
      console.log("error");
    };
      
    hideLoader();
    formEl.reset();
           
    
};

async function getPhotoBySearch() {
    const BASE_URL = 'https://pixabay.com/api/';
    const KEY = '42153847-0f7baac2d7b2e92d7ce6bbe8e';
    
   
    const options = {
        params: {
    key: KEY,
    q: `${q}`,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 15,
    page: currentPage,
    
  },
    };
    
    try {
        const res = await axios.get(BASE_URL, options);
        return res.data;
   
    } catch (error) {
        console.log('Результатів не знайдено.');
    };
  
};

loadMoreBtn.addEventListener('click', onloadMore);

async function onloadMore() {
    hideLoaderBtn();
    showLoader();
    currentPage += 1;
    const data = await getPhotoBySearch();
    renderImages(data.hits);
    hideLoader();
    checkPages();
    window.scrollBy({
    top: getScrollHeight(),
    behavior: 'smooth',
  });
    
   
};


function renderImages(array) {
    const markup = array.map(({ largeImageURL, webformatURL, tags, likes, views, comments, downloads }) => { return` <div class="gallery">
    <a href="${largeImageURL}"><div class="thumb"><img src="${webformatURL}" alt="${tags}" title="${tags}" width = "360px"
      height = "300px"/>
       <ul class="info-cards-container">
      <li class="info-cards-elements">likes<span>${likes}</span></li>
      <li class="info-cards-elements">views<span>${views}</span></li>
       <li class="info-cards-elements">comments<span>${comments}</span></li>
       <li class="info-cards-elements">downloads<span>${downloads}</span></li>
     </ul>
     </div>
      </a>
    </div>`}).join('');   
    galleryEl.insertAdjacentHTML('beforeend', markup);
    
    lightbox.refresh();
      
};


function renderError() {
    galleryEl.innerHTML = "";
    hideLoaderBtn();
    hideLoader();
    formEl.reset();
    iziToast.show({
        message: `❌ "Sorry, there are no images matching your search query. Please try again!`,
        color: 'red',
        position: 'topRight',
        maxWidth: '400px',
        timeout: 2500,
        // disable: false,
    });
   
    
    
};

function renderEndOfCollection() {
    hideLoaderBtn();
    iziToast.show({
        message: `We're sorry, but you've reached the end of search results.`,
        color: 'blue',
        position: 'topRight',
        maxWidth: '400px',
        timeout: 2500,
    });
    
};


function checkPages() {
    const isLastPage = currentPage === totalPages;
     if (isLastPage) {
        renderEndOfCollection();
             
    } else showLoaderBtn();
    };
    

function showLoaderBtn() {
    loadMoreBtn.classList.remove('is-hidden');
};

function hideLoaderBtn() {
    loadMoreBtn.classList.add('is-hidden');
};


function showLoader() {
  loaderEl.classList.remove('is-hidden');

}

function hideLoader() {
  loaderEl.classList.add('is-hidden');;
}

function getScrollHeight() { 
const thumbEl = document.querySelector('.thumb');
    let rect = thumbEl.getBoundingClientRect();
    scrollHeiht = rect.height * 2;
    return scrollHeiht;
};