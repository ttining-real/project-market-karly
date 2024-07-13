
import styles from '/src/styles/style.scss?inline' ;

console.log(styles);


class Footer extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });

    this.shadowRoot.innerHTML = `
      <style rel='stylesheet'>${styles}</style>
      <footer class='footer'>
        <section class='footer__infos'>
          <!-- 고객행복센터 -->
          <article class='footer__customer'>
            <header class='customer__header'>
              <h4 class='header__title'>고객행복센터</h4>
              <div class='header__desc'>
                <span>월~토요일 오전 7시 - 오후 6시</span>
                <a href='tel:+1644-1107'>1644-1107</a>
              </div>
            </header>
            <ul class='customer__menu'>
              <li>
                <button type='button' class='button button--md button--sharp'>카카오톡 문의</button>
                <div>
                  <p>월~토요일<span class='divide' aria-hidden='true'></span>오전 7시 - 오후 6시</p>
                  <p>일/공휴일<span class='divide' aria-hidden='true'></span>오전 7시 - 오후 1시</span></p>
                </div>
              </li>
              <li>
                <button type='button' class='button button--md button--sharp'>1:1 문의</button>
                <div>
                  <p>365일</p>
                  <p>고객센터 운영시간에 순차적으로 답변드리겠습니다.</span></p>
                </div>
              </li>
              <li>
                <button type='button' class='button button--md button--sharp'>1:1 문의</button>
                <div>
                  <p>월~금요일<span class='divide' aria-hidden='true'></span>오전 9시 - 오후 6시</p>
                  <p>점심시간<span class='divide' aria-hidden='true'></span>낮 12시 - 오후 1시</span></p>
                </div>
              </li>
            </ul>
            <ul class='customer__non_member'>
              <li>비회원 문의 : <a href='mailto:help@karlycorp.com'>help@karlycorp.com</a></li>
              <li>비회원 대량주문 문의 : <a href='mailto:help@karlycorp.com'>help@karlycorp.com</a></li>
            </ul>
          </article>
          <!-- 마켓칼리 정보 -->
          <article class='footer__about'>
            <header class='a11y'>마켓칼리 정보</header>
            <div class='about__body'>
              <ul class='about__body-karly'>
                <li><a href='/'>칼리소개</a></li>
                <li><a href='/'>칼리소개영상</a></li>
                <li><a href='/'>투자정보</a></li>
                <li><a href='/'>인재채용</a></li>
                <li><a href='/'>이용약관</a></li>
                <li><a href='/'>개인정보처리방침</a></li>
                <li><a href='/'>이용안내</a></li>
              </ul>
              <div class='about__body-details'>
                <p>법인명 (상호): 주식회사 칼리<span class='divide' aria-hidden='true'></span>사업자등록번호 : 261-81-23567<span class='divide' aria-hidden='true'></span>사업자정보 확인</p>
                <p>통신판매업 : 제 2018-서울강남-01646 호<span class='divide' aria-hidden='true'></span>개인정보보호책임자 : 이원준</p>
                <p>주소 : 서울특별시 강남구 테헤란로 133, 18층(역삼동)<span class='divide' aria-hidden='true'></span>대표이사 : 김슬아</p>
                <p>입점문의 : 입정문의하기<span class='divide' aria-hidden='true'></span>제휴문의 : business@karlycorp.com</p>
                <p>채용문의 : recruit@karlycorp.com</p>
                <p>팩스 : 070 - 7500 - 6098</p>
              </div>
              <ul class='about__body-sns'>
                <li><a href='/'><img src='/src/assets/icons/icon-blog.png' alt='블로그 바로가기' /></a></li>
                <li><a href='/'><img src='/src/assets/icons/icon-facebook.png' alt='페이스북 바로가기' /></a></li>
                <li><a href='/'><img src='/src/assets/icons/icon-instagram.png' alt='인스타그램 바로가기' /></a></li>
                <li><a href='/'><img src='/src/assets/icons/icon-naver-post.png' alt='네이버 포스트 바로가기' /></a></li>
                <li><a href='/'><img src='/src/assets/icons/icon-youtube.png' alt='유튜브 바로가기' /></a></li>
              </ul>
            </div>
          </article>

        </section>
        <!-- 인증 및 보안 정보 -->
        <section class='footer__certification'>
          <header class='a11y'>인증</header>
          <ul class='certification__body'>
            <li>
              <button type='button'>
                <img src='/src/assets/icons/logo_isms.png' alt='' />
                <p>[인증범위] 마켓칼리 쇼핑몰 서비스 개발 운영<br>(심사받지 않은 물리적 인프라 제외)<br>[유효기간] 2022.01.19 ~ 2025.01.18</p>
              </button>
            </li>
            <li>
              <button type='button'>
                <img src='/src/assets/icons/logo_privacy.png' alt='' />
                <p>개인정보보호 우수 웹사이트<br>개인정보처리시스템 인증 (ePRIVACY PLUS)</p>
              </button>
            </li>
            <li>
              <button type='button'>
                <img src='/src/assets/icons/logo_tosspayments.png' alt='' />
                <p>토스페이먼츠 구매안전(에스크로) 서비스를 이용하실 수 있습니다.</p>
              </button>
            </li>
            <li>
              <button type='button'>
                <img src='/src/assets/icons/logo_wooriBank.png' alt='' />
                <p>고객님이 현금으로 결제한 금액에 대해 우리은행과 채무지급보증 계약을 체결하여 안전거래를 보장하고 있습니다.</p>
              </button>
            </li>
          </ul>
        </section>
        <!-- 면책 조항 -->
        <section class='footer__disclaimer'>
          <header class='a11y'>면책 조항</header>
          <div class='disclaimer__body'>
            <p>마켓컬리에서 판매되는 상품 중에는 마켓컬리에 입점한 개별 판매자가 판매하는 마켓플레이스(오픈마켓) 상품이 포함되어 있습니다.<br>마켓플레이스(오픈마켓) 상품의 경우 컬리는 통신판매중개자로서 통신판매의 당사자가 아닙니다. 컬리는 해당 상품의 주문, 품질, 교환/환불 등 의무와 책임을 부담하지 않습니다.</p>
            <p class='copyright'>&copy; KURLY CORP. ALL RIGHTS RESERVED</p>
          </div>
        </section>
      </footer>
    `;
  }
}

customElements.define('c-footer', Footer);
