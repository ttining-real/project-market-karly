// addCartEvent.js
export function addCartEvent(product, count) {
  // 로컬 스토리지에 제품 정보와 수량 저장
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  const existingItemIndex = cartItems.findIndex(item => item.productId === product.id);

  if (existingItemIndex > -1) {
    // 이미 존재하는 제품인 경우 수량을 업데이트
    cartItems[existingItemIndex].productCount += parseInt(count);
  } else {
    // 새로운 제품인 경우 추가
    cartItems.push({
      productId: product.id,
      productName: product.name,
      productBrand: product.brand,
      productPrice: product.finalPrice,
      productCount: parseInt(count),
    });
  }

  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  updateCartUI(product, count);
}

// UI 업데이트 함수
function updateCartUI(product, count) {
  document.addEventListener('DOMContentLoaded', () => {
  const selectedList = document.querySelector('.selected');

  if (!selectedList) {
    console.error("Error: '.selected' element not found.");
    return;
  }

  const template = `
    
      <div class='checkbox__wrap'>
        <input type='checkbox' class='checkbox' id='checkbox02' name='checkbox-name02' checked />
        <label for='checkbox02' class='checkbox__label'>
          <span class='checkbox__label--icon'></span>
        </label>
      </div>
      <div class='product--link'>
        <a href='/src/pages/productDetail/details.html?product=${product.id}'>
          <img src='' alt='${product.brand} ${product.name} 이미지' />
        </a>
      </div>
      <strong>
        <a href='/src/pages/productDetail/details.html?product=${product.id}'>
          [${product.brand}] ${product.name}
        </a>
      </strong>
      <div class="counter__container">
        <button type="button" class="counter--minus"><span class='icon icon--minus'></span></button>
        <span class='count'>${count}</span>
        <button type="button" class="counter--plus"><span class='icon icon--plus'></span></button>
      </div>
      <div class='price'>
        <span class='product__info--sm-discount-price'>${product.finalPrice.toLocaleString()}&nbsp;원</span>
        <span class='product__info--sm-price discount'>${product.price.toLocaleString()}&nbsp;원</span>
      </div>
      <button type='button' class='delete'>
        <span class='icon icon--cancel'></span>
      </button>
    
  `;

  const listItem = document.createElement('li');
  listItem.classList.add('selected__item');
  listItem.innerHTML = template;

  selectedList.appendChild(listItem);

  // 이벤트 리스너 추가
  listItem.querySelector('.counter--minus').addEventListener('click', () => updateCount(product.id, -1));
  listItem.querySelector('.counter--plus').addEventListener('click', () => updateCount(product.id, 1));
  listItem.querySelector('.delete').addEventListener('click', () => removeItem(product.id));
});
}

// 수량 업데이트 함수
function updateCount(productId, delta) {
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  const itemIndex = cartItems.findIndex(item => item.productId === productId);

  if (itemIndex > -1) {
    cartItems[itemIndex].productCount += delta;
    if (cartItems[itemIndex].productCount < 1) {
      cartItems[itemIndex].productCount = 1;
    }
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    document.querySelector(`#checkbox-${productId}`).closest('.selected__item').querySelector('.count').textContent = cartItems[itemIndex].productCount;
  }
}

// 항목 삭제 함수
function removeItem(productId) {
  let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  cartItems = cartItems.filter(item => item.productId !== productId);
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  document.querySelector(`#checkbox-${productId}`).closest('.selected__item').remove();
}

// 이미지 URL 가져오기 함수 (기존 함수 예시)
function getPbImageURL(product) {
  // 이미지 URL 생성 로직을 여기에 추가
  return `path/to/image/${product.imageId}`;
}
