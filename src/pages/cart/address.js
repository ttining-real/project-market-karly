import modalHandle from '@/lib/modal.js';
import sample6_execDaumPostcode from '@/pages/cart/kakaoAddressApi.js';

const addressModal = document.querySelector('.modal__address');
const addressModalClose = addressModal.querySelector('.icon--cancel');
const modifyAddressButton = document.querySelector('.button--address');
const postFindButton = addressModal.querySelector('.post--find');
const addressSaveButton = addressModal.querySelector('.button--save');

/* ---------- 배송지 변경 모달 열기 ---------- */
modifyAddressButton.addEventListener('click', function () {
  modalHandle('.modal__address', 'is--open', open);
});

/* ---------- 배송지 변경 모달 닫기 ---------- */
addressModalClose.addEventListener('click', function () {
  modalHandle('.modal__address', 'is--open', close);
});

/* ---------- 우편번호 찾기 클릭하면 주소 검색창 열기 ---------- */
postFindButton.addEventListener('click', function () {
  sample6_execDaumPostcode();
});

/* ---------- 저장 버튼 클릭하면 주소 변경 ---------- */
addressSaveButton.addEventListener('click', function () {
  const currentAddress = document.querySelector('address');
  const inputAddress = document.querySelectorAll('input[type="text"]');

  currentAddress.innerHTML = '';
  for (let i = 1; i < inputAddress.length; i++) {
    currentAddress.innerHTML += inputAddress[i].value + ' ';
  }
  modalHandle('.modal__address', 'is--open', close);
});
