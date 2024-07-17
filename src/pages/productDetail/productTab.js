const HEADER_HEIGHT = 56 + 44;

const productTab = document.querySelector('.product__tab');
const productTabButton = productTab.querySelectorAll(
  '.product__tab__item button'
);
let currentActiveTab = productTab.querySelector('.is--active');

function productTabHandle() {
  const productTabItem = this.parentElement;
  console.log(productTabItem);
  if (currentActiveTab !== productTabItem) {
    currentActiveTab.classList.remove('is--active');
    productTabItem.classList.add('is--active');
    currentActiveTab = productTabItem;
  }
}

function scrollToPanel() {
  const tabPanelId = this.parentElement.getAttribute('aria-labelledby');
  const tabPanel = document.querySelector(`#${tabPanelId}`);
  const scrollAmount = tabPanel.getBoundingClientRect().top - HEADER_HEIGHT;

  scrollBy({
    top: scrollAmount,
    behavior: 'smooth',
  });
}

productTabButton.forEach((button) => {
  button.addEventListener('click', productTabHandle);
  button.addEventListener('click', scrollToPanel);
});
