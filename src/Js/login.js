const $emailInput = document.querySelector('#email');
const $pwInput = document.querySelector('#password');
const $loginButton = document.querySelector('.login-button');
const $errorMessage = document.querySelector('.error-message');

let checkemailInput = false;
let checkpwInput = false;

//이메일 인풋값 검사
const checkEmailInputValue = (event) => {
  event.target.value !== ''
    ? (checkemailInput = true)
    : (checkemailInput = false);
  showButton();
};

//비밀번호 인풋값 검사
const checkpwInputValue = (event) => {
  event.target.value !== '' ? (checkpwInput = true) : (checkpwInput = false);
  showButton();
};

//버튼 활성화
const showButton = () => {
  checkemailInput === true && checkpwInput === true
    ? $loginButton.classList.add('focus')
    : $loginButton.classList.remove('focus');
};

// 로그인 데이터 요청
const url = 'https://mandarin.api.weniv.co.kr';

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
    console.log(resJson); //나중에 지우기
    saveToken(resJson)
    isLogin(resJson);
  } catch (err) {
    console.error(err); //나중에 지우기
  }
}

//로그인 체크 로직
function isLogin(resJson) {
  resJson.hasOwnProperty('user') ? isLoginTrue() : isLoginFalse();
}

//로그인 성공 시 페이지 전환
function isLoginTrue() {
  location.href = './search.html';
}

//로그인 실패 시 알람 문구 출력
function isLoginFalse() {
  $errorMessage.classList.remove('display-none');
}

//로컬스토리지에 토큰 저장하기
function saveToken(resJson) {
  localStorage.setItem('token', resJson.user.token)
}

$emailInput.addEventListener('input', checkEmailInputValue);
$pwInput.addEventListener('input', checkpwInputValue);
$loginButton.addEventListener('click', loginData);