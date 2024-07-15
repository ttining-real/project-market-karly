import pb from '@/api/pocketbase';
import { getNode } from 'kind-tiger';
import { idReg, pwReg, charsReg, emailReg, nameReg } from '@/lib/regExp.js';

const idCheck = getNode('#idField');
const pwCheck = getNode('#pwField');
const pwConfirm = getNode('#pwConfirm');
const nameCheck = getNode('#nameField');
const emailCheck = getNode('#emailField');

const registerButton = getNode('#registerButton');
const idCheckButton = getNode('#idCheckButton');

let idCheckPass = false;
let pwCheckPass = false;
let pwConfirmPass = false;
let nameCheckPass = false;
let emailCheckPass = false;

// 아이디
function handleIdCheck() {
  const value = this.value;
  const hint = this.nextElementSibling;

  if (idReg(value)) {
    this.classList.remove('is--invalid');
    idCheckButton.disabled = false;
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

// ![BugFix] 아이디 중복 확인 기능 안됨
async function handleIdDuplicate() {
  const username = idCheck.value;

  try {
    // API 호출
    const response = await fetch(
      `${pb}/collections/users/records?filter=(username='${username}')`
    );
    const data = await response.json();

    // console.log(data);

    if (data.items && data.items.length > 0) {
      alert('아이디가 이미 존재합니다.');
    } else {
      alert('아이디를 사용할 수 있습니다.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('중복 확인 중 오류가 발생했습니다.');
  }
}

// 비밀번호
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

// 비밀번호 확인
function handlePwConfirm() {
  const value = this.value;
  const hint = this.nextElementSibling;

  if (pwReg(value) === pwReg(pwCheck.value)) {
    this.classList.remove('is--invalid');
    pwConfirmPass = true;
  } else {
    this.classList.add('is--invalid');
    hint.textContent = '비밀번호가 일치하지 않습니다.';
    pwConfirmPass = false;
  }
}

// 이름
function handleNameCheck() {
  const value = this.value;
  if (nameReg(value)) {
    this.classList.remove('is--invalid');
    nameCheckPass = true;
  } else {
    this.classList.add('is--invalid');
    nameCheckPass = false;
  }
}

// 이메일
function handleEmailCheck() {
  const value = this.value;

  if (emailReg(value)) {
    this.classList.remove('is--invalid');
    emailCheckPass = true;
  } else {
    this.classList.add('is--invalid');
    emailCheckPass = false;
  }
}


// ![BugFix] 이메일 중복 확인 기능

// 아이디 && 비밀번호 && 비밀번호 확인 && 이름 && 이메일
function checkAllFields() {
  if (
    idCheckPass &&
    pwCheckPass &&
    pwConfirmPass &&
    nameCheckPass &&
    emailCheckPass
  ) {
    registerButton.disabled = false;
    registerButton.removeEventListener('click', handleRegisterClick);
    registerButton.addEventListener('click', handleRegisterClick);
  } else {
    registerButton.disabled = true;
  }
}

// 회원가입 버튼
function handleRegisterClick() {
  const data = {
    username: idCheck.value,
    password: pwCheck.value,
    passwordConfirm: pwConfirm.value,
    name: nameCheck.value,
    email: emailCheck.value,
  };

  pb.collection('users')
    .create(data)
    .then(() => {
      alert('🎉 회원 가입이 완료됐습니다! 🎉 로그인 페이지로 이동합니다!');
      location.href = '/src/pages/login/login.html';
    })
    .catch(() => {
      alert('동일한 이메일이 존재합니다.');
    });
}

idCheck.addEventListener('input', function () {
  handleIdCheck.call(this);
  checkAllFields();
});
pwCheck.addEventListener('input', function () {
  handlePwCheck.call(this);
  checkAllFields();
});
pwConfirm.addEventListener('input', function () {
  handlePwConfirm.call(this);
  checkAllFields();
});
nameCheck.addEventListener('input', function () {
  handleNameCheck.call(this);
  checkAllFields();
});
emailCheck.addEventListener('input', function () {
  handleEmailCheck.call(this);
  checkAllFields();
});
idCheckButton.addEventListener('click', handleIdDuplicate);


/* ------------------------------- 이용약관 전체 동의 ------------------------------- */
// ![BugFix] 체크박스만 동작, 조건 처리 필요
const agreeList = getNode('.agree_list');
const agreeAll = agreeList.querySelector('#agreeAll');
const agreeCheck = agreeList.querySelectorAll('.checkbox-list');
let isIdValid = false;
let isPwValid = false;
let isPwCheckValid = false;
let isNameValid = false;
let isAgreeValid = false;

function handleAgreeAll() {
  agreeCheck.forEach((item) => {
    item.checked = agreeAll.checked;
  });
  isAgreeValid = agreeAll.checked;
  agreeCheckboxState();
}

function handleAgreeCheck() {
  const allChecked = Array.from(agreeCheck).every((item) => item.checked);
  agreeAll.checked = allChecked;
  isAgreeValid = allChecked;
  agreeCheckboxState();
}

agreeAll.addEventListener('input', handleAgreeAll);
agreeCheck.forEach((item) => {
  item.addEventListener('input', handleAgreeCheck);
});


function agreeCheckboxState() {
  const isValid = isIdValid && isPwValid && isPwCheckValid && isNameValid && isAgreeValid;
  registerButton.disabled = !isValid;
}
