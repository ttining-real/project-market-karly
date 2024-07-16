// createInquiryButton.addEventListener('click', function () {
//   modalHandle('.product__inquiry__modal', 'is--open', open);
// });

// inquiryModalCloseButton.addEventListener('click', function () {
//   modalHandle('.product__inquiry__modal', 'is--open', close);
// });
// cancleButton.addEventListener('click', function () {
//   modalHandle('.product__inquiry__modal', 'is--open', close);
// });

// input.addEventListener('input', function () {
//   textarea.addEventListener('input', function () {
//     checkbox.addEventListener('click', function () {
//       buttonActive();
//     });
//   });
// });

// function buttonActive() {
//   if (input.value.length > 1 && textarea.value.length > 1 && checkbox.checked) {
//     const applyButton = document.querySelector(
//       '.product__inquiry__modal .button--apply'
//     );
//     applyButton.disabled = false;
//   }
// }

import modalHandle from '@/lib/modal.js';
import timerFn from '@/lib/timer.js';
const createInquiryButton = document.querySelector('.button__inquiry');
const inquiryModalCloseButton = document.querySelector(
  '.product__inquiry__modal .button--close'
);
const cancelButton = document.querySelector(
  '.product__inquiry__modal .button--cancel'
);
const input = document.querySelector('.product__inquiry__modal input');
const textarea = document.querySelector('.product__inquiry__modal textarea');
const checkbox = document.querySelector('.checkbox--secret input');
const applyButton = document.querySelector(
  '.product__inquiry__modal .button--apply'
);
const confirmButton = document.querySelector('.button--confirm');

/* ---------- 후기 작성하기 버튼 눌렀을 때 ---------- */
createInquiryButton.addEventListener('click', function () {
  modalHandle('.product__inquiry__modal', 'is--open', open);
});

/* ---------- 후기 작성 닫기버튼 눌렀을 때 ---------- */
inquiryModalCloseButton.addEventListener('click', function () {
  modalHandle('.product__inquiry__modal', 'is--open', close);
});
/* ---------- 취소 버튼 눌렀을 때 ---------- */
cancelButton.addEventListener('click', function () {
  modalHandle('.product__inquiry__modal', 'is--open', close);
});

input.addEventListener('input', function () {
  if (this.value.length > 0 || checkbox.checked) {
    textarea.addEventListener('input', function () {
      applyButton.disabled = false;

      if (textarea.value.length === 0) {
        applyButton.disabled = true;
      }
    });
  }
});

applyButton.addEventListener('click', function () {
  modalHandle('.modal', 'is--open', open);
  timerFn();

  setTimeout(() => {
    modalHandle('.modal', 'is--open', close);
    modalHandle('.product__inquiry__modal', 'is--open', close);
  }, 5000);
});

confirmButton.addEventListener('click', function () {
  modalHandle('.modal', 'is--open', close);
  modalHandle('.product__inquiry__modal', 'is--open', close);
});
