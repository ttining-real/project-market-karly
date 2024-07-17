import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay, Keyboard } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import getActivePage from './pagination';

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

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  // And if we need scrollbar
  scrollbar: {
    el: '.swiper-scrollbar',
  },
  on: {
    slideChange: function () {
      getActivePage();
    },
  },
});

const swiperContainers = document.querySelectorAll('.swiper-container');

swiperContainers.forEach((container, index) => {
  container.id = `swiper-${index + 1}`;
  console.log(container);
  const productSwiper = new Swiper(`#swiper-${index + 1}`, {
    slidesPerView: 4,
    slidesPerGroup: 4,
    // Optional parameters
    modules: [Navigation, Keyboard],
    direction: 'horizontal',
    keyboard: {
      enabled: true,
    },
    mousewheel: true,

    // Navigation arrows
    navigation: {
      nextEl: `#next-${index + 1}`,
      prevEl: `#prev-${index + 1}`,
    },
    scrollbar: {
      el: `#scrollbar-${index + 1} .swiper-scrollbar`,
    },
  });
});
