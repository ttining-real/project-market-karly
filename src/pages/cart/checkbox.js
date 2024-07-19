const checkboxAll = document.querySelector('#checkbox02');

/* cart page load되면 */
export function UpdateCount() {
  const checkboxSubAll = document.querySelectorAll('.selected__item .checkbox');
  const checkedCount = document.querySelectorAll(
    '.selected__item .checkbox:checked'
  ).length;
  if (!checkboxAll) return;
  const label = checkboxAll.nextElementSibling;
  const template = /* html */ `
      <span class='checkbox__label--icon' aria-hidden="true"></span>
      전체선택(${checkedCount}/${checkboxSubAll.length})
    `;
  label.innerHTML = template;
}
window.addEventListener('load', UpdateCount);

export function checkboxChange() {
  const checkboxAll = document.querySelector('#checkbox02');
  if (!checkboxAll) return;
  checkboxAll.addEventListener('change', function () {
    const checkboxSubAll = document.querySelectorAll(
      '.selected__item .checkbox'
    );
    checkboxSubAll.forEach((checkbox) => {
      checkbox.checked = checkboxAll.checked;
    });
    UpdateCount();
  });

  const checkboxSubAll = document.querySelectorAll('.selected__item .checkbox');
  checkboxSubAll.forEach((checkbox) => {
    checkbox.addEventListener('change', function () {
      if (!this.checked) {
        checkboxAll.checked = false;
        UpdateCount();
      } else {
        const allChecked = [...checkboxSubAll].every(
          (checkbox) => checkbox.checked
        );
        UpdateCount();
        if (allChecked) {
          checkboxAll.checked = true;
          UpdateCount();
        }
      }
    });
  });
}
checkboxChange();
