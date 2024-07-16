import '@/styles/style.scss';
import '@/layout/header/header.js';
import '@/layout/footer/footer.js';
import pb from '@/api/pocketbase';
import modalHandle from '@/lib/modal.js';
import { idReg, pwReg, charsReg } from '@/lib/regExp.js';
import { getNode, getStorage, setStorage } from 'kind-tiger';

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

async function handleLogin(e) {
  e.preventDefault();

  const username = idCheck.value;
  const password = pwCheck.value;

  if (idCheckPass && pwCheckPass) {
    pb.collection('users')
      .authWithPassword(username, password)
      .then(
        async () => {
          const { model, token } = await getStorage('pocketbase_auth');

          setStorage('auth', {
            isAuth: !!model,
            user: model,
            token,
          });

          modalHandle('.modal', 'is--open', open);
        },
        () => {
          modalHandle('.modal', 'is--open', open);
          const modal = getNode('.modal');
          const modalButton = getNode('.button--confirm');
          const modalText = getNode('.modal__content p');

          modalText.innerHTML = '인증된 사용자가 아닙니다.<br>다시 시도해주세요.';
          modalButton.addEventListener('click', function () {
            modal.remove();
            location.reload();
          });
        }
      );
  }
}

const modalButton = getNode('.button--confirm');

modalButton.addEventListener('click', function () {
  modalHandle('.modal', 'is--open', close);
  location.href = '/';
});

idCheck.addEventListener('input', handleIdCheck);
pwCheck.addEventListener('input', handlePwCheck);
loginButton.addEventListener('click', handleLogin);
