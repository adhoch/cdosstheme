export const navMain = () => {
  btnHeaderMenu = document.querySelector('.header-menu');
  nav = document.querySelector('#nav');

  btnHeaderMenu.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('click');

    e.target.classList.toggle('active');
    nav.classList.toggle('active');


  })
}