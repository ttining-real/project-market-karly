const popup = document.querySelector('#popup__ad');
const closeButtons = document.querySelectorAll('.popup__button--close');

closeButtons.forEach((button) => {
  button.addEventListener('click', function () {
    popup.style.display = 'none';
  });
});
