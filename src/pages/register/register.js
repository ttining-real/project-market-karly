import '@/styles/style.scss';
import '@/layout/header/header.js';
import '@/layout/footer/footer.js';
import pb from '@/api/pocketbase';
import modalHandle from '@/lib/modal.js';
import sample6_execDaumPostcode from '@/pages/cart/kakaoAddressApi.js';
import { idReg, pwReg, charsReg, emailReg, nameReg } from '@/lib/regExp.js';
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

  let idCheckPass = false;
  let pwCheckPass = false;
  let pwConfirmPass = false;
  let nameCheckPass = false;
  let emailCheckPass = false;
  let agreeAllPass = false;

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
    console.log('username:', username);

    try {
      const response = await pb
        .collection('users')
        .getList(1, 1, { filter: `username='${username}'` });
      const users = response.items;
      console.log(users);

      if (users.length > 0) {
        console.log('이미 있음');
      } else {
        console.log('사용 가능');
      }
    } catch (error) {
      console.error('에러 발생');
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
      emailCheckButton.disabled = false;
    } else {
      this.classList.add('is--invalid');
      emailCheckPass = false;
    }
  }

  // ![BugFix] 이메일 중복 확인 기능 안됨
  // async function handleEmailDuplicate() {
  //   const email = emailCheck.value;

  //   try {
  //     // API 호출
  //     const response = await fetch(
  //       `${pb}/collections/users/records?filter=(email='${email}')`
  //     );
  //     const data = await response.json();

  //     // console.log(data);

  //     if (data.items && data.items.length > 0) {
  //       alert('이메일이 이미 존재합니다.');
  //     } else {
  //       alert('이메일을 사용할 수 있습니다.');
  //     }
  //   } catch (error) {
  //     console.error('Error:', error);
  //     alert('중복 확인 중 오류가 발생했습니다.');
  //   }
  // }

  // 휴대폰
  const phoneCheckButton = $('#phoneCheckButton');
  let phoneCheckPass = false;

  function handlePhoneCheck() {
    const value = this.value;
    const hint = this.nextElementSibling;

    if (charsReg(value)) {
      this.classList.add('is--invalid');
      hint.textContent = '숫자만 입력해야 합니다.';
      phoneCheckPass = false;
    } else {
      this.classList.remove('is--invalid');
      phoneCheckButton.disabled = false;
      phoneCheckPass = true;
    }
  }

  phoneCheck.addEventListener('input', handlePhoneCheck);

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
    // const currentAddress = addressCheck.value;
    const inputAddress = document.querySelectorAll(
      '.modal__address__content input[type="text"]'
    );

    addressCheck.value = '';
    for (let i = 1; i < inputAddress.length; i++) {
      addressCheck.value += inputAddress[i].value + ' ';
      addressCheck.classList.remove('is--invalid');
    }
    modalHandle('.modal__address', 'is--open', close);
  });

  // 성별
  // 성별 선택 요소 가져오기
  const genderButton = document.querySelectorAll('.genderButton');
  let genderValue = '';

  genderButton.forEach((item) => {
    item.addEventListener('click', function () {
      this.querySelector('input').checked = true;
      genderValue = this.querySelector('input').value;
      console.log(genderValue);
    });
  });

  // 생년월일

  /* ------------------------------- 이용약관 전체 동의 ------------------------------- */
  const agreeList = $('.agree_list');
  const agreeAll = agreeList.querySelector('#agreeAll'); // 전체 선택
  const agreeCheck = agreeList.querySelectorAll('.checkbox-list'); // 개별 체크박스

  function handleAgreeAll() {
    if (agreeAll.checked) {
      agreeAll.checked = true;
      agreeCheck.forEach((item) => {
        item.checked = true;
      });
      agreeAllPass = true;
    } else {
      agreeAll.checked = false;
      agreeCheck.forEach((item) => {
        item.checked = false;
      });
      agreeAllPass = false;
    }
  }

  function handleAgreeCheck() {
    const allChecked = Array.from(agreeCheck).every(
      (checkbox) => checkbox.checked
    );
    agreeAll.checked = allChecked;
    agreeAllPass = allChecked;
  }

  // 아이디 && 비밀번호 && 비밀번호 확인 && 이름 && 이메일 && 이용약관
  function checkAllFields() {
    if (
      idCheckPass &&
      pwCheckPass &&
      pwConfirmPass &&
      nameCheckPass &&
      emailCheckPass &&
      agreeAllPass
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
      phone: phoneCheck.value,
      address: addressCheck.value,
      gender: genderValue,
      birth: birthCheck.value,
    };

    console.log(data);

    pb.collection('users')
      .create(data)
      .then(() => {
        const modal = $('.modal');
        const modalButton = $('.button--confirm');
        modalHandle('.modal', 'is--open', open);
        modalButton.addEventListener('click', function () {
          modal.remove();
          location.href = '/src/pages/login/login.html';
        });
      })
      .catch(() => {
        modalHandle('.modal', 'is--open', open);

        const modal = $('.modal');
        const modalButton = $('.button--confirm');
        const modalTitle = $('.modal__title');
        const modalText = $('.modal__content');

        modalTitle.textContent = '사용할 수 없는 정보입니다.';
        modalText.textContent = '다시 입력해주세요.';
        modalButton.addEventListener('click', function () {
          modal.remove();
          location.reload();
        });
      });
  }

  const modalButton = $('.button--confirm');

  modalButton.addEventListener('click', function () {
    modalHandle('.modal', 'is--open', close);
    location.href = '/';
  });

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
  // emailCheckButton.addEventListener('click', handleEmailDuplicate);

  agreeAll.addEventListener('click', function () {
    handleAgreeAll.call(this);
    checkAllFields();
  });
  agreeCheck.forEach((checkbox) => {
    checkbox.addEventListener('change', function () {
      handleAgreeCheck.call(this);
      checkAllFields();
    });
  });
  handleAgreeCheck();
}

register();
