import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


const formEl = document.querySelector('form');
const galleryEl = document.querySelector('.js-gallery-elem');
const loaderEl = document.querySelector('.loader');

hideLoader();
 
const lightbox = new SimpleLightbox('.gallery a', {
        captionDelay: 250,
    });

formEl.addEventListener('submit', onSubmit);

function onSubmit(e) {
    e.preventDefault();
    showLoader();

    const value = formEl.elements.query.value;
    getPhotoBySearch(value)
        .then(data => renderImages(data.hits))
        .catch(error => renderError(error))
        .finally(() => formEl.reset());
    

    
    
};

 

function getPhotoBySearch(searchValue) {
    const BASE_URL = 'https://pixabay.com/api/';
    const KEY = '?key=42153847-0f7baac2d7b2e92d7ce6bbe8e';
    const Query = `&q=${searchValue}`;
    const params = '&image_type=photo&orientation=horizontal&safesearch=true&per_page=20';
  

    const url = BASE_URL + KEY + Query + params;

    
    return fetch(url).then((res) => {
        const arr = res.json();
        return arr;
    })
        .then((array) => {
            if (array.total === 0) {
                throw new Error('Результатів не знайдено.');
            };

            return array;
        })
        .catch(error => console.log(error))
        .finally(() => hideLoader());
  
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
    galleryEl.innerHTML = markup;
    
    // hideLoader();
    lightbox.refresh();
      
};


function renderError(error) {
    galleryEl.innerHTML = "";
    iziToast.show({
        message: `❌ "Sorry, there are no images matching your search query. Please try again!`,
        color: 'red',
        position: 'topRight',
        maxWidth: '400px',
    });
    
};


function showLoader() {
  loaderEl.style.display = 'block';
}

function hideLoader() {
  loaderEl.style.display = 'none';
}


