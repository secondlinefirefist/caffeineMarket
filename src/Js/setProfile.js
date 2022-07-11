// 구현 사항
// 1. 계정 아이디 중복 확인
// 2. 사용자 이름

//인풋 내용 검사 후 로그인 버튼 활성화 login.js 와 겹침 나중에 합치기
const $userNameInput = document.querySelector('#userName');
const $userIdInput = document.querySelector('#userId');
const $introInput = document.querySelector('#intro');
const $loginButton = document.querySelector('.login-button');

let checkUserNamInput = false;
let checkUserIdInput = false;
let checkIntroIdInput = false;

const checkUserNamInputValue = (event) => {
    if (event.target.value !== '') {
    checkUserNamInput = true;
    } else checkUserNamInput = false;
    showButton();
}

const checkUserIdInputValue = (event) => {
    if (event.target.value !== '') {
      checkUserIdInput = true;
    } else checkUserIdInput = false;
    showButton();
}

const introInputValue = (event) => {
    if (event.target.value !== '') {
      checkIntroIdInput = true;
    } else checkIntroIdInput = false;
    showButton();
}

const showButton = () => {
  if(checkUserNamInput === true && checkUserIdInput === true && checkIntroIdInput === true) {
    $loginButton.classList.add('focus')
  } else {
    $loginButton.classList.remove('focus')
  }
}

$userNameInput.addEventListener('input', checkUserNamInputValue);
$userIdInput.addEventListener('input', checkUserIdInputValue);
$introInput.addEventListener('input', introInputValue);