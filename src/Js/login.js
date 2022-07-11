const $emailInput = document.querySelector('#email');
const $pwInput = document.querySelector('#password');
const $loginButton = document.querySelector('.login-button');
const $errorMessage = document.querySelector('.error-message');

let checkemailInput = false;
let checkpwInput = false;

const checkEmailInputValue = (event) => {
  if (event.target.value !== '') {
    checkemailInput = true;
  } else checkemailInput = false;
  showButton();
};

const checkpwInputValue = (event) => {
  if (event.target.value !== '') {
    checkpwInput = true;
  } else checkpwInput = false;
  showButton();
};

const showButton = () => {
  if (checkemailInput === true && checkpwInput === true) {
    $loginButton.classList.add('focus');
  } else {
    $loginButton.classList.remove('focus');
  }
};

$emailInput.addEventListener('input', checkEmailInputValue);
$pwInput.addEventListener('input', checkpwInputValue);
$loginButton.addEventListener('click', loginData);

// 로그인 데이터 요청
const url = 'https://mandarin.api.weniv.co.kr';
const createP = document.createElement('p');
const createText = document.createTextNode('이거 안맞음');

async function loginData() {
  try {
    const res = await fetch(url + '/user/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: {
          email: $emailInput.value,
          password: $pwInput.value,
        },
      }),
    });
    const resJson = await res.json();
    console.log(resJson);
    isLogin(resJson);
  } catch (err) {
    console.error(err);
  }
}

//로그인 체크 로직
function isLogin(resJson) {
  resJson.hasOwnProperty('user') ? isLoginTrue() : isLoginFalse();
}

//로그인 성공 시
function isLoginTrue() {
  location.href = './search.html';
}

//로그인 실패 시 알람 문구 출력
function isLoginFalse() {
  $errorMessage.classList.remove('display-none');
}
