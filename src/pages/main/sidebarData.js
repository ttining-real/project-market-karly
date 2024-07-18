import pb from '@/api/pocketbase';
import { setStorage } from 'kind-tiger';
import { recentSwiper } from '@/pages/main/swiper.js';

const BaseURL = pb.baseUrl;

window.addEventListener('click', function (e) {
  const card = e.target.closest('.card');

  if (card) {
    const cardId = card.dataset.id;

    let arr = JSON.parse(localStorage.getItem('productId')) || [];

    if (!arr.includes(cardId)) {
      arr.push(cardId);
      setStorage('productId', arr);
      localStorage.setItem('productId', JSON.stringify(arr));
    }
  }
});

window.addEventListener('DOMContentLoaded', function () {
  let localStorageData = JSON.parse(localStorage.getItem('productId'));

  localStorageData.forEach(async (id) => {
    const data = await pb.collection('products').getOne(id);

    const recentSwiper = document.querySelector(
      '.recent-swiper .swiper-wrapper'
    );
    const divElement = document.createElement('div');
    divElement.classList.add('swiper-slide');
    const imgElement = document.createElement('img');
    imgElement.setAttribute(
      'src',
      `${BaseURL}api/files/${data.collectionId}/${data.id}/${data.photo}`
    );
    divElement.appendChild(imgElement);
    recentSwiper.appendChild(divElement);

    divElement.addEventListener('click', function () {
      location.href = `/src/pages/productDetail/details.html?product=${data.id}`;
    });
  });

  recentSwiper();
});
