import pb from '@/api/pocketbase';
import { getNode } from 'kind-tiger';

let isIdValid = false;
let isPwValid = false;
let isPwCheckValid = false;
let isNameValid = false;
let isAgreeValid = false;

function register() {
  const registerButton = document.querySelector('.join-us');

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

  function nameReg(text) {
    const re = /^[가-힣]{2,}$/;
    return re.test(String(text).toLowerCase());
  }

  /* ------------------------------- 아이디 ------------------------------- */
  const userId = getNode('#userId');
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
    isIdValid = true;
    registerState();
  }

  userId.addEventListener('input', handleIdCheck);

  /* -------------------------------- 아이디 중복 확인 ------------------------------- */

  /* ------------------------------- 비밀번호 ------------------------------ */

  const userPw = getNode('#userPw');
  let pwCheckPass = false;

  function handlePwCheck() {
    const value = this.value;

    if (pwReg(value)) {
      this.classList.remove('is--invalid');
      pwCheckPass = true;
    } else {
      this.classList.add('is--invalid');
      pwCheckPass = false;
    }
    isPwValid = true;
    registerState();
  }

  userPw.addEventListener('input', handlePwCheck);

  /* --------------------------------- 비밀번호 확인 -------------------------------- */
  const userPwCheck = getNode('#userPwCheck');
  let pwConfirmPass = false;

  function handlePwConfirm() {
    const value = this.value;

    if (pwReg(value) === pwReg(userPw.value)) {
      this.classList.remove('is--invalid');
      pwConfirmPass = true;
    } else {
      this.classList.add('is--invalid');
      pwConfirmPass = false;
    }
    isPwCheckValid = true;
    registerState();
  }

  userPwCheck.addEventListener('input', handlePwConfirm);

  /* -------------------------------- 이름 유효성 검사 ------------------------------- */
  const userName = getNode('#userName');
  let nameCheckPass = false;

  function handleNameCheck() {
    const value = this.value;

    if (nameReg(value)) {
      this.classList.remove('is--invalid');
      nameCheckPass = true;
    } else {
      this.classList.add('is--invalid');
      nameCheckPass = false;
    }
    isNameValid = true;
    registerState();
  }

  userName.addEventListener('input', handleNameCheck);

  /* ------------------------------- 이용약관 전체 동의 ------------------------------- */
  const agreeList = getNode('.agree_list');
  const agreeAll = agreeList.querySelector('#agreeAll');
  const agreeCheck = agreeList.querySelectorAll('.checkbox-list');

  function handleAgreeAll() {
    if (agreeAll.checked) {
      agreeCheck.forEach((item) => {
        item.checked = true;
      });
    } else {
      agreeCheck.forEach((item) => {
        item.checked = false;
      });
    }
    isAgreeValid = true;
    registerState();
  }

  function handleAgreeCheck() {
    const allChecked = Array.from(agreeCheck).every((item) => item.checked);
    agreeAll.checked = allChecked;
    isAgreeValid = true;
    registerState();
  }

  agreeAll.addEventListener('input', handleAgreeAll);
  agreeCheck.forEach((item) => {
    item.addEventListener('input', handleAgreeCheck);
  });

  function registerState() {
    if (
      isIdValid &&
      isPwValid &&
      isPwCheckValid &&
      isNameValid &&
      isAgreeValid
    ) {
      registerButton.disabled = false;
    } else {
      registerButton.disabled = true;
    }
  }

  registerButton.addEventListener('click', () => {
    const email = userId.value;
    const password = userPw.value;
    const passwordConfirm = password;
    const name = userName.value;

    pb.collection('users').create({ email, password, passwordConfirm, name })
    .then(()=>{
      
      alert('🎉 회원 가입이 완료됐습니다! 🎉 로그인 페이지로 이동합니다!');
      location.href = '/src/pages/login/login.html'

    })
    .catch(()=>{
        alert('동일한 이메일이 존재합니다.');
    })
  });
}

register();
