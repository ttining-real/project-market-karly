import pb from '@/api/pocketbase';
import { getNode, getStorage, setStorage } from 'kind-tiger';
import { idReg, pwReg, charsReg } from '@/lib/regExp.js';

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

  updateLoginState();
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

  updateLoginState();
}

function updateLoginState() {
  if (idCheckPass && pwCheckPass) {
    loginButton.disabled = false;
  } else {
    loginButton.disabled = true;
  }
}

function handleLogin(e) {
  e.preventDefault();

  const id = idCheck.value;
  const pw = pwCheck.value;

  console.log(pb.authStore.isValid);
  console.log(pb.authStore.token);
  console.log(pb.authStore.model.id);
  console.log(pb.authStore.userId);

  if (idCheckPass && pwCheckPass) {
    pb.collection('users')
      .authWithPassword({ userId: id, password: pw })
      .then(
        async () => {
          const { model, token } = await getStorage('pocketbase_auth');

          setStorage('auth', {
            isAuth: !!model,
            user: model,
            token,
          });

          alert('로그인 완료! 메인 페이지로 이동합니다.');
          location.href = '/';
        },
        () => {
          alert('인증된 사용자가 아닙니다.');
        }
      );
  }
}

idCheck.addEventListener('input', handleIdCheck);
pwCheck.addEventListener('input', handlePwCheck);
loginButton.addEventListener('click', handleLogin);
