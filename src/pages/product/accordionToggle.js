const accordionButtons = document.querySelectorAll('.accordion__head > button');

accordionButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const accordionBody = button.nextElementSibling;
    const iconArrow = button.querySelector('.icon--arrow--bottom');

    if (accordionBody) {
      accordionBody.classList.toggle('active');
      iconArrow.classList.toggle('active');
    }
  })
})