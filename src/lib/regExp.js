/* --------------------------------- 정규 표현식 --------------------------------- */
// chars (특수문자와 공백)
export function charsReg(text) {
  const re = /[\W\s]/;
  return re.test(String(text));
}

// idField (최소 4자 ~ 최대 20자, 영문과 숫자를 포함)
export function idReg(text) {
  const re = /^[a-zA-Z0-9]{4,20}$/;
  return re.test(String(text).toLowerCase());
}

// pwField (특수문자 포함 최소 6자 ~ 최대 16자)
export function pwReg(text) {
  const re = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^*+=-]).{6,16}$/;
  return re.test(String(text).toLowerCase());
}

// nameField (최소 2자 ~ 최대 18자의 한글)
export function nameReg(text) {
  const re = /^[가-힣]{2,18}$/;
  return re.test(String(text));
}

// emailField (@이 포함되어야 함)
export function emailReg(text) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(text).toLowerCase());
}
