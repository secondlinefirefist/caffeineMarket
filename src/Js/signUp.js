const $emailInput = document.querySelector('#email');
const $pwInput = document.querySelector('#password');
const $loginButton = document.querySelector('.login-button');

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

$emailInput.addEventListener('input', checkEmailInputValue);
$pwInput.addEventListener('input', checkpwInputValue);
$loginButton.addEventListener('click', setProfileHref);

// 이메일 가입 회원 중복 체크
// {message: '사용 가능한 이메일 입니다.'} 전달 받으면 다음 페이지로 이동
const url = 'https://mandarin.api.weniv.co.kr';
async function emailValid() {
  try {
    const res = await fetch(url + '/user/emailvalid', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: {
          email: $emailInput.value,
        },
      }),
    });
    const resJson = await res.json();
    return resJson.message;
  } catch (err) {
    console.error(err);
  }
}

//중복 체크 후 이메일과 비밀번호 로컬스토리지에 저장하기
function setSignUpData() {
  localStorage.setItem('email', $emailInput.value);
  localStorage.setItem('password', $pwInput.value);
}

//이메일 검증이 완료 되면 프로필 설정 페이지로 이동
async function setProfileHref() {
  const emailResult = await emailValid();
  emailResult === '사용 가능한 이메일 입니다.'
    ? setSignUpData()
    : (location.href = './setProfile.html');
}
