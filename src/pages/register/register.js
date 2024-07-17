import '@/styles/style.scss';
import '@/layout/header/header.js';
import '@/layout/footer/footer.js';
import pb from '@/api/pocketbase';
import modalHandle from '@/lib/modal.js';
import sample6_execDaumPostcode from '@/pages/cart/kakaoAddressApi.js';
import {
  idReg,
  pwReg,
  charsReg,
  emailReg,
  nameReg,
  phoneReg,
} from '@/lib/regExp.js';
import { getNode as $ } from 'kind-tiger';

function register() {
  const idCheck = $('#idField');
  const pwCheck = $('#pwField');
  const pwConfirm = $('#pwConfirm');
  const nameCheck = $('#nameField');
  const emailCheck = $('#emailField');
  const phoneCheck = $('#phoneField');
  const addressCheck = $('#addressField');
  const birthCheck = $('#birthField');

  const registerButton = $('#registerButton');
  const idCheckButton = $('#idCheckButton');
  const emailCheckButton = $('#emailCheckButton');
  const phoneCheckButton = $('#phoneCheckButton');

  let idCheckPass = false;
  let pwCheckPass = false;
  let pwConfirmPass = false;
  let nameCheckPass = false;
  let emailCheckPass = false;
  let phoneCheckPass = false;
  let addressCheckPass = false;
  let agreeAllPass = false;

  // 아이디
  function handleIdCheck() {
    const value = this.value;
    const hint = this.nextElementSibling;

    if (idReg(value)) {
      this.classList.remove('is--invalid');
      idCheckButton.disabled = false;
    } else if (charsReg(value)) {
      this.classList.add('is--invalid');
      hint.textContent = '아이디는 특수문자와 공백을 포함할 수 없습니다.';
    } else {
      this.classList.add('is--invalid');
      hint.textContent =
        '아이디는 4자 이상 20자 이하의 영문과 숫자를 포함해야 합니다.';
    }
  }

  // 아이디 중복 확인
  async function handleIdDuplicate() {
    const username = idCheck.value;
    const modalTitle = $('.modal__title');
    const modalButton = $('.button--confirm');
    const modalText = $('.modal__content p');

    function handleModalButton() {
      modalHandle('.modal', 'is--open', close);
      modalButton.removeEventListener('click', handleModalButton);
    }

    try {
      const response = await pb
        .collection('users')
        .getList(1, 1, { filter: `username='${username}'` });
      const users = response.items;
      console.log(users);

      modalButton.removeEventListener('click', handleModalButton);

      if (users.length > 0) {
        console.log('이미 있음');
        idCheckPass = false;

        modalHandle('.modal', 'is--open', open);
        if (modalTitle) {
          modalTitle.remove();
        }
        modalText.innerHTML =
          '사용할 수 없는 아이디입니다.<br>다시 시도해주세요.';
        modalButton.addEventListener('click', handleModalButton);
      } else {
        console.log('사용 가능');
        idCheckPass = true;

        modalHandle('.modal', 'is--open', open);
        if (modalTitle) {
          modalTitle.remove();
        }
        modalText.innerHTML = '사용 가능한 아이디입니다.';
        modalButton.addEventListener('click', handleModalButton);
      }
    } catch (error) {
      console.error('에러 발생');
      idCheckPass = false;

      modalHandle('.modal', 'is--open', open);
      if (modalTitle) {
        modalTitle.remove();
      }
      modalText.innerHTML = '오류가 발생했습니다. 다시 시도해주세요.';
      modalButton.addEventListener('click', handleModalButton);
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
      emailCheckButton.disabled = false;
    } else {
      this.classList.add('is--invalid');
    }
  }

  // 이메일 중복 확인
  async function handleEmailDuplicate() {
    const email = emailCheck.value;
    console.log('email:', email);
    
    const modalTitle = $('.modal__title');
    const modalButton = $('.button--confirm');
    const modalText = $('.modal__content p');

    function handleModalButton() {
      modalHandle('.modal', 'is--open', close);
      modalButton.removeEventListener('click', handleModalButton);
    }

    try {
      const response = await pb
        .collection('users')
        .getList(1, 1, { filter: `email="${email}"` });
      const users = response.items;
      console.log(users);

      modalButton.removeEventListener('click', handleModalButton);

      if (users.length > 0) {
        console.log('이미 있음');
        emailCheckPass = false;

        modalHandle('.modal', 'is--open', open);
        if (modalTitle) {
          modalTitle.remove();
        }
        modalText.innerHTML =
          '사용할 수 없는 이메일입니다.<br>다시 시도해주세요.';
        modalButton.addEventListener('click', handleModalButton);
      } else {
        console.log('사용 가능');
        emailCheckPass = true;

        modalHandle('.modal', 'is--open', open);
        if (modalTitle) {
          modalTitle.remove();
        }
        modalText.innerHTML = '사용 가능한 이메일입니다.';
        modalButton.addEventListener('click', handleModalButton);
      }
    } catch (error) {
      console.error('에러 발생');
      emailCheckPass = false;

      modalHandle('.modal', 'is--open', open);
      if (modalTitle) {
        modalTitle.remove();
      }
      modalText.innerHTML = '오류가 발생했습니다. 다시 시도해주세요.';
      modalButton.addEventListener('click', handleModalButton);
    }
  }

  // 휴대폰
  function handlePhoneCheck(event) {
    const inputField = event.target;
    const value = inputField.value.trim();

    if (phoneReg(value)) {
      inputField.classList.remove('is--invalid');
      phoneCheckButton.disabled = false;
      phoneCheckPass = true;
    } else {
      inputField.classList.add('is--invalid');
      phoneCheckButton.disabled = true;
      phoneCheckPass = false;
    }

    let str = value.replace(/[^0-9]/g, '');
    let strPhone = '';

    if (str.length < 4) {
      strPhone = str;
    } else if (str.length < 7) {
      strPhone = str.substr(0, 3) + '-' + str.substr(3);
    } else if (str.length < 11) {
      strPhone =
        str.substr(0, 3) + '-' + str.substr(3, 3) + '-' + str.substr(6);
    } else {
      strPhone =
        str.substr(0, 3) + '-' + str.substr(3, 4) + '-' + str.substr(7);
    }

    inputField.value = strPhone;
  }

  // 주소
  const addressSearch = $('#addressButton');
  const addressModal = document.querySelector('.modal__address');
  const addressModalClose = addressModal.querySelector('.button--close');
  const postFindButton = addressModal.querySelector('.post--find');
  const addressSaveButton = addressModal.querySelector('.button--save');

  addressSearch.addEventListener('click', function () {
    modalHandle('.modal__address', 'is--open', open);
  });
  /* ---------- 배송지 변경 모달 닫기 ---------- */
  addressModalClose.addEventListener('click', function () {
    modalHandle('.modal__address', 'is--open', close);
  });

  /* ---------- 우편번호 찾기 클릭하면 주소 검색창 열기 ---------- */
  postFindButton.addEventListener('click', function () {
    sample6_execDaumPostcode();
  });

  /* ---------- 저장 버튼 클릭하면 주소 변경 ---------- */
  addressSaveButton.addEventListener('click', function () {
    const inputAddress = document.querySelectorAll(
      '.modal__address__content input[type="text"]'
    );

    addressCheck.value = '';
    for (let i = 1; i < inputAddress.length; i++) {
      addressCheck.value += inputAddress[i].value + ' ';
      addressCheck.classList.remove('is--invalid');
      addressCheckPass = true;
    }
    modalHandle('.modal__address', 'is--open', close);
  });

  // 성별
  const genderButton = document.querySelectorAll('.genderButton');
  let genderValue = '';

  genderButton.forEach((item) => {
    item.addEventListener('click', function () {
      this.querySelector('input').checked = true;
      genderValue = this.querySelector('input').value;
      console.log(genderValue);
    });
  });
  

  // 이용약관 전체 동의
  const agreeList = $('.agree_list');
  const agreeAll = agreeList.querySelector('#agreeAll'); // 전체 선택
  const agreeCheck = agreeList.querySelectorAll('.checkbox-list'); // 개별 체크박스
  const agreeCheckRequired = agreeList.querySelectorAll('.checkbox-list[required]'); // 개별 체크박스 (필수)
  
  // 이용약관 전체 동의
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
    handleAgreeCheckRequired();
  }

  // 필수 약관 체크박스
  function handleAgreeCheckRequired() {
    const allRequiredChecked = Array.from(agreeCheckRequired).every(
      (checkbox) => checkbox.checked
    );
    agreeAllPass = allRequiredChecked;
  }

  // 전체 약관 체크박스
  function handleAgreeCheck() {
    const allChecked = Array.from(agreeCheck).every(
      (checkbox) => checkbox.checked
    );
    agreeAll.checked = allChecked;
  }

  function checkAllFields() {
    if (
      idCheckPass &&
      pwCheckPass &&
      pwConfirmPass &&
      nameCheckPass &&
      emailCheckPass &&
      phoneCheckPass &&
      addressCheckPass &&
      agreeAllPass
    ) {
      registerButton.disabled = false;
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
      phone: phoneCheck.value,
      address: addressCheck.value,
      gender: genderValue,
      birth: birthCheck.value,
      emailVisibility: true,
    };

    console.log(data);

    const modalButton = $('.button--confirm');
    const modalContent = $('.modal__content');
    const modalText = $('.modal__content p');

    pb.collection('users')
      .create(data)
      .then(() => {
        modalHandle('.modal', 'is--open', open);

        if (!document.querySelector('.modal__title')) {
          const modalTitle = document.createElement('h1');
          modalTitle.className = 'modal__title';
          modalTitle.textContent = '회원 가입이 완료되었습니다.';

          modalContent.parentNode.insertBefore(modalTitle, modalContent);
        }

        modalText.textContent = '로그인 페이지로 이동합니다.';

        modalButton.addEventListener('click', function () {
          modalHandle('.modal', 'is--open', close);
          location.href = '/src/pages/login/login.html';
        });

        console.log('회원 가입 완료');
      })
      .catch(() => {
        modalHandle('.modal', 'is--open', open);

        if (!document.querySelector('.modal__title')) {
          const modalTitle = document.createElement('h1');
          modalTitle.className = 'modal__title';
          modalTitle.textContent = '사용할 수 없는 정보입니다.';

          modalContent.parentNode.insertBefore(modalTitle, modalContent);
        }

        modalText.textContent = '다시 입력해주세요.';
        console.log('회원 가입 실패');
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
  phoneCheck.addEventListener('input', function (event) {
    handlePhoneCheck(event);
    checkAllFields();
  });
  agreeAll.addEventListener('click', function () {
    handleAgreeAll.call(this);
    checkAllFields();
  });
  agreeCheck.forEach((checkbox) => {
    checkbox.addEventListener('change', function () {
      handleAgreeCheck.call(this);
      handleAgreeCheckRequired.call(this);
      checkAllFields();
    });
  });
  handleAgreeCheck();
  handleAgreeCheckRequired();

  idCheckButton.addEventListener('click', handleIdDuplicate);
  emailCheckButton.addEventListener('click', handleEmailDuplicate);
  registerButton.addEventListener('click', handleRegisterClick);
}

register();
