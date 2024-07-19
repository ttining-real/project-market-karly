import { UpdateCount } from './checkbox';
const selectDeleteButton = document.querySelector('.select--delete');

function selectedDeleteFn() {
  const checkbox = document.querySelectorAll('.selected__item input.checkbox');
  const selectedList = document.querySelectorAll('.selected');

  selectedList.forEach((list) => {
    if (list.classList.contains('is--open') === true) {
      checkbox.forEach((item) => {
        const liElement = item.parentElement.parentElement;
        if (item.checked === true) {
          liElement.remove();
          list.classList.remove('is--open');
        }
      });
    }
    if (list.children.length === 0) {
      const arrowIcon = list.previousElementSibling.querySelector(
        '.icon--arrow--bottom'
      );
      arrowIcon.classList.remove('is--open');
    } else {
      list.classList.add('is--open');
    }
  });
  window.localStorage.removeItem('cartItems');
  UpdateCount();
}

selectDeleteButton.addEventListener('click', selectedDeleteFn);
