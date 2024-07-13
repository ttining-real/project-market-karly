/* ---------- toggle ---------- */
const cartListButton = document.querySelectorAll('.cart__item > button');

cartListButton.forEach((button) => {
  button.addEventListener('click', function () {
    const selectedList = this.nextElementSibling;
    const arrowButton = this.querySelector('.icon--arrow--bottom');

    if (selectedList.children.length !== 0) {
      selectedList.classList.toggle('is--open');
      arrowButton.classList.toggle('is--open');
    }
  });
});

/* ---------- checkbox ---------- */
const checkboxAll = document.querySelector('#checkbox02');
const checkboxSubAll = document.querySelectorAll('.selected__item .checkbox');

checkboxAll.addEventListener('click', function () {
  const isChecked = checkboxAll.checked;
  console.log(isChecked);
  checkboxSubAll.forEach((checkbox) => {
    console.log(checkbox);
    if (isChecked) {
      checkbox.checked = true;
    } else {
      checkbox.checked = false;
    }
  });
});
