import Swiper from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Autoplay, Keyboard } from 'swiper/modules';
import { createProductCard } from "@/pages/product/createProductCard.js";
import pb from '@/api/pocketbase';


const bannerSwiperWrapper = document.querySelector('#banner-swiper .swiper-wrapper');
const productSwiperWrapper = document.querySelector('#product-swiper .swiper-wrapper');
const saleProductSwiperWrapper = document.querySelector('#saleProduct-swiper .swiper-wrapper');

const BaseURL = pb.baseUrl;

/* banner swiper */
async function getSwiperData() {
  const swiperImg = await pb.collection('visual').getFullList();

  swiperImg.forEach((banner) => {
    const slideElement = document.createElement('div');
    slideElement.classList.add('swiper-slide');

    const imgElement = document.createElement('img');
    imgElement.src = `${BaseURL}api/files/${banner.collectionId}/${banner.id}/${banner.photo}`;

    slideElement.appendChild(imgElement);
    bannerSwiperWrapper.appendChild(slideElement);
  });
}
window.addEventListener('DOMContentLoaded', getSwiperData);


/* product swiper */
const productList = await pb.collection('products').getFullList();
const saleProductList = await pb.collection('products').getFullList({sort: '-ratio'});

productList.forEach(product => {
  const card = createProductCard(product); // 제품 카드 생성
  const slide = document.createElement('div');
  slide.classList.add('swiper-slide');
  slide.appendChild(card);
  productSwiperWrapper.appendChild(slide); // swiper-wrapper에 swiper-slide 추가
})

saleProductList.forEach(product => {
  const card = createProductCard(product); // 제품 카드 생성
  const slide = document.createElement('div');
  slide.classList.add('swiper-slide');
  slide.appendChild(card);
  saleProductSwiperWrapper.appendChild(slide); // swiper-wrapper에 swiper-slide 추가
})

/* banner swiper */
new Swiper('#banner-swiper', {
  modules: [Navigation, Keyboard, Autoplay],
  direction: 'horizontal',
  loop: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  keyboard: {
    enabled: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  }, 
});

/* 이 상품 어때요? product swiper */
new Swiper('#product-swiper', {
  modules: [Navigation, Keyboard],
  slidesPerView: 4,
  slidesPerGroup: 4,
  direction: 'horizontal',
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  keyboard: {
    enabled: true,
  },
});

/* 놓치면 후회할 가격 product swiper */
new Swiper('#saleProduct-swiper', {
  modules: [Navigation, Keyboard],
  slidesPerView: 4,
  slidesPerGroup: 4,
  direction: 'horizontal',
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  keyboard: {
    enabled: true,
  },
});


// new Swiper('#recent-swiper',{
//   modules: [Navigation, Pagination, Autoplay, Keyboard],
//   direction: 'vertical',
//   slidesPerView: 2.5,
//   autoplay:true,
//   navigation: {
//     nextEl: '.recent-swiper-next',
//     prevEl: '.recent-swiper-prev',
//   },


//  })