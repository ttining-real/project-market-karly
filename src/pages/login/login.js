import pb from '@/api/pocketbase';
import { getNode, getStorage, setStorage } from 'kind-tiger';

/* --------------------------------- 정규 표현식 --------------------------------- */
function idReg(text) {
  const re = /^[a-zA-Z0-9]{4,20}$/;
  return re.test(String(text).toLowerCase());
}

function pwReg(text) {
  const re = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^*+=-]).{6,16}$/;
  return re.test(String(text).toLowerCase());
}

function charsReg(text) {
  const re = /[\W\s]/;
  return re.test(String(text));
}

const idCheck = getNode('#idField');
const pwCheck = getNode('#pwField');
const loginButton = getNode('#loginButton');
let idCheckPass = false;
let pwCheckPass = false;

function handleIdCheck() {
  const value = this.value;
  const hint = this.nextElementSibling;

  if (idReg(value)) {
    this.classList.remove('is--invalid');
    idCheckPass = true;
  } else if (charsReg(value)) {
    this.classList.add('is--invalid');
    hint.textContent = '아이디는 특수문자와 공백을 포함할 수 없습니다.';
    idCheckPass = false;
  } else {
    this.classList.add('is--invalid');
    hint.textContent =
      '아이디는 4자 이상 20자 이하의 영문과 숫자를 포함해야 합니다.';
    idCheckPass = false;
  }
}

function handlePwCheck() {
  const value = this.value;
  if (pwReg(value)) {
    this.classList.remove('is--invalid');
    pwCheckPass = true;
  } else {
    this.classList.add('is--invalid');
    pwCheckPass = false;
  }
}

if (idCheckPass && pwCheckPass) {
  loginButton.disabled = false;
}

function handleLogin(e) {
  e.preventDefault();

  const id = idCheck.value;
  const pw = pwCheck.value;

  pb.collection('users')
    .authWithPassword(id, pw)
    .then(
      async () => {
        const { model, token } = await getStorage('pocketbase_auth');

        setStorage('auth', {
          isAuth: !!model,
          user: model,
          token,
        });

        alert('로그인 완료! 메인 페이지로 이동합니다.');
        location.href = '/index.html';
      },
      () => {
        alert('인증된 사용자가 아닙니다.');
      }
    );
}

idCheck.addEventListener('input', handleIdCheck);
pwCheck.addEventListener('input', handlePwCheck);
loginButton.addEventListener('click', handleLogin);

/* ------------------------------- 로그인 버튼 클릭 시 ------------------------------ */
// const loginButton = getNode('.login_button');

// function handleLogin(e) {
//   e.preventDefault();

//   const id = getNode('#loginId').value;
//   const pw = getNode('#loginPw').value;

//   if (pwCheckPass && pwCheckPass) {
//     pb.collection('users')
//       .authWithPassword(id, pw)
//       .then(
//         async () => {
//           const { model, token } = await getStorage('pocketbase_auth');

//           setStorage('auth', {
//             isAuth: !!model,
//             user: model,
//             token: token,
//           });

//           alert('로그인 성공! 메인페이지로 이동');
//           location.href = '/index.html';
//         },
//         () => {
//           alert('인증된 사용자가 아닙니다.');
//         }
//       );
//   }
// }

// loginButton.addEventListener('click', handleLogin);
