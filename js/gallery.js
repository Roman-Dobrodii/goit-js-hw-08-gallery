// Разбей задание на несколько подзадач:
// Создание и рендер разметки по массиву данных и предоставленному шаблону.
// Реализация делегирования на галерее ul.js-gallery и получение url большого изображения.
// Открытие модального окна по клику на элементе галереи.
// Подмена значения атрибута src элемента img.lightbox__image.
// Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"].
// Очистка значения атрибута src элемента img.lightbox__image.Это необходимо для того,
// чтобы при следующем открытии модального окна, пока грузится изображение, мы не видели предыдущее.

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

  window.addEventListener('keydown', onEscapeKeyPress)

  lightBox.classList.add('is-open');
  lightBoxImage.src = evt.target.dataset.source;
  lightBoxImage.alt = evt.target.alt;
}

function onCloseModal(evt) {
  evt.preventDefault();
  if (evt.target.nodeName === 'IMG') {
    return;
  }

  window.removeEventListener('keydown', onEscapeKeyPress)

  lightBox.classList.remove('is-open');
  lightBoxImage.removeAttribute('src');
  lightBoxImage.removeAttribute("alt");
}

function onEscapeKeyPress(evt) {
  if (evt.code === 'Escape') {
    onCloseModal(evt)
  }
}

// Дополнительно
// Следующий функционал не обязателен при сдаче задания, но будет хорошей практикой по работе с событиями.
// Закрытие модального окна по клику на div.lightbox__overlay.
// Закрытие модального окна по нажатию клавиши ESC.
// Пролистывание изображений галереи в открытом модальном окне клавишами "влево" и "вправо".