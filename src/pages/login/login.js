import pb from '@/api/pocketbase';
import { getNode, getStorage, setStorage } from 'kind-tiger';

/* --------------------------------- 정규 표현식 --------------------------------- */
function emailReg(text) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return re.test(String(text).toLowerCase());
}

function pwReg(text) {
  const re = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^*+=-]).{6,16}$/;
  return re.test(String(text).toLowerCase());
}

/* ------------------------------- 아이디 유효성 검사 ------------------------------- */
const loginId = getNode('#loginId');
let idCheckPass = false;

function handleIdCheck() {
  const value = this.value;

  if (emailReg(value)) {
    this.classList.remove('is--invalid');
    idCheckPass = true;
  } else {
    this.classList.add('is--invalid');
    idCheckPass = false;
  }
}

loginId.addEventListener('input', handleIdCheck);

/* ------------------------------- 비밀번호 유효성 검사 ------------------------------ */
const loginPw = getNode('#loginPw');
let pwCheckPass = false;

function handlePwCheck() {
  const value = this.value;
  console.log(value);

  if (pwReg(value)) {
    this.classList.remove('is--invalid');
    pwCheckPass = true;
    loginButton.disabled = false;
  } else {
    this.classList.add('is--invalid');
    pwCheckPass = false;
  }
}

loginPw.addEventListener('input', handlePwCheck);

/* ------------------------------- 로그인 버튼 클릭 시 ------------------------------ */
const loginButton = getNode('.login_button');

function handleLogin(e) {
  e.preventDefault();

  const id = getNode('#loginId').value;
  const pw = getNode('#loginPw').value;

  if (pwCheckPass && pwCheckPass) {
    pb.collection('users')
      .authWithPassword(id, pw)
      .then(
        async () => {
          const { model, token } = await getStorage('pocketbase_auth');

          setStorage('auth', {
            isAuth: !!model,
            user: model,
            token: token,
          });

          alert('로그인 성공! 메인페이지로 이동');
          location.href = '/index.html';
        },
        () => {
          alert('인증된 사용자가 아닙니다.');
        }
      );
  }
}

loginButton.addEventListener('click', handleLogin);
