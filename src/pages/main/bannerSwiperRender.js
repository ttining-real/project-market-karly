import pb from '@/api/pocketbase';

const BaseURL = pb.baseUrl;

async function getSwiperData() {
  const swiperImg = await pb.collection('visual').getFullList();

  swiperImg.forEach((banner) => {
    const slideElement = document.createElement('div');
    slideElement.classList.add('swiper-slide');

    const imgElement = document.createElement('img');
    imgElement.src = `${BaseURL}api/files/${banner.collectionId}/${banner.id}/${banner.photo}`;

    slideElement.appendChild(imgElement);
    document.querySelector('.swiper-wrapper').appendChild(slideElement);
  });

  getPopupImg();
}
window.addEventListener('DOMContentLoaded', getSwiperData);

async function getPopupImg() {
  const popupModal = document.querySelector('.modal.popup .popup__image a');
  const popupImg = await pb.collection('ad').getFullList();

  const imgElement = document.createElement('img');
  imgElement.src = `${BaseURL}api/files/${popupImg[0].collectionId}/${popupImg[0].id}/${popupImg[0].field}`;

  popupModal.appendChild(imgElement);
}
