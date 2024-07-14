import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay, Keyboard } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const swiper = new Swiper('.swiper', {
  // Optional parameters
  modules: [Navigation, Pagination, Autoplay, Keyboard],
  direction: 'horizontal',
  loop: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  keyboard: {
    enabled: true,
  },
  mousewheel: true,
  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
    clickable: true, // 버튼 클릭 여부
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  // And if we need scrollbar
  scrollbar: {
    el: '.swiper-scrollbar',
  },
});

const productSwiper = new Swiper('.product-list__swiper', {
  slidesPerView: 4,
  slidesPerGroup: 4,
  // Optional parameters
  modules: [Navigation, Keyboard],
  direction: 'horizontal',
  loop: true,
  keyboard: {
    enabled: true,
  },
  mousewheel: true,

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  // And if we need scrollbar
  scrollbar: {
    el: '.swiper-scrollbar',
  },
});
