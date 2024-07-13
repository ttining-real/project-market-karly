import pb from '@/api/pocketbase';
import defaultAuthData from '@/api/defaultAuthData';
import styles from '/src/styles/style.scss?inline';
import { getStorage, setStorage } from 'kind-tiger';

class Header extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });

    this.shadowRoot.innerHTML = /*html*/ `
      <style rel='stylesheet'>${styles}</style>
      <header class='header'>
        <div class='header__main'>
          <h1 class='logo'>
            <a href='/index.html' class='karly-market is-active'>마켓칼리</a>
            <span class='divide'></span>
            <a href='/' class='karly-beauty'>뷰티칼리</a>
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
            <li class='login-off'>
              <a href='/src/pages/login/login.html'>로그인</a>
            </li>
            <li aria-hidden='true'>
              <hr />
            </li>
            <li><a href='/src/pages/login/login.html'>고객센터</a></li>
          </ul>
        </div>
        <div class='header__nav'>
          <div class='nav__category'>
            <button type='button' class='category__button' aria-haspopup='true' aria-expanded='false'><span class='icon icon--menu'></span>카테고리</button>
            <ul class='category__menu' aria-label='카테고리 메뉴' aria-hidden='true'>
              <li><a href='/src/pages/product/product.html'><span class='menu-food'></span>식품</a></li>
              <li><a href='/src/pages/product/product.html'><span class='menu-necessity'></span>생필품</a></li>
              <li><a href='/src/pages/product/product.html'><span class='menu-personalcare'></span>케어용품</a></li>
              <li><a href='/src/pages/product/product.html'><span class='menu-animal'></span>반려동물</a></li>
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

    this.logout();
  }

  /* ---------------------------------- 로그아웃 ---------------------------------- */
  async logout() {
    if (localStorage.getItem('auth')) {
      const { isAuth, user } = await getStorage('auth');

      if (isAuth) {
        const utils = this.shadowRoot.querySelector('.header__utils');

        if (utils) {
          const template = `
            <ul class='list__link'>
              <li class='login-on'>
                <a href='/src/pages/login/login.html' class='login'>${user.username}님 반갑습니다!</a>
                <div class='user__option'>
                  <button type="button" class='logout'>로그아웃</button>
                  <button type="button" class='user-delete'>회원탈퇴</button>
                </div>
              </li>
              <li aria-hidden='true'>
                <hr />
              </li>
              <li><a href='/src/pages/login/login.html'>고객센터<span class='icon icon--triangle--bottom' aria-hidden='true'></span></a></li>
            </ul>
          `;
          utils.innerHTML = template;

          const logout = this.shadowRoot.querySelector('.logout');

          function handleLogout() {
            if (confirm('로그아웃 하시겠습니까?')) {
              pb.authStore.clear();
              // deleteStorage('auth');
              setStorage('auth', defaultAuthData);
              location.reload();
            }
          }

          logout.addEventListener('click', handleLogout);
        }
      }
    }
  }
}

customElements.define('c-header', Header);
