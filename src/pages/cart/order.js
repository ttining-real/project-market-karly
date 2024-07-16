import modalHandle from '@/lib/modal';

const orderButton = document.querySelector('.button--order');
const orderConfirm = document.querySelector('.button--confirm');

/* ---------- 주문하기 버튼 클릭 시 ---------- */
orderButton.addEventListener('click', function () {
  // timer();

  modalHandle('.modal__order', 'is--open', open);

  setTimeout(() => {
    modalHandle('.modal__order', 'is--open', close);
    location.href = '/';
  }, 5000);
});

orderConfirm.addEventListener('click', function () {
  modalHandle('.modal__order', 'is--open', close);
  location.href = '/';
});
