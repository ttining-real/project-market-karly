import { insertLast } from 'kind-tiger';
import pb from '@/api/pocketbase';

const params = new URLSearchParams(location.search);
const productId = params.get('product');
const BaseURL = pb.baseUrl;

async function getData() {
  const product = await pb.collection('products').getOne(productId);
  console.log(product);
  const productTemplate = `
    <div class="product__image">
      <img
        src='${BaseURL}api/files/${product.collectionId}/${product.id}/${product.photo}'
        alt="${product.name}"
      />
    </div>
    <div class="product__info--wrapper">
      <div class="product__info product__info--lg">
        <span class="product__info--lg-delivery">${product.deliver}</span>
        <span class="product__info--lg-title">[${product.brand}] ${product.name}</span>
        <span class="product__info--lg-desc">${product.description}</span>
        <span class="product__info--lg-price">${product.finalPrice.toLocaleString()}<span>&nbsp;원</span></span>
        <span class="alert">로그인 후, 적립 혜택이 제공됩니다.</span>
      </div>

      <dl class="product__info__list">
        <div class="product__info__item delivery">
          <dt>배송</dt>
          <dd>
            <span>${product.deliver}</span>
            <span class="desc">23시 전 주문 시 내일 아침 7시 전 도착<br />(대구 부산 울산 샛별배송 운영시간 별도 확인)</span>
          </dd>
        </div>
        <div class="product__info__item seller">
          <dt>판매자</dt>
          <dd>컬리</dd>
        </div>
        <div class="product__info__item packaging">
          <dt>포장타입</dt>
          <dd>
            <span>상온 (종이포장)</span>
            <span class="desc">택배배송은 에코 포장이 스티로폼으로 대체됩니다.</span>
          </dd>
        </div>
        <div class="product__info__item sales">
          <dt>판매단위</dt>
          <dd>1봉</dd>
        </div>
        <div class="product__info__item weight">
          <dt>중량/용량</dt>
          <dd>123g*4봉</dd>
        </div>
        <div class="product__info__item origin">
          <dt>원산지</dt>
          <dd>상세페이지 별도표기</dd>
        </div>
        <div class="product__info__item allergy">
          <dt>알레르기정보</dt>
          <dd>
            -대두, 밀, 쇠고기 함유<br />
            -계란, 우유, 메밀, 땅콩, 고등어, 게, 돼지고기, 새우, 복숭아,
            토마토, 아황산류, 호두, 잣, 닭고기, 오징어, 조개류(굴, 전복,
            홍합 포함)를 사용한 제품과 같은 제조시설에서 제조
          </dd>
        </div>
      </dl>

      <dl class="product__info__buy">
        <dt>상품선택</dt>
        <div class="product__info__buy--selected">
          <dd>
            <h2>[${product.brand}] ${product.name}</h2>
            <div class="counter__container">
              <button type="button" disabled>
                <span class="icon icon--minus"></span>
              </button>
              <span class="count">1</span>
              <button type="button">
                <span class="icon icon--plus"></span>
              </button>
            </div>
            <strong class="price">${product.finalPrice.toLocaleString()}<span>원</span></strong>
          </dd>
        </div>
      </dl>

      <div class="product__info__result">
        <dl>
          <dt>총 상품금액:</dt>
          <dd>
            <strong class="price">${product.finalPrice.toLocaleString()}<span>원</span></strong>
          </dd>
        </dl>
        <div class="etc">
          <span class="badge badge--md badge--accent">적립</span>
          <strong>로그인 후, 적립 혜택 제공</strong>
        </div>
      </div>

      <div class="button__group">
        <button type="button" class="button button--ratio button--lg button--outlined">
          <span class="icon icon--favorite"></span>
        </button>
        <button type="button" class="button button--ratio button--lg button--outlined">
          <span class="icon icon--bell"></span>
        </button>
        <button type="button" class="button button--md button--primary button--filled button--basket">
          장바구니 담기
        </button>
      </div>
    </div>
  `;
  insertLast('.product__details', productTemplate);
}
getData();

window.addEventListener('DOMContentLoaded');
