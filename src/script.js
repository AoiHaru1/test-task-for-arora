// Здесь я просто реализовал появление модального окна по клину на плюсик в секции меню.

const modal = document.querySelector('.modal');
const menuItems = document.querySelectorAll('.price__increament')
const body = document.querySelector('body')

let modalState = false;
const emptySpaceClose = e => e.target.classList.contains('black-bg') ?
 (body.classList.toggle('black-bg'), modal.classList.toggle('hidden'), modalState = !modalState) : null;

menuItems.forEach(x => {
  x.addEventListener('click', () => {
    modalState = !modalState;
    modal.classList.toggle('hidden');
    body.classList.toggle('black-bg');

    if (modalState) {
      body.addEventListener('click', emptySpaceClose);
      return
    }

    body.removeEventListener('click', emptySpaceClose);
  })
})