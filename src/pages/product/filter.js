import { renderProducts } from "./product.js";

const categories = ['food', 'necessity', 'personalcare', 'animal'];
const priceSections = {
  section1: 'finalPrice < 10000',
  section2: 'finalPrice >= 10000 && finalPrice <= 49900',
  section3: 'finalPrice >= 50000 && finalPrice <= 99900',
  section4: 'finalPrice >= 100000'
};
const deliveryTypes = {
  'daybreak': '샛별배송',
  'seller': '판매자배송'
};
const benefits = {
  'discount': '할인상품',
  'limited': '한정수량',
  'free-shipping': '무료배송'
};
const types = {
  'karly-only': 'Karly Only'
};

let categoryFilter = [];
let priceFilter = [];
let deliveryFilter = [];
let benefitFilter = [];
let typeFilter = [];

function resetFilter() {
  const checkboxes = document.querySelectorAll('.checkbox');
  const radioButtons = document.querySelectorAll('.radio');
  const counts = document.querySelectorAll('.accordion__head--content-count');

  checkboxes.forEach(checkbox => {
    checkbox.checked = false;
  });
  radioButtons.forEach(radioButton => {
    radioButton.checked = false;
  });
  counts.forEach(count => {
    count.textContent = 0;
    count.style.display = 'none';
  });

  categoryFilter = [];
  priceFilter = [];
  deliveryFilter = [];
  benefitFilter = [];
  typeFilter = [];

  renderProducts();
}

function category() {
  categories.forEach(value => {
    const checkbox = document.getElementById(`category-${value}`);
    const checkedCount = document.querySelector('#category .accordion__head--content-count');
    checkedCount.style.display = 'none';

    checkbox.addEventListener('change', () => {
      if (checkbox.checked) {
        categoryFilter.push(value);
      } 
      else {
        categoryFilter = categoryFilter.filter(category => category !== value);
      }

      if (categoryFilter.length == 0) {
        checkedCount.style.display = 'none';
      } else {
        checkedCount.style.display = 'block';
      }
      
      checkedCount.textContent = categoryFilter.length;
      renderProducts();
    });
  });
}

function price() {
  Object.keys(priceSections).forEach(value => {
    const radioBtn = document.getElementById(`price-${value}`);
    radioBtn.addEventListener('change', () => {
      priceFilter = [];
      priceFilter.push(priceSections[value]);

      renderProducts();
    });
  });
}

function delivery() {
  Object.keys(deliveryTypes).forEach(value => {
    const checkbox = document.getElementById(`delivery-${value}`);
    const checkedCount = document.querySelector('#delivery .accordion__head--content-count');
    checkedCount.style.display = 'none';

    checkbox.addEventListener('change', () => {
      if (checkbox.checked) {
        deliveryFilter.push(deliveryTypes[value]);
      } 
      else {
        deliveryFilter = deliveryFilter.filter(deliver => deliver !== deliveryTypes[value]);
      }

      if (deliveryFilter.length == 0) {
        checkedCount.style.display = 'none';
      } else {
        checkedCount.style.display = 'block';
      }
      checkedCount.textContent = deliveryFilter.length;
      
      renderProducts();
    });
  });
}

function benefit() {
  Object.keys(benefits).forEach(value => {
    const checkbox = document.getElementById(`benefit-${value}`);
    const checkedCount = document.querySelector('#benefit .accordion__head--content-count');
    checkedCount.style.display = 'none';

    checkbox.addEventListener('change', () => {
      if (checkbox.checked) {
        benefitFilter.push(benefits[value]);
      } 
      else {
        benefitFilter = benefitFilter.filter(benefit => benefit !== benefits[value]);
      }

      if (benefitFilter.length == 0) {
        checkedCount.style.display = 'none';
      } else {
        checkedCount.style.display = 'block';
      }
      
      checkedCount.textContent = benefitFilter.length;
      renderProducts();
    });
  });
}

function type() {
  Object.keys(types).forEach(value => {
    const checkbox = document.getElementById(`type-${value}`);
    const checkedCount = document.querySelector('#type .accordion__head--content-count');
    checkedCount.style.display = 'none';

    checkbox.addEventListener('change', () => {
      if (checkbox.checked) {
        typeFilter.push(types[value]);
      } 
      else {
        typeFilter = typeFilter.filter(type => type !== types[value]);
      }

      if (typeFilter.length == 0) {
        checkedCount.style.display = 'none';
      } else {
        checkedCount.style.display = 'block';
      }
      
      checkedCount.textContent = typeFilter.length;
      renderProducts();
    });
  });
}

export { category, price, delivery, benefit, type, resetFilter, categoryFilter, priceFilter, deliveryFilter, benefitFilter, typeFilter };
