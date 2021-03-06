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
    if (resJson.user !== null) {
      saveData(resJson);
    }

    if (resJson.status === 422) {
      isLoginFalse();
    }
  } catch (err) {
    changePageTo404();
  }
}

//404에러 처리
function changePageTo404() {
  location.href = './page404.html';
}

//로그인 성공 시 페이지 전환
function isLoginTrue() {
  location.href = './homeEmpty.html';
}

//로그인 실패 시 알람 문구 출력
function isLoginFalse() {
  $errorMessage.classList.remove('display-none');
}

//로컬스토리지에 토큰 저장하기
function saveData(resJson) {
  if (resJson.hasOwnProperty('user')) {
    isLoginTrue();
    localStorage.setItem('token', resJson.user.token);
    localStorage.setItem('accountname', resJson.user.accountname);
    localStorage.setItem('key', resJson.user._id);
  }
}

$emailInput.addEventListener('input', checkEmailInputValue);
$pwInput.addEventListener('input', checkpwInputValue);
$loginButton.addEventListener('click', loginData);
