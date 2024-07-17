export default function priceHandler() {
  const plusButton = document.querySelector('.icon--plus').parentElement;
  const minusButton = document.querySelector('.icon--minus').parentElement;
  let count = document.querySelector('.count');

  initPrice();
  plusButton.addEventListener('click', function () {
    parseInt(count.textContent++, 10);
    if (parseInt(count.textContent, 10) > 1) {
      minusButton.disabled = false;
    } else {
      minusButton.disabled = true;
    }
    priceHandle();
  });

  minusButton.addEventListener('click', function () {
    parseInt(count.textContent--, 10);

    if (parseInt(count.textContent, 10) === 1) {
      minusButton.disabled = true;
    } else {
      minusButton.disabled = false;
    }
    priceHandle();
  });

  function initPrice() {
    const priceElement = plusButton.closest('dd').querySelector('.price');
    const basicPrice = parseInt(
      priceElement.textContent.replace(/[^0-9]/g, ''),
      10
    );
    priceElement.setAttribute('data-base-price', basicPrice);
  }

  function priceHandle() {
    const priceElement = plusButton.closest('dd').querySelector('.price');
    const basicPrice = parseInt(
      priceElement.getAttribute('data-base-price'),
      10
    );
    let productCount = parseInt(count.textContent, 10);
    const resultPrice = basicPrice * productCount;
    priceElement.textContent = `${resultPrice.toLocaleString()} 원`;
    resultProductPrice(resultPrice);
  }

  /* 총 가격 계산을 출력 */
  function resultProductPrice(resultPrice) {
    const resultProductPrice = document.querySelector(
      '.product__info__result .price'
    );
    resultProductPrice.textContent = `${resultPrice.toLocaleString()} 원`;
  }
}
