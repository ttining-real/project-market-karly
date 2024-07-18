const topBanner = document.querySelector('.banner__top');
const topBannerClose = topBanner.querySelector('.button--close');

topBannerClose.addEventListener('click', function () {
  topBanner.style.height = 0;
  setTimeout(() => {
    topBanner.style.display = 'none';
  }, 300);
});

const popup = document.querySelector('.modal.popup');
const closeButtonAll = document.querySelectorAll('.popup .button-group button');

closeButtonAll.forEach((button) => {
  button.addEventListener('click', function () {
    popup.style.display = 'none';
  });
});
