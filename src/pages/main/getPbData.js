import pb from '@/api/pocketbase';

export async function getProductArray() {
  try {
    const productList = await pb.collection('products').getFullList();
    // console.log(productList);
    return productList;
  } catch (error) {
    console.error('제품 목록 데이터를 가져오지 못했습니다ㅠㅁㅠ');
    throw error;
  }
}

export async function getProduct(productId) {
  try {
    const productData = await pb.collection('products').getOne(productId);
    // console.log(productData);
    return productData;
  } catch (error) {
    console.error('제품 데이터를 가져오지 못했습니다ㅜ0ㅜ');
    throw error;
  }
}
