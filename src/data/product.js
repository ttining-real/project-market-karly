import pb from '@/api/pocketbase';
import { tiger } from 'kind-tiger';

// console.log(pb.collection('products'));

const App = document.querySelector('#app');
const BaseURL = pb.baseUrl;

async function getData() {
  const productData = await tiger.get(
    `${BaseURL}api/collections/products/records`
  );
  const products = productData.data.items;
  console.log(products);
  // benefit, brand, category, deliver, description, details, photo, food_type, name, price, ratio, type

  products.forEach((item) => {
    const card = /* html */ `
      <div class="card">
        <a href="/" class="card__link">
          <!-- 상품 이미지 -->
          <img class="card__img" src='${BaseURL}api/files/${item.collectionId}/${item.id}/${item.photo}' alt=${item.name} />
          <!-- 상품 정보 -->
          <div class="card__data">
            <div class="product__info discount product__info--sm">
              <span class="product__info--sm-delivery">${item.deliver}</span>
              <span class="product__info--sm-title">${item.name}</span>
              <span class="product__info--sm-desc">${item.description}</span>
              <span class="product__info--sm-price discount">${item.price}&nbsp;원</span>
              <div class="product__info--sm-discount discount">
                <span class="product__info--sm-discount-rate">${item.ratio === 0 ? '' : item.ratio + '%'}<span class="a11y">할인</span></span>
                <span class="product__info--sm-discount-price">4,500&nbsp;원</span>
              </div>
            </div>
            <!-- badge -->
            <div class="badge-container">
              <span class="badge badge--lg badge--only">${item.type}</span>
              <span class="badge badge--lg">한정수량</span>
            </div>
          </div>
        </a>
        <!-- 장바구니 담기 버튼 -->
        <button type="button" class='button--cart button button--xs'><span class="icon icon--cart"></span>담기</button>
      </div>`;
    App.insertAdjacentHTML('beforeend', card);
  });
}

getData();
