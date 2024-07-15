const orderButton = document.querySelector('.button--order');
const orderModal = document.querySelector('.modal__order');
const orderConfirm = orderModal.querySelector('.button--confirm');
const overlay = document.querySelector('.overlay');
let count = orderModal.querySelector('.count');

/* ---------- 주문하기 버튼 클릭 시 ---------- */
orderButton.addEventListener('click', function () {
  overlay.classList.add('is--active');
  orderModal.classList.add('is--open');

  setTimeout(() => {
    overlay.classList.remove('is--active');
    orderModal.classList.remove('is--open');
    location.href = '/';
  }, 5000);

  /* ---------- 5초 카운터 출력 ---------- */
  let seconds = 5;
  let timer = () => {
    setInterval(() => {
      count.textContent = --seconds;
      if (seconds < 0) {
        clearInterval(timer);
      }
    }, 1000);
  };
  timer();
});

/* ---------- order modal 확인 버튼 클릭 시 ---------- */
orderConfirm.addEventListener('click', function () {
  overlay.classList.remove('is--active');
  orderModal.classList.remove('is--open');
  location.href = '/';
});

/* ---------- 배송지 변경 ---------- */
const addressModal = document.querySelector('.modal__address');
const addressButton = document.querySelector('.button--address');
const addressModalClose = addressModal.querySelector('.button--close');
const addressSaveButton = addressModal.querySelector('.button--save');
const currentAddress = document.querySelector('address');

addressButton.addEventListener('click', function () {
  overlay.classList.add('is--active');
  addressModal.classList.add('is--open');
});

addressModalClose.addEventListener('click', function () {
  overlay.classList.remove('is--active');
  addressModal.classList.remove('is--open');
});

addressSaveButton.addEventListener('click', function () {
  const addressInput = document.querySelector('.address');
  currentAddress.innerHTML = addressInput.value;

  if (addressInput.value === '') {
    alert('주소를 적어주세요!');
    return;
  }

  overlay.classList.remove('is--active');
  addressModal.classList.remove('is--open');
});
