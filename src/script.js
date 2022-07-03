const body = document.querySelector('body');
const modal = document.querySelector('.modal');
const menuItems = document.querySelectorAll('.price__increament');
const cardBtns = document.querySelectorAll('.card__btn')
const popupMenu = document.querySelector('.popup');
const hamburger = document.querySelector('.hamburger-lines');
const reccomendationsContainer = document.querySelector('.reccomendations__content-container');
const reccomendationsItemsList = document.querySelector('.reccomendations__card-list');

// Реализация появление модального кона по плюсику в меню-секции и по кнопкам в "Рекомендуем"

let modalState = false;

const modalCloseOnBg = (event) => event.target.classList.contains('black-bg') ? (modal.classList.toggle('hidden'), body.classList.toggle('black-bg')) : null;

[menuItems, cardBtns].forEach(collection => {
  collection.forEach(item => {
    item.addEventListener('click', () => {
      modalState = !modalState;
      modal.classList.toggle('hidden');
      body.classList.toggle('black-bg');

      if (modalState) {
        modalState = !modalState
        body.addEventListener('click', modalCloseOnBg);
        return
      }

      body.removeEventListener('click', modalCloseOnBg);
    })
  })
});

// Реализация появление выпадающего меню на клик по бургер-иконке

let hambState = false;

hamburger.addEventListener('click', () => {
  hambState = !hambState;
  body.classList.toggle('black-bg');
  popupMenu.classList.toggle('popup-right');
  setTimeout(() => {
    hamburger.classList.toggle('hamburger-reposition')
  }, 50);
});

// Реализация слайдера в секции "рекомендуем"

let pressedDown = false;
let cursorX;

reccomendationsContainer.addEventListener("mousedown", (event) => {
  pressedDown = true;
  cursorX = event.offsetX - reccomendationsItemsList.offsetLeft;
  reccomendationsContainer.style.cursor = "grabbing";
});

reccomendationsContainer.addEventListener("mouseup", () => {
  reccomendationsContainer.style.cursor = "grab";
});

window.addEventListener("mouseup", () => {
  pressedDown = false;
});

reccomendationsContainer.addEventListener("mousemove", (event) => {
  if (!pressedDown) return;
  event.preventDefault();
  reccomendationsItemsList.style.left = `${event.offsetX - cursorX}px`;
  bounder();
});

function bounder() {
  const reccomendationsContainer_rect = reccomendationsContainer.getBoundingClientRect();
  const reccomendationsItemsList_rect = reccomendationsItemsList.getBoundingClientRect();

  if (parseInt(reccomendationsItemsList.style.left) > 0) {
    reccomendationsItemsList.style.left = 0;
  } else if (reccomendationsItemsList_rect.right < reccomendationsContainer_rect.right) {
    reccomendationsItemsList.style.left = `-${reccomendationsItemsList_rect.width - reccomendationsContainer_rect.width}px`;
  }
}