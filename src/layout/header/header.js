import styles from '@/styles/style.scss?inline';
import pb from '@/api/pocketbase';
import defaultAuthData from '@/api/defaultAuthData';
import modalHandle from '@/lib/modal.js';
import { getNode, getStorage, setStorage, insertLast } from 'kind-tiger';
import throttle from 'lodash/throttle'; // Lodash의 throttle 함수

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
            <li><a href='/index.html'>고객센터</a></li>
          </ul>
        </div>
        <div class='header__nav'>
          <div class='nav__category'>
            <button type='button' class='category__button' aria-haspopup='true' aria-expanded='false'><span class='icon icon--menu'></span>카테고리</button>
            <ul class='category__menu' aria-label='카테고리 메뉴' aria-hidden='true'>
              <li><a href='/src/pages/product/product.html?category=food'><span class='menu-food'></span>식품</a></li>
              <li><a href='/src/pages/product/product.html?category=necessity'><span class='menu-necessity'></span>생필품</a></li>
              <li><a href='/src/pages/product/product.html?category=personalcare'><span class='menu-personalcare'></span>케어용품</a></li>
              <li><a href='/src/pages/product/product.html?category=animal'><span class='menu-animal'></span>반려동물</a></li>
            </ul>
          </div>
          <nav class='nav__menu'>
            <ul>
            <li><a href='/src/pages/product/product.html?menu=new'><span>신상품</span></a></li>
            <li><a href='/src/pages/product/product.html?menu=best'><span>베스트</span></a></li>
            <li><a href='/src/pages/product/product.html?menu=timesale'><span>알뜰쇼핑</span></a></li>
            <li><a href='/src/pages/product/product.html?menu=benefit'><span>특가/혜택</span></a></li>
            </ul>
          </nav>
          <button type='button' class='nav__info'><b>샛별·낮</b>배송안내</button>
        </div>
      </header>
    `;

    this.logout();

    const categoryButton = this.shadowRoot.querySelector('.category__button');
    const categoryMenu = this.shadowRoot.querySelector('.category__menu');
    categoryButton.addEventListener('keydown', function (event) {
      if (event.key === 'Enter') {
        categoryMenu.classList.toggle('is--active');
      }
    });

    this.addScrollEvent();
  }


  /* --------------------------------- 스크롤 이벤트 -------------------------------- */
  addScrollEvent() {
    const header = this.shadowRoot.querySelector('.header');
    const searchButton = header.querySelector('.search__field .button');
    const setButton = header.querySelectorAll('.button__set .button');

    const handleScroll = throttle(() => {
      if (window.scrollY > 184) {
        header.classList.add('is--scrolled');
        searchButton.classList.remove('button--lg');
        searchButton.classList.add('button--xs');
        setButton.forEach(item => {
          item.classList.remove('button--md');
          item.classList.add('button--xs');
        })
      } else {
        header.classList.remove('is--scrolled');
        searchButton.classList.remove('button--xs');
        searchButton.classList.add('button--lg');
        setButton.forEach(item => {
          item.classList.remove('button--xs');
          item.classList.add('button--md');
        })
      }
    }, 100); // 100ms마다 이벤트 처리

    window.addEventListener('scroll', handleScroll);
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
                <p class='login'>${user.name}님 반갑습니다!</p>
                <div class='user__option'>
                  <button type='button' class='logout'>로그아웃</button>
                  <button type='button' class='user-delete'>회원탈퇴</button>
                </div>
              </li>
              <li aria-hidden='true'>
                <hr />
              </li>
              <li><a href='/index.html'>고객센터</a></li>
            </ul>
          `;
          utils.innerHTML = template;

          const logout = this.shadowRoot.querySelector('.logout');

          function handleLogout() {
            const template = `
              <section class='modal is--center modal__logout'>
                <div class='modal__content'>
                  <p>로그아웃 하시겠습니까?</p>
                </div>
                <div class='modal__foot'>
                  <button type='button' class='button--lg button--cancel'>취소</button>
                  <button type='button' class='button--lg button--confirm'>확인</button>
                </div>
              </section>
              <div class='overlay'></div>
            `;
            insertLast('body', template);

            modalHandle('.modal', 'is--open', open);

            const modalCancel = getNode('.button--cancel');
            const modalConfirm = getNode('.button--confirm');
            const modalLogout = getNode('.modal__logout');

            modalCancel.addEventListener('click', function () {
              modalHandle('.modal', 'is--open', close);
              modalLogout.remove();
            });
            modalConfirm.addEventListener('click', async function () {
              modalHandle('.modal', 'is--open', close);
              pb.authStore.clear();
              setStorage('auth', defaultAuthData);
              modalLogout.remove();
              location.reload();
            });
          }

          logout.addEventListener('click', handleLogout);

          const userDelete = this.shadowRoot.querySelector('.user-delete');

          async function handleUserDelete() {
            const template = `
              <section class='modal is--center modal__delete'>
                <h1 class='modal__title'>정말 탈퇴하시겠어요?</h1>
                <div class='modal__content'>
                  <p>확인 버튼 선택 시, 계정은 삭제되며<br>복구되지 않습니다.</p>
                </div>
                <div class='modal__foot'>
                  <button type='button' class='button--lg button--cancel'>취소</button>
                  <button type='button' class='button--lg button--confirm'>확인</button>
                </div>
              </section>
              <div class='overlay'></div>
            `;
            insertLast('body', template);

            modalHandle('.modal', 'is--open', open);

            const modalCancel = getNode('.button--cancel');
            const modalConfirm = getNode('.button--confirm');
            const modalDelete = getNode('.modal__delete');

            modalCancel.addEventListener('click', function () {
              modalHandle('.modal', 'is--open', close);
              modalDelete.remove();
            });
            modalConfirm.addEventListener('click', async function () {
              modalHandle('.modal', 'is--open', close);
              await pb.collection('users').delete(user.id);
              pb.authStore.clear();
              setStorage('auth', defaultAuthData);
              modalDelete.remove();
              location.reload();
            });
          }

          userDelete.addEventListener('click', handleUserDelete);
        }
      }
    }
  }
}

customElements.define('c-header', Header);
