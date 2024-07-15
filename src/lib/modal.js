export default function modalHandle(assignClass, openClassName, status) {
  const className = document.querySelector(assignClass);
  const overlay = document.querySelector('.overlay');

  if (status === open) {
    className.classList.add(openClassName);
    overlay.classList.add('is--active');
  } else if (status === close) {
    className.classList.remove(openClassName);
    overlay.classList.remove('is--active');
  }
}
