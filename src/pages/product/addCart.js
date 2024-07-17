import modalHandle from '@/lib/modal.js';
import pb from '@/api/pocketbase';

export async function addCart(productId){
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
  
  // 모달 open
  modalHandle('.modal__addcart', 'is--open', open);

  // content 리셋
  addCartTitle.textContent = '';
  addCartOriginalPrice.textContent = '';
  addCartFinalPrice.textContent = '';
  addCartTotalPrice.textContent = '';
  addCartSavingInfo.textContent = '';
  addCartCount.textContent = 1;

  // id값이 동일한 데이터 가져옴
  const product = await pb.collection('products').getOne(productId);
  
  // [브랜드] 상품명
  addCartTitle.textContent = `[${product.brand}] ${product.name}`;
  
  // 할인o 가격
  if (product.ratio > 0){
    addCartOriginalPrice.style.display = 'block';
    addCartOriginalPrice.textContent = `${product.price.toLocaleString()}원`;
  }
  // 할인x 가격
  addCartFinalPrice.textContent = `${product.finalPrice.toLocaleString()}원`;
  
  // 상품수량 컨트롤 버튼 이벤트
  addCartPlusButton.addEventListener('click', ()=>{
    addCartCount.textContent++;
    addCartMinusButton.disabled = false;
    addCartTotalPrice.textContent = `${(product.finalPrice * addCartCount.textContent).toLocaleString()}원`;
  })
  addCartMinusButton.addEventListener('click', ()=>{
    if (addCartCount.textContent != 1){
      addCartCount.textContent--;
      
      if (addCartCount.textContent == 1){
        addCartMinusButton.disabled = true;
      }
    }
    addCartTotalPrice.textContent = `${(product.finalPrice * addCartCount.textContent).toLocaleString()}원`;
  })

  // 상품 수량에 따른 가격
  addCartTotalPrice.textContent = `${(product.finalPrice * addCartCount.textContent).toLocaleString()}원`;
  // 가격의 0.1% 적립
  addCartSavingInfo.textContent = `구매 시 ${Math.round(product.finalPrice * 0.001)}원 적립`;
  
  // 취소 버튼 이벤트
  cancelButton.addEventListener('click', ()=>{
    // 모달 close
    modalHandle('.modal__addcart', 'is--open', close);
  })
  // 장바구니 담기 버튼 이벤트
  addCartButton.addEventListener('click', ()=>{
    // 모달 close
    modalHandle('.modal__addcart', 'is--open', close);
  })
}