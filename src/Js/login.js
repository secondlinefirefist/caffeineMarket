//인풋 내용 검사 후 로그인 버튼 활성화
const loginInput = document.querySelector('#email');
const pwInput = document.querySelector('#password');
const loginButton = document.querySelector('.login-button');
//const loginInput = document.querySelector('.login');

let checkLoginInput = false;
let checkpwInput = false;
// const checkInputValue = () => (event, checkValue) => {
//   if (event.target.value) {
//     checkValue = true;
//   }
//   return checkValue
// }

const checkLoginInputValue = (event) => {
    if (event.target.value !== '') {
    checkLoginInput = true;
    } else checkLoginInput = false;
    showButton();
}

const checkpwInputValue = (event) => {
    if (event.target.value !== '') {
      checkpwInput = true;
    } else checkpwInput = false;
    showButton();
}

const showButton = () => {
  if(checkLoginInput === true && checkpwInput === true) {
    loginButton.classList.add('focus')
  } else loginButton.classList.remove('focus')
}

loginInput.addEventListener('input', checkLoginInputValue);
pwInput.addEventListener('input', checkpwInputValue);