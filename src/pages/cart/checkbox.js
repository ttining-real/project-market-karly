const checkboxAll = document.querySelector('#checkbox02');
const checkboxSubAll = document.querySelectorAll('.selected__item .checkbox');

/* cart page load되면 */
export function UpdateCount() {
  const checkboxSubAll = document.querySelectorAll('.selected__item .checkbox');
  const checkedCount = document.querySelectorAll(
    '.selected__item .checkbox:checked'
  ).length;
  const label = checkboxAll.nextElementSibling;
  const template = /* html */ `
      <span class='checkbox__label--icon' aria-hidden="true"></span>
      전체선택(${checkedCount}/${checkboxSubAll.length})
    `;
  label.innerHTML = template;
}
UpdateCount();

/* ---------- checkbox 전체 선택 ---------- */
checkboxAll.addEventListener('change', function () {
  checkboxSubAll.forEach((checkbox) => {
    checkbox.checked = checkboxAll.checked;
  });
  UpdateCount();
});

checkboxSubAll.forEach((checkbox) => {
  checkbox.addEventListener('change', function () {
    UpdateCount();
    if (!this.checked) {
      checkboxAll.checked = false;
    } else {
      const allChecked = [...checkboxSubAll].every(
        (checkbox) => checkbox.checked
      );
      if (allChecked) {
        checkboxAll.checked = true;
      }
    }
  });
});
