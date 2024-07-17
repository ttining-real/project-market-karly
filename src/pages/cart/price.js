/* 가격관련 js */
const discountPrice = document.querySelectorAll('.discount');
const plusButtonAll = document.querySelectorAll('.icon--plus');
const minusButtonAll = document.querySelectorAll('.icon--minus');

export function priceHandler(count, parent) {
  const originalPriceElement = parent.querySelector('.original-price');
  const discountPriceElement = parent.querySelector('.discount');

  const baseOriginalPrice = parseInt(
    originalPriceElement.getAttribute('data-base-price'),
    10
  );
  const baseDiscountPrice = parseInt(
    discountPriceElement.getAttribute('data-base-price'),
    10
  );

  let productCount = parseInt(count.textContent, 10);

  const newOriginalPrice = baseOriginalPrice * productCount;
  const newDiscountPrice = baseDiscountPrice * productCount;

  originalPriceElement.textContent = `${newOriginalPrice.toLocaleString()} 원`;
  discountPriceElement.textContent = `${newDiscountPrice.toLocaleString()} 원`;

  receiptHandler(newOriginalPrice, newDiscountPrice);
}

export function initializePrices() {
  const originalPrices = document.querySelectorAll('.original-price');
  originalPrices.forEach((priceElement) => {
    const basePrice = parseInt(
      priceElement.textContent.replace(/[^0-9]/g, ''),
      10
    );
    priceElement.setAttribute('data-base-price', basePrice);
  });

  discountPrice.forEach((priceElement) => {
    const basePrice = parseInt(
      priceElement.textContent.replace(/[^0-9]/g, ''),
      10
    );
    priceElement.setAttribute('data-base-price', basePrice);
  });
}
initializePrices();

plusButtonAll.forEach((plusBtn) => {
  const plusButton = plusBtn.parentElement;
  plusButton.addEventListener('click', function (e) {
    const parent = e.target.closest('.selected__item');
    const minusButton = parent.querySelector('.icon--minus').parentElement;

    let count = parent.querySelector('.count');
    let productCount = parseInt(count.textContent, 10);
    count.textContent = productCount + 1;

    priceHandler(count, parent);

    if (parseInt(count.textContent, 10) >= 2) {
      minusButton.disabled = false;
    } else if (parseInt(count.textContent, 10) <= 1) {
      minusButton.disabled = true;
    }
  });
});

minusButtonAll.forEach((minusBtn) => {
  const minusButton = minusBtn.parentElement;
  minusButton.addEventListener('click', function (e) {
    const parent = e.target.closest('.selected__item');

    let count = parent.querySelector('.count');
    let productCount = parseInt(count.textContent, 10);

    if (productCount > 1) {
      count.textContent = productCount - 1;

      priceHandler(count, parent);

      if (parseInt(count.textContent, 10) <= 1) {
        minusButton.disabled = true;
      } else {
        minusButton.disabled = false;
      }
    }
  });
});

function receiptHandler(newOriginalPrice, newDiscountPrice) {
  // 상품 결과 변경
  const receipt = document.querySelector('.receipt__price');
  const productPrice = receipt.querySelector('.product__price .price');
  const productOriginalPrice = receipt.querySelector('.product__sale .price');
  const totalPrice = document.querySelector(
    '.receipt__total .total__price .price'
  );
  const deliveryPrice = document.querySelector('.product__delivery .price');
  let delivery = parseInt(deliveryPrice.textContent.replace(/[^0-9]/g, ''), 10);

  productPrice.textContent = `${newDiscountPrice.toLocaleString()} 원`;
  let resultPrice = newDiscountPrice - (newDiscountPrice - newOriginalPrice);
  productOriginalPrice.textContent = `${(newDiscountPrice - newOriginalPrice).toLocaleString()} 원`;
  // totalPrice.textContent = `${resultPrice.toLocaleString()} 원`;

  if (resultPrice >= 30000) {
    delivery = 0;
    deliveryPrice.textContent = `${delivery} 원`;
    totalPrice.textContent = `${(resultPrice + delivery).toLocaleString()} 원`;
  } else if (resultPrice < 30000) {
    delivery = 3000;
    deliveryPrice.textContent = `${delivery.toLocaleString()} 원`;
    totalPrice.textContent = `${(resultPrice + delivery).toLocaleString()} 원`;
  }
}
