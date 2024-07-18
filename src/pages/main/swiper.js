import Swiper from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/swiper-bundle.css';
import { Navigation, Autoplay, Keyboard } from 'swiper/modules';
document.addEventListener('DOMContentLoaded', function () {
  /* banner swiper */
  new Swiper('.main__swiper .swiper', {
    modules: [Navigation, Keyboard, Autoplay],
    direction: 'horizontal',
    // loop: true,
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
  new Swiper('.product--recommendation .swiper', {
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
  new Swiper('.product--eventProduct .swiper', {
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
});

export function recentSwiper() {
  new Swiper('.recent__item .recent-swiper', {
    modules: [Navigation, Keyboard, Autoplay],
    // loop: true,
    slidesPerView: 1,
    slidesPerGroup: 1,
    direction: 'vertical',
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    keyboard: {
      enabled: true,
    },
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
  });
}
