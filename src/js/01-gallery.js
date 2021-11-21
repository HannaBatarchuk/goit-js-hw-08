// Описан в документации
import SimpleLightbox from 'simplelightbox';
// Дополнительный импорт стилей
import 'simplelightbox/dist/simple-lightbox.min.css';

import { galleryItems } from './gallery-items.js';
// Change code below this line
console.log(galleryItems);

const galleryItemsList = document.querySelector('.gallery');

const galleryMarkup = galleryItems
.map(({preview, original, description}) => `<a class="gallery__item" href="${original}">
    <img 
        class="gallery__image" 
        src="${preview}" 
        alt="${description}" 
    />
</a>`)
.join("");

galleryItemsList.innerHTML = galleryMarkup;
// console.log(galleryMarkup);

galleryItemsList.addEventListener('click', onImageClick);

function onImageClick(event) {
    event.preventDefault();

    const filterSource = event.target.dataset.source;
    if (!filterSource) return;

    console.log(filterSource)
}

const lightbox = new SimpleLightbox('.gallery a', { captionsData : "alt", captionDelay : 250});
lightbox.on("show.simplelightbox");