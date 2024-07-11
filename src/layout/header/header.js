import styles from '/src/styles/style.scss?inline';

class Header extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });

    this.shadowRoot.innerHTML = /*html*/ `
      <style rel='stylesheet'>${styles}</style>

  <header class='header'>
    <div class='header__main'>
      <h1 class='logo'>
        <ul>
          <li class='is-active'><a href="/index.html">
            <img src='/logo.svg' alt='마켓칼리 로고(클릭 시 메인 화면으로 이동)'>
            마켓칼리
          </a></li>
          <li><span class='divide'></span></li>
          <li><a href="">
            뷰티칼리
          </a></li>

          <!-- <a href='/index.html'><img src='/logo.svg' alt='마켓칼리 로고(클릭 시 메인 화면으로 이동)'></a>
          <button type='button' class='is-active'>마켓칼리</button>
          <span class='divide'></span>
          <button type='button'>뷰티칼리</button> -->
        </ul>
      </h1>
      <form class='input__field search__field' role='search' aria-label='사이트 검색'>
        <label for='inputSearch' class='a11y'>검색</label>
        <input type='search' class='input input--search' id='inputSearch' placeholder='검색어를 입력하세요'
        aria-label='검색어를 입력하세요'>
        <button type='submit' class='button button--ratio button--lg' aria-label='검색'>
        <span class='icon icon--search primary--text'></span>
        </button>
      </form>
      <div class='button__set'>
        <a href='/src/pages/login/login.html' class='button button--ratio button--md'><span class='icon icon--location'></span></a>
        <a href='/src/pages/login/login.html' class='button button--ratio button--md'><span class='icon icon--favorite'></span></a>
        <a href='/src/pages/cart/cart.html' class='button button--ratio button--md'><span class='icon icon--cart'></span></a>
      </div>
     </div>
     <div class='header__utils'>
      <ul class='list__link'>
        <li><a href='/src/pages/register/register.html' class='primary--text'>회원가입</a></li>
        <li aria-hidden='true'>
          <hr />
        </li>
        <li><a href='/src/pages/login/login.html'>로그인</a></li>
        <li aria-hidden='true'>
          <hr />
        </li>
        <li><a href='/src/pages/login/login.html'>고객센터<span class='icon icon--triangle--bottom' aria-hidden='true'></span></a></li>
      </ul>
     </div>
     <div class='header__nav'>
      <div class='nav__category'>
        <button type='button' class='category__button' aria-haspopup='true' aria-expanded='false'><span class='icon icon--menu'></span>카테고리</button>
        <ul class='category__menu' aria-label='카테고리 메뉴' aria-hidden='true'>
          <li><a href='/src/pages/product/product.html'><img src="/src/assets/icons/icon-cate-1.png" alt="식품에 관련된 단색 아이콘 이미지"/>식품</a></li>
          <li><a href='/src/pages/product/product.html'><img src="/src/assets/icons/icon-cate-2.png" alt="생필품에 관련된 단색 아이콘 이미지"/>생필품</a></li>
          <li><a href='/src/pages/product/product.html'><img src="/src/assets/icons/icon-cate-3.png" alt="케어용품에 관련된 단색 아이콘 이미지"/>케어용품</a></li>
          <li><a href='/src/pages/product/product.html'><img src="/src/assets/icons/icon-cate-4.png" alt="반려동물에 관련된 단색 아이콘 이미지"/>반려동물</a></li>
        </ul>
      </div>
      <nav class='nav__menu'>
        <ul>
          <li><a href='/src/pages/product/product.html'><span>신상품</span></a></li>
          <li><a href='/src/pages/product/product.html'><span>베스트</span></a></li>
          <li><a href='/src/pages/product/product.html'><span>알뜰쇼핑</span></a></li>
          <li><a href='/src/pages/product/product.html'><span>특가/혜택</span></a></li>
        </ul>
      </nav>
      <button type='button' class='nav__info'><b>샛별·낮</b>배송안내</button>
     </div>
  </header>
    `;
  }
}

customElements.define('c-header', Header);
