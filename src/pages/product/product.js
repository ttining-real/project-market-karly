import '@/styles/style.scss';
import '@/layout/header/header.js';
import '@/layout/footer/footer.js';
import '@/pages/product/accordionToggle.js';
import '@/pages/product/addCartModal.js';
import '@/pages/product/categoryTitle.js';
import pb from '@/api/pocketbase';
import { countFilterDatas, countTotalProducts } from '@/pages/product/count.js';
import { category, price, delivery, benefit, type, resetFilter, categoryFilter, priceFilter, deliveryFilter, benefitFilter, typeFilter } from '@/pages/product/filter.js';
import { sortProducts, sortBy } from '@/pages/product/sort.js';
import { createProductCard } from '@/pages/product/createProductCard.js';
import getQueryParams from '@/pages/product/getQueryParams.js';

const queryParams = getQueryParams();
const categoryParam = queryParams['category'];

async function fetchProducts() {
  const resetButton = document.querySelector('.accordion__title--button-reset');
  const params = { sort: sortBy };
  let filters = [];

  try {
    if (categoryParam) {
      filters.push(`category="${categoryParam}"`);
      const category_accordion = document.getElementById('category');
      category_accordion.style.display = 'none';
    }
    if (categoryFilter.length > 0) {
      filters.push(`(${categoryFilter.map(value => `category="${value}"`).join(' || ')})`);
    }
    if (priceFilter.length != 0) {
      filters.push(`(${priceFilter})`);
    }
    if (deliveryFilter.length > 0) {
      filters.push(`(${deliveryFilter.map(value => `deliver="${value}"`).join(' || ')})`);
    }
    if (benefitFilter.length > 0) {
      filters.push(`(${benefitFilter.map(value => `benefit~"${value}"`).join(' || ')})`);
    }
    if (typeFilter.length > 0) {
      filters.push(`(${typeFilter.map(value => `type="${value}"`).join(' || ')})`);
    }
    
    if (filters.length == 0) {
      resetButton.disabled = true;
    }
    if (filters.length > 0) {
      params.filter = filters.join(' && ');
      resetButton.disabled = false;
      resetButton.addEventListener('click', resetFilter);
    }

    const products = await pb.collection('products').getFullList(params);
    return products;
  } 
  catch (error) {
    console.error('Error fetching products:', error.message, error.response);
    return [];
  }
}

export async function renderProducts() {
  const products = await fetchProducts();
  const cardList = document.getElementById('card-list');
  cardList.innerHTML = '';
  
  products.forEach(product => {
    const card = createProductCard(product);
    cardList.appendChild(card);
  });
  
  countTotalProducts(products.length);
  countFilterDatas(categoryParam);
}

document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  sortProducts();
  category();
  price();
  delivery();
  benefit();
  type();
});
