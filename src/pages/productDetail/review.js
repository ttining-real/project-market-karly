import modalHandle from '@/lib/modal.js';
import timerFn from '@/lib/timer.js';
const createReviewButton = document.querySelector('.button__review');
const reviewModalCloseButton = document.querySelector(
  '.product__review__modal .button--close'
);
const cancelButton = document.querySelector(
  '.product__review__modal .button--cancel'
);
const input = document.querySelector('.product__review__modal input');
const textarea = document.querySelector('.product__review__modal textarea');
const applyButton = document.querySelector(
  '.product__review__modal .button--apply'
);
const confirmButton = document.querySelector('.button--confirm');

/* ---------- 후기 작성하기 버튼 눌렀을 때 ---------- */
createReviewButton.addEventListener('click', function () {
  modalHandle('.product__review__modal', 'is--open', open);
});

/* ---------- 후기 작성 닫기버튼 눌렀을 때 ---------- */
reviewModalCloseButton.addEventListener('click', function () {
  modalHandle('.product__review__modal', 'is--open', close);
});
/* ---------- 취소 버튼 눌렀을 때 ---------- */
cancelButton.addEventListener('click', function () {
  modalHandle('.product__review__modal', 'is--open', close);
});

input.addEventListener('input', function () {
  if (this.value.length > 0) {
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
    modalHandle('.product__review__modal', 'is--open', close);
  }, 5000);
});

confirmButton.addEventListener('click', function () {
  modalHandle('.modal', 'is--open', close);
  modalHandle('.product__review__modal', 'is--open', close);
});
