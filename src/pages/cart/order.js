import modalHandle from '@/lib/modal.js';
import timerFn from '@/lib/timer.js';

const orderButton = document.querySelector('.button--order');
const orderConfirm = document.querySelector('.button--confirm');

/* ---------- 주문하기 버튼 클릭 시 ---------- */
orderButton.addEventListener('click', function () {
  modalHandle('.modal', 'is--open', open);
  timerFn();

  setTimeout(() => {
    modalHandle('.modal', 'is--open', close);
    location.href = '/';
  }, 5000);
});

orderConfirm.addEventListener('click', function () {
  modalHandle('.modal', 'is--open', close);
  location.href = '/';
});
