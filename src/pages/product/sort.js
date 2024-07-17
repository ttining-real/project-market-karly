import { renderProducts } from "./product.js";

let sortBy = '-benefit';

function sortProducts() {
  const sortValues = {
    recommend: '-benefit',
    new: '-created',
    sales: 'description',  //판매량 데이터 따로 없어서 임의값 지정
    benefit: '-ratio',
    lowprice: 'finalPrice',
    highprice: '-finalPrice'
  };

  Object.keys(sortValues).forEach(key => {
    const sortButton = document.querySelector(`.list__button--${key}`);
    const buttons = document.querySelectorAll('.list__button button');

    sortButton.addEventListener('click', () => {
      buttons.forEach(btn => btn.classList.remove('is--active'));
      sortButton.classList.add('is--active');

      sortBy = sortValues[key];
      renderProducts();
    });
  });
}

export { sortProducts, sortBy };