document.addEventListener('DOMContentLoaded', function () {
  const moveTopButton = document.getElementById('move-top-button');
  let lastScrollTop = 0;

  window.addEventListener('scroll', function () {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop) {
      moveTopButton.classList.add('show');
      moveTopButton.classList.remove('hide');
    } else {
      moveTopButton.classList.remove('show');
      moveTopButton.classList.add('hide');
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  });
});
