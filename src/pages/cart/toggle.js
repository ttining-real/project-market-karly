import { UpdateCount } from './checkbox';
/* ---------- toggle ---------- */
const cartListButton = document.querySelectorAll('.cart__item > button');

window.addEventListener('load', function () {
  cartListButton.forEach((button) => {
    setTimeout(() => {
      const selectedList = button.nextElementSibling;
      const arrowButton = button.querySelector('.icon--arrow--bottom');

      if (selectedList.children.length !== 0) {
        selectedList.classList.add('is--open');
        arrowButton.classList.add('is--open');
        UpdateCount();
      }
    }, 1000);
    button.addEventListener('click', function () {
      const selectedList = this.nextElementSibling;
      const arrowButton = this.querySelector('.icon--arrow--bottom');
      const selectedItem = selectedList.querySelectorAll('.selected__item');

      if (selectedList.children.length !== 0) {
        selectedList.classList.toggle('is--open');
        arrowButton.classList.toggle('is--open');
        UpdateCount();
      } else {
        selectedList.classList.remove('is--open');
        arrowButton.classList.remove('is--open');
        UpdateCount();
      }

      selectedItem.forEach((liELement) => {
        const deleteButton = liELement.querySelector('.delete');

        deleteButton.addEventListener('click', function () {
          this.parentElement.remove();

          if (selectedList.children.length !== 0) {
            selectedList.classList.add('is--open');
            arrowButton.classList.add('is--open');
            UpdateCount();
          } else {
            selectedList.classList.remove('is--open');
            arrowButton.classList.remove('is--open');
            UpdateCount();
          }
        });
      });

      UpdateCount();
    });
  });
});
