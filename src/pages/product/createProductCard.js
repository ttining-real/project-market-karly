import { getPbImageURL } from "kind-tiger";
import { addCartModal } from "./addCartModal.js";

export function createProductCard(product) {
  const card = document.createElement('div');
  card.classList.add('card');

  const isDiscounted = product.ratio > 0;

  const template = isDiscounted ? `
    <div class='product__info discount product__info--sm'>
      <span class='product__info--sm-delivery'>${product.deliver}</span>
      <span class='product__info--sm-title'>[${product.brand}] ${product.name}</span>
      <span class='product__info--sm-desc'>${product.description}</span>
      <span class='product__info--sm-price discount'>${product.price.toLocaleString()}&nbsp;원</span>
      <div class='product__info--sm-discount discount'>
        <span class='product__info--sm-discount-rate'>${product.ratio}%<span class='a11y'>할인</span></span>
        <span class='product__info--sm-discount-price'>${product.finalPrice.toLocaleString()}&nbsp;원</span>
      </div>
    </div>` 
    :`
    <div class='product__info product__info--sm'>
      <span class='product__info--sm-delivery'>${product.deliver}</span>
      <span class='product__info--sm-title'>[${product.brand}] ${product.name}</span>
      <span class='product__info--sm-desc'>${product.description}</span>
      <span class='product__info--sm-price'>${product.finalPrice.toLocaleString()}&nbsp;원</span>
    </div>`;

  let badgeTemplate = '';
  if (product.type != 'none') {
    badgeTemplate += `<span class="badge badge--lg badge--only">${product.type}</span>`;
  }
  if (product.benefit != 'none') {
    const benefits = Array.isArray(product.benefit) ? product.benefit : [product.benefit];
    benefits.forEach(benefit => {
      badgeTemplate += `<span class="badge badge--lg">${benefit}</span>`;
    });
  }

  card.innerHTML = `
    <a href="/src/pages/productDetail/details.html?product=${product.id}" class="card__link">
      <img class="card__img" src="${getPbImageURL(product)}" alt="${product.brand} ${product.name} 이미지" />
      <div class="card__data">
        ${template}
        <div class="badge-container">
          ${badgeTemplate}
        </div>
      </div>
    </a>
    <button type="button" class="button--cart button button--xs">
      <span class="icon icon--cart"></span>담기
    </button>
  `;

  const button = card.querySelector('.button--cart');
  button.addEventListener('click', () => {
    addCartModal(product.id);
  });

  return card;
}