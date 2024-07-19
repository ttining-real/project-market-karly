import pb from '@/api/pocketbase';
import { setStorage } from 'kind-tiger';

const BaseURL = pb.baseUrl;

function cardClickHandler(e) {
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
}
window.addEventListener('click', cardClickHandler);

export default function getRecentProductData() {
  let localStorageData = JSON.parse(localStorage.getItem('productId'));
  if (!localStorageData) return;

  localStorageData.forEach(async (id) => {
    try {
      let data = await pb.collection('products').getOne(id);

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
    } catch (error) {
      console.log(error);
    }
  });
}
getRecentProductData();

// localStorageData.forEach(async(id) => {
//   const data = await pb.collection('products').getOne(id);

//   const recentSwiper = document.querySelector(
//     '.recent-swiper .swiper-wrapper'
//   );
//   const divElement = document.createElement('div');
//   divElement.classList.add('swiper-slide');
//   const imgElement = document.createElement('img');
//   imgElement.setAttribute(
//     'src',
//     `${BaseURL}api/files/${data.collectionId}/${data.id}/${data.photo}`
//   );
//   divElement.appendChild(imgElement);
//   recentSwiper.appendChild(divElement);

//   divElement.addEventListener('click', function () {
//     location.href = `/src/pages/productDetail/details.html?product=${data.id}`;
//   });
// });
