/* --------------------------------- 정규 표현식 --------------------------------- */
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

// chars (특수문자와 공백)
export function charsReg(text) {
  const re = /[\W\s]/;
  return re.test(String(text));
}