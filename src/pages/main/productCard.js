import pb from '@/api/pocketbase';
import '/src/styles/style.scss';
import getPbImageURL from '@/api/getPbImageURL';

async function renderProductCard() {
  const productData = await pb.collection('products').getFullList();
  const productList = document.querySelector(
    '.product-list__swiper .swiper-wrapper'
  );

  productData.forEach((product) => {
    const discountPrice =
      Math.floor((product.price * (1 - product.ratio * 0.01)) / 100) * 100;
    const isDiscounted = product.ratio > 0;

    let badgeTemplate = '';
    if (product.type != 'none') {
      badgeTemplate += `<span class="badge badge--lg badge--only">${product.type}</span>`;
    }
    if (product.benefit != 'none') {
      const benefits = Array.isArray(product.benefit)
        ? product.benefit
        : [product.benefit];
      benefits.forEach((benefit) => {
        badgeTemplate += `<span class="badge badge--lg">${benefit}</span>`;
      });
    }

    const template = isDiscounted
      ? `
                <div class="swiper-slide">
                    <div class="card">
                        <a href="/" class="card__link">
                            <img class="card__img" src="${getPbImageURL(product)}" alt="${product.name} 이미지" />
                            <div class="card__data">
                                <div class="product__info discount product__info--sm">
                                <span class="product__info--sm-delivery">샛별배송</span>
                                <span class="product__info--sm-title">[${product.brand}] ${product.name}</span>
                                <span class="product__info--sm-price discount">${product.price}&nbsp;원</span>
                                <div class="product__info--sm-discount discount">
                                    <span class="product__info--sm-discount-rate">${product.ratio}&#37;<span class="a11y">할인</span></span>
                                    <span class="product__info--sm-discount-price">${discountPrice}&nbsp;원</span>
                                </div>
                                </div>
                                <div class="badge-container">
                                ${badgeTemplate}
                                </div>
                            </div>
                        </a>
                    <button type="button" class="button--cart button button--xs">
                      <span class="icon icon--cart"></span>담기
                    </button>
                    </div>
                </div>
                `
      : `
                <div class="swiper-slide">
                    <div class="card">
                        <a href="/" class="card__link">
                            <img class="card__img" src="${getPbImageURL(product)}" alt="${product.name} 이미지" />
                            <div class="card__data">
                                <div class="product__info discount product__info--sm">
                                <span class="product__info--sm-delivery">샛별배송</span>
                                <span class="product__info--sm-title">[${product.brand}] ${product.name}</span>
                                <div class="product__info--sm-discount discount">
                                    <span class="product__info--sm-discount-price">${product.price}&nbsp;원</span>
                                </div>
                                </div>
                                <div class="badge-container">
                                ${badgeTemplate}
                                </div>
                            </div>
                        </a>
                    <button type="button" class="button--cart button button--xs">
                      <span class="icon icon--cart"></span>담기
                    </button>
                    </div>
                </div>
                `;

    productList.insertAdjacentHTML('beforeend', template);
  });
}

renderProductCard();
