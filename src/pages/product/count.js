import pb from '@/api/pocketbase';
const categories = ['food', 'necessity', 'personalcare', 'animal'];

/* filter count */
export async function countFilterDatas(category){
  const products = await pb.collection('products').getFullList();
  
  const counts = {
    categories: {
      food: 0,
      necessity: 0,
      personalcare: 0,
      animal: 0
    },
    priceSections: {
      section1: 0,
      section2: 0,
      section3: 0,
      section4: 0
    },
    deliveryTypes: {
      '샛별배송': 0,
      '판매자배송': 0
    },
    benefits: {
      '할인상품': 0,
      '한정수량': 0,
      '무료배송': 0
    },
    types: {
      'Karly Only': 0
    }
  };
  
  // 해당 카테고리에 맞는 제품들만 필터링
  const filteredProducts = category ? products.filter(product => product.category === category) : products;

  filteredProducts.forEach(product => {
    const benefits = Array.isArray(product.benefit) ? product.benefit : [product.benefit];
    // 카테고리 별 count
    if (counts.categories.hasOwnProperty(product.category)) {
      counts.categories[product.category]++;
    }
    // 가격 구간 별 count
    if (product.finalPrice < 10000) {
      counts.priceSections.section1++;
    }
    else if (product.finalPrice >= 10000 && product.finalPrice <= 49900) {
      counts.priceSections.section2++;
    }
    else if (product.finalPrice >= 50000 && product.finalPrice <= 99900) {
      counts.priceSections.section3++;
    }
    else if (product.finalPrice >= 100000) {
      counts.priceSections.section4++;
    }
    // 배송 유형 별 count
    if (counts.deliveryTypes.hasOwnProperty(product.deliver)) {
      counts.deliveryTypes[product.deliver]++;
    }
    // 혜택 별 count
    benefits.forEach(benefit => {
      if (counts.benefits.hasOwnProperty(benefit)) {
        counts.benefits[benefit]++;
      }
    })
    // 유형 별 count
    if (counts.types.hasOwnProperty(product.type)) {
      counts.types[product.type]++;
    }
  });

  categories.forEach(category => {
    document.getElementById(`count--${category}`).textContent = counts.categories[category];
  })
  Object.keys(counts.priceSections).forEach(section => {
    document.getElementById(`count--${section}`).textContent = counts.priceSections[section];
  })
  document.getElementById('count--delivery-daybreak').textContent = counts.deliveryTypes['샛별배송'];
  document.getElementById('count--delivery-seller').textContent = counts.deliveryTypes['판매자배송'];
  document.getElementById('count--discount').textContent = counts.benefits['할인상품'];
  document.getElementById('count--limited').textContent = counts.benefits['한정수량'];
  document.getElementById('count--free-shipping').textContent = counts.benefits['무료배송'];
  document.getElementById('count--karly-only').textContent = counts.types['Karly Only'];
}

/* total count - 총 @건 */
export function countTotalProducts(count){
  const countCard = document.getElementById('count__card');
  countCard.textContent = count;
}