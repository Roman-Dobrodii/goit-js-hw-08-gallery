import imagesArr from './gallery-items.js';
// console.log(imagesArr);

const galleryMarkup = createGalleryMarkup(imagesArr);
const galleryContainer = document.querySelector('.js-gallery');
const lightBox = document.querySelector('.lightbox');
const lightBoxImage = document.querySelector('.lightbox__image');

galleryContainer.insertAdjacentHTML('beforeend', galleryMarkup);

galleryContainer.addEventListener('click', onClickGalleryCard);

lightBox.addEventListener('click', onCloseModal);

function createGalleryMarkup(imagesArr) {
  return imagesArr
    .map(({ preview, original, description }) => {
      return `<li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>
`;
    })
    .join('');
}

function onClickGalleryCard(evt) {
  evt.preventDefault();
  if (evt.target.nodeName !== 'IMG') {
    return;
  }

  lightBox.classList.add('is-open');
  const linkLightBoxImage = evt.target.dataset.source;
  lightBoxImage.src = linkLightBoxImage;
}

function onCloseModal() {
  lightBox.classList.remove('is-open');
}
