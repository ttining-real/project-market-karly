document.addEventListener('DOMContentLoaded', function () {
  const moveTopButton = document.getElementById('move-top-button');
  let lastScrollTop = 0;

  window.addEventListener('scroll', function () {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    console.log(scrollTop);
    // 스크롤을 더 많이 내렸을 때 나타나게 하고 싶으면 비교값 크게하기
    if (scrollTop > 300) {
      moveTopButton.classList.add('show');
      moveTopButton.classList.remove('hide');
    } else {
      moveTopButton.classList.remove('show');
      moveTopButton.classList.add('hide');
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  });
});
