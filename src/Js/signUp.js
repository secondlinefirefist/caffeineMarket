//인풋 내용 검사 후 로그인 버튼 활성화 login.js 와 겹침 나중에 합치기
const $emailInput = document.querySelector('#email');
const $pwInput = document.querySelector('#password');
const $loginButton = document.querySelector('.login-button');
//const emailInput = document.querySelector('.login');

let checkemailInput = false;
let checkpwInput = false;
// const checkInputValue = () => (event, checkValue) => {
//   if (event.target.value) {
//     checkValue = true;
//   }
//   return checkValue
// }

const checkEmailInputValue = (event) => {
    if (event.target.value !== '') {
    checkemailInput = true;
    } else checkemailInput = false;
    showButton();
}

const checkpwInputValue = (event) => {
    if (event.target.value !== '') {
      checkpwInput = true;
    } else checkpwInput = false;
    showButton();
}

const showButton = () => {
  if(checkemailInput === true && checkpwInput === true) {
    $loginButton.classList.add('focus')
  } else {
    $loginButton.classList.remove('focus')
  }
}

$emailInput.addEventListener('input', checkEmailInputValue);
$pwInput.addEventListener('input', checkpwInputValue);
