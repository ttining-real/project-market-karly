/* ---------- toggle ---------- */
const cartListButton = document.querySelectorAll('.cart__item > button');

cartListButton.forEach((button) => {
  button.addEventListener('click', function () {
    const selectedList = this.nextElementSibling;
    const arrowButton = this.querySelector('.icon--arrow--bottom');
    const selectedItem = selectedList.querySelectorAll('.selected__item');

    if (selectedList.children.length !== 0) {
      selectedList.classList.toggle('is--open');
      arrowButton.classList.toggle('is--open');
    } else {
      selectedList.classList.remove('is--open');
      arrowButton.classList.remove('is--open');
    }

    selectedItem.forEach((liELement) => {
      const deleteButton = liELement.querySelector('.delete');

      deleteButton.addEventListener('click', function () {
        this.parentElement.remove();

        if (selectedList.children.length !== 0) {
          selectedList.classList.add('is--open');
          arrowButton.classList.add('is--open');
          console.log(selectedList.children.length);
        } else {
          console.log(selectedList.children.length);
          selectedList.classList.remove('is--open');
          arrowButton.classList.remove('is--open');
        }
      });
    });
  });
});

/* ---------- checkbox ---------- */
const checkboxAll = document.querySelector('#checkbox02');
const checkboxSubAll = document.querySelectorAll('.selected__item .checkbox');

checkboxAll.addEventListener('click', function () {
  const isChecked = checkboxAll.checked;

  checkboxSubAll.forEach((checkbox) => {
    if (isChecked) {
      checkbox.checked = true;
    } else {
      checkbox.checked = false;
    }
  });
});
