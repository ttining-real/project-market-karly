import '@/styles/style.scss';
import '@/layout/header/header.js';
import '@/layout/footer/footer.js';
import '@/pages/product/accordionToggle.js';
import '@/pages/product/addCart.js';
import getPbImageURL from '@/api/getPbImageURL';
import pb from '@/api/pocketbase';
import { countFilterDatas, countTotalProducts } from '@/pages/product/count.js';
import { addCart } from './addCart.js';
import { category, price, delivery, benefit, type, resetFilter, categoryFilter, priceFilter, deliveryFilter, benefitFilter, typeFilter } from './filter.js';
import { sortProducts, sortBy } from './sort.js';
import { createProductCard } from './createProductCard.js';

async function fetchProducts() {
  const resetButton = document.querySelector('.accordion__title--button-reset');
  const params = { sort: sortBy };
  let filters = [];

  try {
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
  countFilterDatas();
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
