import getPbImageURL from '@/api/getPbImageURL';
import pb from '@/api/pocketbase';

let sortBy = '-benefit';

async function fetchProducts() {
  try {
    const products = await pb
    .collection('products')
    .getFullList({ sort: sortBy });
    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

function createProductCard(product) {
  const card = document.createElement('div');
  card.classList.add('card');

  const discountPrice = Math.floor(product.price * (1 - product.ratio * 0.01) / 100) * 100;
  const isDiscounted = product.ratio > 0;

  const template = isDiscounted ? `
    <div class='product__info discount product__info--sm'>
      <span class='product__info--sm-delivery'>${product.deliver}</span>
      <span class='product__info--sm-title'>[${product.brand}] ${product.name}</span>
      <span class='product__info--sm-desc'>${product.description}</span>
      <span class='product__info--sm-price discount'>${product.price.toLocaleString()}&nbsp;원</span>
      <div class='product__info--sm-discount discount'>
        <span class='product__info--sm-discount-rate'>${product.ratio}%<span class='a11y'>할인</span></span>
        <span class='product__info--sm-discount-price'>${discountPrice.toLocaleString()}&nbsp;원</span>
      </div>
    </div>` :
    `
    <div class='product__info product__info--sm'>
      <span class='product__info--sm-delivery'>${product.deliver}</span>
      <span class='product__info--sm-title'>[${product.brand}] ${product.name}</span>
      <span class='product__info--sm-desc'>${product.description}</span>
      <span class='product__info--sm-price'>${product.price.toLocaleString()}&nbsp;원</span>
    </div>`;

    let badgeTemplate = '';
    if (product.type != 'none') {
      badgeTemplate += `<span class="badge badge--lg badge--only">${product.type}</span>`;
    }
    if (product.benefit != 'none') {
      const benefits = Array.isArray(product.benefit) ? product.benefit : [product.benefit];
      benefits.forEach(benefit => {
        badgeTemplate += `<span class="badge badge--lg">${benefit}</span>`;
      });
    }

  card.innerHTML = `
    <a href="/" class="card__link">
      <img class="card__img" src="${getPbImageURL(product)}" alt="상품 이미지" />
      <div class="card__data">
        ${template}
        <div class="badge-container">
          ${badgeTemplate}
        </div>
      </div>
    </a>
    <button type="button" class="button--cart button button--xs">
      <span class="icon icon--cart"></span>담기
    </button>
  `;

  return card;
}

function countProducts(count){
  const countCard = document.getElementById('count__card');
  countCard.textContent = count;
}

async function renderProducts() {
  const products = await fetchProducts();
  const cardList = document.getElementById('card-list');
  cardList.innerHTML = ''; // 기존 카드 초기화

  products.forEach(product => {
    const card = createProductCard(product);
    cardList.appendChild(card);
  });

  countProducts(products.length);
}

function sortProducts() {
  const sortValues = {
    recommend: '-benefit',
    new: '-created',
    sales: 'description',  //판매량 데이터 따로 없어서 임의값 지정
    benefit: '-ratio',
    lowprice: 'price',
    highprice: '-price'
  };

  Object.keys(sortValues).forEach(key => {
    const sortButton = document.querySelector(`.list__button--${key}`);
    const buttons = document.querySelectorAll('.list__button button');
    
    sortButton.addEventListener('click', () => {
      buttons.forEach(btn => btn.classList.remove('is--active'));
      sortButton.classList.add('is--active');

      sortBy = sortValues[key];
      renderProducts();
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  sortProducts();
});
