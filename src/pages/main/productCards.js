import { createProductCard } from "@/pages/product/createProductCard.js";
import { pb } from '@/api/pocketbase';



const swiperWrapper = document.querySelector('.swiper-wrapper')

const productList = await pb.collection('products').getFullList();

productList.forEach(product => {
  const card = createProductCard(product); // 제품 카드 생성
  const slide = document.createElement('div');
  slide.classList.add('swiper-slide');
  slide.appendChild(card);
  swiperWrapper.appendChild(slide); // swiper-wrapper에 swiper-slide 추가
})