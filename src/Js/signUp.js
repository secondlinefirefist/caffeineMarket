const $emailInput = document.querySelector('#email');
const $pwInput = document.querySelector('#password');
const $loginButton = document.querySelector('.login-button');
const $emailErrorMessage = document.querySelector('#email-error-message');
const $pwErrorMessage = document.querySelector('#pw-error-message');

let checkemailInput = false;
let checkpwInput = false;

//이메일 인풋값 검사
const checkEmailInputValue = (event) => {
  event.target.value !== ''
    ? (checkemailInput = true)
    : (checkemailInput = false);
  emailValid();
  showButton();
};

//비밀번호 인풋값 검사
const checkpwInputValue = (event) => {
  event.target.value !== '' ? (checkpwInput = true) : (checkpwInput = false);
  showButton();
};

//버튼 활성화
const showButton = () => {
  checkemailInput === true &&
  checkpwInput === true &&
  $emailErrorMessage.classList.contains('display-none') &&
  $pwErrorMessage.classList.contains('display-none')
    ? $loginButton.classList.add('focus')
    : $loginButton.classList.remove('focus');
};

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
    console.log(resJson); // 나중에 지우기
    emailDuplicateCheck(resJson);
    showButton();
    return resJson.message;
  } catch (err) {
    console.error(err);
  }
}

//이메일 중복 체크
function emailDuplicateCheck(resJson) {
  if (resJson.message === '이미 가입된 이메일 주소 입니다.') {
    $emailErrorMessage.classList.remove('display-none');
  } else {
    $emailErrorMessage.classList.add('display-none');
  }
}

//비밀번호 6자 체크 첫 진입 시 에러 없다가 블러될 떄 부터 실시간 감지 하여 생김
function pwLengthCheck() {
  $pwInput.addEventListener('input', pwLengthCheck);
  if ($pwInput.value.length < 6) {
    $pwErrorMessage.classList.remove('display-none');
  } else {
    $pwErrorMessage.classList.add('display-none');
  }
  showButton();
}

//중복 체크 후 이메일과 비밀번호 로컬스토리지에 저장하기
function setSignUpData() {
  localStorage.setItem('email', $emailInput.value);
  localStorage.setItem('password', $pwInput.value);
}

//프로필 설정 화면으로 이동
function router() {
  location.href = './setProfile.html';
}

//이메일 검증이 완료 되면 프로필 설정 페이지로 이동
async function checkProfileData() {
  const emailResult = await emailValid();
  if (emailResult === '사용 가능한 이메일 입니다.') {
    setSignUpData();
    //router(); //페이지 전환
  }
}

//이렇게 리스너 많이 달아도 되는건가요?
$emailInput.addEventListener('input', checkEmailInputValue);
$emailInput.addEventListener('blur', emailValid);
$pwInput.addEventListener('input', checkpwInputValue);
$pwInput.addEventListener('blur', pwLengthCheck);
$loginButton.addEventListener('click', checkProfileData);
