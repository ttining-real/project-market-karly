import getQueryParams from "./getQueryParams";

const queryParams = getQueryParams();
const category = queryParams['category'];
const menu = queryParams['menu'];
const title = document.querySelector('.product__title');

const categoryTitle = {
  food: '식품',
  necessity: '생필품',
  personalcare: '케어용품',
  animal: '반려동물'
}

const menuTitle= {
  new: '신상품',
  best: '베스트',
  timesale: '알뜰쇼핑',
  benefit: '특가/혜택'
}

if(category){
  title.textContent = categoryTitle[category];
} else {
  title.textContent = menuTitle[menu];
}