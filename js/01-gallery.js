import { galleryItems } from './gallery-items.js';
// Change code below this line

const refs = { imageGallery: document.querySelector('.gallery'), };

// const itemsContainer = createImgMarkup(galleryItems);

refs.imageGallery.addEventListener('click', onImageGalleryClick);

addImgMarkup(createImgMarkup(galleryItems));

function createImgMarkup(items) {
    return items
        .map(({ preview, original, description }) => {
            return `
    <div class="gallery__item">
     <a class="gallery__link" href="${original}">
        <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
        />
    </a>
    `;
        })
        .join('');
};



function onImageGalleryClick(evt) {
    if (evt.target.nodeName !== 'IMG') {
        return;
    }
    evt.preventDefault();
    const sourceImg = evt.target.dataset.source;
    const alt = evt.target.alt;
    openModalImg(sourceImg, alt);
};


function addImgMarkup(markup) {
    refs.imageGallery.insertAdjacentHTML('beforeend', markup);
    console.log(markup);
}


function openModalImg(url, alt) {
    const instance = basicLightbox.create(`
      <img src="${url}" alt="${alt}">
  `);
    instance.show();

    refs.imageGallery.addEventListener(
        "keyup",
        (e) => {
            if (e.code !== "Escape") {
                return;
            }
            instance.close();
        },
        { once: true }
    );
};