export default function getActivePage() {
  const currentPage = document.querySelector('.current-page');
  const totalPage = document.querySelector('.total-page');
  const activeSlide = document.querySelector('.swiper-slide-active');
  if (activeSlide) {
    const slideIndex = activeSlide.getAttribute('data-swiper-slide-index');
    const currentIndex = +slideIndex + 2;
    if (currentPage) {
      currentPage.textContent = ''; // 또는 innerText = slideIndex;
      currentPage.textContent = currentIndex; // 또는 innerText = slideIndex;
    }
  }
  const allSlides = document.querySelectorAll('.main__visual .swiper-slide');
  if (allSlides.length > 0) {
    const lastSlideIndex = allSlides.length - 1;
    if (totalPage) {
      totalPage.textContent = lastSlideIndex + 1; // 총 슬라이드 수
    }
  }
}
