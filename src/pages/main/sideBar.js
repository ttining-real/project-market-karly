// import { getProduct } from '/src/pages/main/getPbData.js';
// import '/src/styles/style.scss';
// import getPbImageURL from '@/api/getPbImageURL.js';

// async function renderRecentProduct() {
//   const recentList = document.querySelector(
//     '.product-list__items .swiper-wrapper'
//   );
//   const resentSideBar = document.querySelector('.sidebar.sidebar--sticky');
//   let viewProduct = localStorage.getItem('recent');
//   let viewArray = viewProduct ? viewProduct.split(',') : [];
//   let recentArray = viewArray.reverse();

//   if (viewArray.length < 0) {
//     resentSideBar.classList.add('.a11y');
//   }

//   for (const item of recentArray) {
//     try {
//       const data = await getProduct(item);
//       console.log(data);

//       const template = `
//         <li class="product-list__item swiper-slide" role="listitem">
//           <a href="/src/pages/productDetail/details.html?product=${data}" class="product-item">
//             <img
//               src="${getPbImageURL(data)}"
//               alt="${data.desciption}"
//               class="product-item__image"
//             />
//           </a>
//         </li>
//       `;

//       recentList.insertAdjacentHTML('beforeend', template);
//     } catch (error) {
//       console.error(`Failed to fetch product data for ID: ${item}`, error);
//     }
//   }
// }

// // renderRecentProduct();

// // DOMContentLoaded 이벤트에 콜백 등록
// document.addEventListener('DOMContentLoaded', renderRecentProduct);
