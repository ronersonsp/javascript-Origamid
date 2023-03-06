import outsideClick from './outsideClick.js';

export default function initMenuMobile() {
  const menuButton = document.querySelector('[data-menu="button"]');
  const menuList = document.querySelector('[data-menu="lista"]');
  const eventos = ['click', 'touchstart'];

  function abrirMenu() {
    menuList.classList.add('active');
    menuButton.classList.add('active');
    outsideClick(menuList, eventos, () => {
      menuList.classList.remove('active');
      menuButton.classList.remove('active');
    });
  }
  if (menuButton) {
    eventos.forEach((userEvent) => {
      menuButton.addEventListener(userEvent, abrirMenu);
    });
  }
}
