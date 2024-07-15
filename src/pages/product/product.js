import getPbImageURL from '@/api/getPbImageURL';
import pb from '@/api/pocketbase';

const categories = ['food', 'necessity', 'personalcare', 'animal'];
const deliveryTypes = {
  'daybreak': '샛별배송',
  'seller': '판매자배송'
};
const benefits = {
  'discount': '할인상품',
  'limited': '한정수량',
  'free-shipping': '무료배송'
};
const types = {
  'karly-only': 'Karly Only'
};
let sortBy = '-benefit';
let categoryFilter = [];
let deliveryFilter = [];
let benefitFilter = [];
let typeFilter = [];

async function countEachDatas(){
  const products = await pb.collection('products').getFullList();
  
  const counts = {
    categories: {
      food: 0,
      necessity: 0,
      personalcare: 0,
      animal: 0
    },
    deliveryTypes: {
      '샛별배송': 0,
      '판매자배송': 0
    },
    benefits: {
      '할인상품': 0,
      '한정수량': 0,
      '무료배송': 0
    },
    types: {
      'Karly Only': 0
    }
  };

  products.forEach(product => {
    if (counts.categories.hasOwnProperty(product.category)) {
      counts.categories[product.category]++;
    }
    if (counts.deliveryTypes.hasOwnProperty(product.deliver)) {
      counts.deliveryTypes[product.deliver]++;
    }
    if (counts.benefits.hasOwnProperty(product.benefit)) {
      counts.benefits[product.benefit]++;
    }
    if (counts.types.hasOwnProperty(product.type)) {
      counts.types[product.type]++;
    }
  });

  categories.forEach(category => {
    document.getElementById(`count--${category}`).textContent = counts.categories[category];
  });
  document.getElementById('count--delivery-daybreak').textContent = counts.deliveryTypes['샛별배송'];
  document.getElementById('count--delivery-seller').textContent = counts.deliveryTypes['판매자배송'];
  document.getElementById('count--discount').textContent = counts.benefits['할인상품'];
  document.getElementById('count--limited').textContent = counts.benefits['한정수량'];
  document.getElementById('count--free-shipping').textContent = counts.benefits['무료배송'];
  document.getElementById('count--karly-only').textContent = counts.types['Karly Only'];
}

async function fetchProducts() {
  const params = { sort: sortBy };
  const filters = [];

  try {
    if (categoryFilter.length > 0) {
      filters.push(categoryFilter.map(value => `category="${value}"`).join(' || '));
    }
    if (deliveryFilter.length > 0) {
      filters.push(deliveryFilter.map(value => `deliver="${value}"`).join(' || '));
    }
    if (benefitFilter.length > 0) {
      filters.push(benefitFilter.map(value => `benefit~"${value}"`).join(' || '));
    }
    if (typeFilter.length > 0) {
      filters.push(typeFilter.map(value => `type="${value}"`).join(' || '));
    }
  
    if (filters.length > 0) {
      params.filter = filters.join(' && ');
    }
    const products = await pb.collection('products').getFullList(params);
    return products;
  } catch (error) {
    console.error('Error fetching products:', error.message, error.response);
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
      <img class="card__img" src="${getPbImageURL(product)}" alt="${product.brand} ${product.name} 이미지" />
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

/* 총 @건 */
function countTotalProducts(count){
  const countCard = document.getElementById('count__card');
  countCard.textContent = count;
}

async function renderProducts() {
  const products = await fetchProducts();
  const cardList = document.getElementById('card-list');
  cardList.innerHTML = '';

  products.forEach(product => {
    const card = createProductCard(product);
    cardList.appendChild(card);
  });
  
  countTotalProducts(products.length);
  countEachDatas();
}

/* 정렬 버튼 */
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

function category(){
  categories.forEach(value => {
    const checkbox = document.getElementById(`category-${value}`);
    const checkedCount = document.querySelector('#category .accordion__head--content-count');
    checkedCount.style.display = 'none';

    checkbox.addEventListener('change', () => {
      if (checkbox.checked) {
        categoryFilter.push(value);
      } 
      else {
        categoryFilter = categoryFilter.filter(category => category !== value);
      }

      if(categoryFilter.length == 0){
        checkedCount.style.display = 'none';
      }
      else{
        checkedCount.style.display = 'block';
      }
      
      checkedCount.textContent = categoryFilter.length;
      renderProducts();
    });
  });
}

function delivery(){
  Object.keys(deliveryTypes).forEach(value => {
    const checkbox = document.getElementById(`delivery-${value}`);
    const checkedCount = document.querySelector('#delivery .accordion__head--content-count');
    checkedCount.style.display = 'none';

    checkbox.addEventListener('change', () => {
      if (checkbox.checked) {
        deliveryFilter.push(deliveryTypes[value]);
      } 
      else {
        deliveryFilter = deliveryFilter.filter(deliver => deliver !== deliveryTypes[value]);
      }

      if(deliveryFilter.length == 0){
        checkedCount.style.display = 'none';
      }
      else{
        checkedCount.style.display = 'block';
      }
      checkedCount.textContent = deliveryFilter.length;
      renderProducts();
    });
  });
}

function benefit(){
  Object.keys(benefits).forEach(value => {
    const checkbox = document.getElementById(`benefit-${value}`);
    const checkedCount = document.querySelector('#benefit .accordion__head--content-count');
    checkedCount.style.display = 'none';

    checkbox.addEventListener('change', () => {
      if (checkbox.checked) {
        benefitFilter.push(benefits[value]);
      } 
      else {
        benefitFilter = benefitFilter.filter(benefit => benefit !== benefits[value]);
      }

      if(benefitFilter.length == 0){
        checkedCount.style.display = 'none';
      }
      else{
        checkedCount.style.display = 'block';
      }
      console.log(benefitFilter);
      checkedCount.textContent = benefitFilter.length;
      renderProducts();
    });
  });
}

function type(){
  Object.keys(types).forEach(value => {
    const checkbox = document.getElementById(`type-${value}`);
    const checkedCount = document.querySelector('#type .accordion__head--content-count');
    checkedCount.style.display = 'none';

    checkbox.addEventListener('change', () => {
      if (checkbox.checked) {
        typeFilter.push(types[value]);
      } 
      else {
        typeFilter = typeFilter.filter(type => type !== types[value]);
      }

      if(typeFilter.length == 0){
        checkedCount.style.display = 'none';
      }
      else{
        checkedCount.style.display = 'block';
      }
      checkedCount.textContent = typeFilter.length;
      renderProducts();
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  sortProducts();
  category();
  delivery();
  benefit();
  type();
});
