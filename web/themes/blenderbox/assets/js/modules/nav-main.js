export const navMain = () => {
  const btnHeaderMenu = document.querySelector('.header-menu');
  const btnToggle = document.querySelector('.hamburger');
  const nav = document.querySelector('#navigation');

  btnToggle.addEventListener('click', (e) => {
    e.preventDefault();

    if (nav.classList.contains('active')) {
      nav.classList.remove('active');
      btnToggle.setAttribute('aria-expanded', false);
    } else {
      nav.classList.add('active');
      btnToggle.setAttribute('aria-expanded', true);
    }
    
    
    btnToggle.classList.toggle('is-active');
  })


}