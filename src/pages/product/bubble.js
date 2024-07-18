import getPbImageURL from "@/api/getPbImageURL";

export default async function bubble(product){
  const bubble = document.querySelector('.bubble');
  const bubbleImg = document.querySelector('.bubble__img');
  const bubbleProductName = document.querySelector('.bubble__product');
  
  bubbleImg.src = '';
  bubbleImg.alt = '';
  bubbleProductName.textContent = '';

  bubble.classList.add('is--active');

  bubbleImg.src = getPbImageURL(product);
  bubbleImg.alt = `[${product.brand}] ${product.name} 이미지`;
  bubbleProductName.textContent = `[${product.brand}] ${product.name}`

  setTimeout(() => {
    bubble.classList.remove('is--active');
  }, 2000);
}