import modalHandle from '@/lib/modal.js';
import pb from '@/api/pocketbase';

export async function addCart(productId) {
  const cancelButton = document.querySelector('.button--cancel');
  const addCartButton = document.querySelector('.button--addcart');
  const addCartTitle = document.querySelector('.modal__addcart--title');
  const addCartOriginalPrice = document.querySelector('.modal__addcart--price-original');
  const addCartFinalPrice = document.querySelector('.modal__addcart--price-final');
  const addCartTotalPrice = document.querySelector('.modal__addcart--total-price');
  const addCartSavingInfo = document.querySelector('.modal__addcart--saving-info');
  const addCartMinusButton = document.querySelector('.modal__addcart--count .button--minus');
  const addCartPlusButton = document.querySelector('.modal__addcart--count .button--plus');
  const addCartCount = document.querySelector('.modal__addcart--count .count');

  let product;

  async function openModal() {
    modalHandle('.modal__addcart', 'is--open', open);

    // content 초기화
    addCartTitle.textContent = '';
    addCartOriginalPrice.textContent = '';
    addCartFinalPrice.textContent = '';
    addCartTotalPrice.textContent = '';
    addCartSavingInfo.textContent = '';
    addCartCount.textContent = 1;

    // id값이 동일한 데이터 가져오기
    product = await pb.collection('products').getOne(productId);
    // 상품명
    addCartTitle.textContent = `[${product.brand}] ${product.name}`;
    // 할인 유무에 따른 가격
    if (product.ratio > 0) {
      addCartOriginalPrice.style.display = 'block';
      addCartOriginalPrice.textContent = `${product.price.toLocaleString()}원`;
    } else {
      addCartOriginalPrice.style.display = 'none';
    }
    addCartFinalPrice.textContent = `${product.finalPrice.toLocaleString()}원`;
    addCartTotalPrice.textContent = `${product.finalPrice.toLocaleString()}원`;

    updateSavingInfo(); // 초기화 후 적립 정보 업데이트
  }

  function increaseCount() {
    if (!product) return;

    addCartCount.textContent++;
    addCartMinusButton.disabled = false;
    addCartTotalPrice.textContent = `${(parseInt(addCartCount.textContent) * product.finalPrice).toLocaleString()}원`;

    updateSavingInfo(); // 수량 증가 후 적립 정보 업데이트
  }

  function decreaseCount() {
    if (!product) return;

    if (addCartCount.textContent != 1){
      addCartCount.textContent--;
      
      if (addCartCount.textContent == 1){
        addCartMinusButton.disabled = true;
      }
    }
    addCartTotalPrice.textContent = `${(parseInt(addCartCount.textContent) * product.finalPrice).toLocaleString()}원`;

    updateSavingInfo(); // 수량 감소 후 적립 정보 업데이트
  }

  // 적립
  function updateSavingInfo() {
    const savingAmount = Math.round(product.finalPrice * 0.001 * parseInt(addCartCount.textContent));
    addCartSavingInfo.textContent = `구매 시 ${savingAmount.toLocaleString()}원 적립`;
  }

  // 이벤트 리스너 등록
  addCartPlusButton.addEventListener('click', increaseCount);
  addCartMinusButton.addEventListener('click', decreaseCount);

  cancelButton.addEventListener('click', () => {
    modalHandle('.modal__addcart', 'is--open', close);
    // 이벤트 리스너 제거
    addCartPlusButton.removeEventListener('click', increaseCount);
    addCartMinusButton.removeEventListener('click', decreaseCount);
  });

  addCartButton.addEventListener('click', () => {
    modalHandle('.modal__addcart', 'is--open', close);
    // 이벤트 리스너 제거
    addCartPlusButton.removeEventListener('click', increaseCount);
    addCartMinusButton.removeEventListener('click', decreaseCount);
  });

  await openModal();
}
