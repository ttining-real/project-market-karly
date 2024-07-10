
import styles from '/src/styles/style.scss?inline' ;

class Header extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });

    this.shadowRoot.innerHTML = `
      <style rel='stylesheet'>${styles}</style>
      <header class='header'>
        <div class='header__main'>
          <h1 class='logo'><img src='/logo.svg'></h1>
          <form class='input__field search__field' role='search' aria-label='사이트 검색'>
            <label for='inputSearch' class='a11y'>검색</label>
            <input type='search' class='input input--search' id='inputSearch' placeholder='검색어를 입력하세요'
            aria-label='검색어를 입력하세요'>
            <button type='submit' class='button button--ratio button--lg' aria-label='검색'>
            <span class='icon icon--search primary--text'></span>
            </button>
          </form>
          <div class='button__set'>
            <button type='button' class='button button--ratio button--sm'><span class='icon icon--location'></span></button>
            <button type='button' class='button button--ratio button--sm'><span class='icon icon--favorite'></span></button>
            <button type='button' class='button button--ratio button--sm'><span class='icon icon--cart'></span></button>
          </div>
        </div>
        <div class='header__utils'>
          <ul class='list__link'>
            <li><a href='/src/pages/register.html' class='primary--text'>회원가입</a></li>
            <li aria-hidden='true'>
              <hr />
            </li>
            <li><a href='/src/pages/login.html'>로그인</a></li>
            <li aria-hidden='true'>
              <hr />
            </li>
            <li><a href='/'>고객센터<span class='icon icon--triangle--bottom' aria-hidden='true'></span></a></li>
          </ul>
        </div>
        <div class='header__nav'>
          <div class="nav__category">
            <button type="button" aria-haspopup="true" aria-expanded="false"><span class='icon icon--menu'></span>카테고리</button>
            <ul class='category__menu' aria-label="카테고리 메뉴" aria-hidden='true'>
              <li><a href="/src/pages/product.html">식품</a></li>
              <li><a href="/src/pages/product.html">생필품</a></li>
              <li><a href="/src/pages/product.html">케어용품</a></li>
              <li><a href="/src/pages/product.html">반려동물</a></li>
            </ul>
          </div>
          <nav class='nav__menu'>
            <ul>
              <li><a href="/src/pages/product.html">신상품</a></li>
              <li><a href="/src/pages/product.html">베스트</a></li>
              <li><a href="/src/pages/product.html">알뜰쇼핑</a></li>
              <li><a href="/src/pages/product.html">특가/혜택</a></li>
            </ul>
          </nav>
          <button type='button' class='nav__info'><b>샛별·낮</b>배송안내</button>
        </div>
      </header>
    `;
  }
}

customElements.define('c-header', Header);
