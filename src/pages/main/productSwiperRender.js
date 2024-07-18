import { createProductCard } from '@/pages/product/createProductCard.js';
import pb from '@/api/pocketbase';

const productSwiperWrapper = document.querySelector(
  '#product-swiper .swiper-wrapper'
);
const saleProductSwiperWrapper = document.querySelector(
  '#eventProduct-swiper .swiper-wrapper'
);

async function getSwiperData() {
  /* product swiper */
  const productList = await pb.collection('products').getFullList();
  const saleProductList = await pb
    .collection('products')
    .getFullList({ sort: '-ratio' });

  productList.forEach((product) => {
    const card = createProductCard(product); // 제품 카드 생성
    const slide = document.createElement('div');
    slide.classList.add('swiper-slide');
    slide.appendChild(card);
    productSwiperWrapper.appendChild(slide); // swiper-wrapper에 swiper-slide 추가
  });

  saleProductList.forEach((product) => {
    const card = createProductCard(product); // 제품 카드 생성
    const slide = document.createElement('div');
    slide.classList.add('swiper-slide');
    slide.appendChild(card);
    saleProductSwiperWrapper.appendChild(slide); // swiper-wrapper에 swiper-slide 추가
  });
}

window.addEventListener('DOMContentLoaded', getSwiperData);
