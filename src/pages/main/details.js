import getPbImageURL from '@/api/getPbImageURL.js';
import { getProduct } from './getPbData';

export default async function renderProductDetail() {
  // URL의 쿼리 문자열에서 제품 ID 추출
  const detailWrapper = document.querySelector('.product__details');
  const params = new URLSearchParams(window.location.search);
  const productId = params.get('product');

  if (!productId) {
    detailWrapper.innerHTML = '<p>유효한 상품 ID가 없습니다.</p>';
    return;
  }

  try {
    // 상품 데이터 가져오기
    const data = await getProduct(productId);

    // 로컬 스토리지에서 'recent' 값을 가져옴
    let recentIds = localStorage.getItem('recent');
    recentIds = recentIds ? recentIds.split(',') : [];
    recentIds.push(productId);

    // 배열을 다시 문자열로 변환하여 로컬 스토리지에 저장
    localStorage.setItem('recent', recentIds.join(','));

    // HTML 템플릿 생성
    // const template = /* html */ `
    //   <div class="wrapper">
    //   </div>
    // `;

    // 템플릿을 컨테이너에 삽입
    detailWrapper.insertAdjacentHTML('beforeend', template);
  } catch (error) {
    detailWrapper.innerHTML =
      '<p>상품 정보를 불러오는 중 오류가 발생했습니다.</p>';
  }
}

// 함수 호출
renderProductDetail();
