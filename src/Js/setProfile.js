const $userNameInput = document.querySelector('#userName');
const $userIdInput = document.querySelector('#userId');
const $introInput = document.querySelector('#intro');
const $loginButton = document.querySelector('.login-button');
const $RegErrorMessage = document.querySelector('#Reg-error-message');
const $duplicateErrorMessage = document.querySelector(
  '#duplicate-error-message'
);
const $profileUploadButton = document.querySelector('.profile-add');
const $profileInput = document.querySelector('#profile-input')
const $profileCover = document.querySelector('.profile-cover')

const regexp = /[0-9a-zA-Z._]/g;

const url = 'https://mandarin.api.weniv.co.kr';

let checkUserNamInput = false;
let checkUserIdInput = false;
let checkIntroIdInput = false;

const checkUserNamInputValue = (event) => {
  event.target.value !== ''
    ? (checkUserNamInput = true)
    : (checkUserNamInput = false);
  showButton();
};

const checkUserIdInputValue = (event) => {
  event.target.value !== ''
    ? (checkUserIdInput = true)
    : (checkUserIdInput = false);
  userIdRegErrorMessage(event);
  showButton();
};

//아이디 정규식 오류 메시지 출력
function userIdRegErrorMessage(event) {
  if (!regexp.test(event.target.value)) {
    $RegErrorMessage.classList.remove('display-none');
  } else {
    $RegErrorMessage.classList.add('display-none');
  }
}

const introInputValue = (event) => {
  event.target.value !== ''
    ? (checkIntroIdInput = true)
    : (checkIntroIdInput = false);
  showButton();
};

const showButton = () => {
  checkUserNamInput === true &&
  checkUserIdInput === true &&
  checkIntroIdInput === true &&
  $RegErrorMessage.classList.contains('display-none') &&
  $duplicateErrorMessage.classList.contains('display-none')
    ? $loginButton.classList.add('focus')
    : $loginButton.classList.remove('focus');
};

//아이디 중복 체크 인풋 할 때 마다 통신이 일어나는데 리팩토링 필요해 보임
async function userIdValid() {
  try {
    const res = await fetch(url + '/user/accountnamevalid', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: {
          accountname: $userIdInput.value,
        },
      }),
    });
    const resJson = await res.json();
    console.log(resJson);
    userIdErrorMessage(resJson); //실시간 감지 필요함 리팩토링 요망
    showButton();
    return resJson.message;
  } catch (err) {
    console.error(err);
  }
}

//아이디 중복 체크 오류 메시지 출력
function userIdErrorMessage(resJson) {
  if (resJson.message === '이미 가입된 계정ID 입니다.') {
    $duplicateErrorMessage.classList.remove('display-none');
  } else {
    $duplicateErrorMessage.classList.add('display-none');
  }
}

//회원가입 정보 보내기
async function sendSingUpdata() {
  const userIdResult = await userIdValid();
  if (userIdResult === '사용 가능한 계정ID 입니다.') {
    try {
      const res = await fetch(url + '/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: {
            username: $userNameInput.value,
            email: localStorage.getItem('email'), //로컬스토리지 데이터 넘기기
            password: localStorage.getItem('password'), //로컬스토리지 데이터 넘기기
            accountname: $userIdInput.value,
            intro: $introInput.value,
            image: String,
          },
        }),
      });
      const resJson = await res.json();
      console.log(resJson);
      userIdDuplicateCheck(resJson);
      location.href = './search.html';
    } catch (err) {
      console.error(err);
    }
  }
}

//프로필 이미지 버튼 클릭 시 파일 업로드 하기
function clickProfileInput (e) {
  $profileInput.click(console.log
    (e.target));
}

function uploadImg(e) {
  clickProfileInput(e);
}

//프리뷰 구현
function previewProfileCover() {
  const reader = new FileReader();
  reader.onload = ({ target }) => {
    $profileCover.src = target.result;
  };
  reader.readAsDataURL($profileInput.files[0]);
}


//이미지 불러오기
async function resImage() {

  try {
    const response = await fetch(url+"filename.png", {
        method: "GET",
    });t
  
    const data = await response.json();
    
    console.log(data)
  } catch (err) {
    console.error(err);
  }
}

$userNameInput.addEventListener('input', checkUserNamInputValue);
$userIdInput.addEventListener('input', checkUserIdInputValue);
$userIdInput.addEventListener('input', userIdValid);
$introInput.addEventListener('input', introInputValue);
$loginButton.addEventListener('click', sendSingUpdata);
$profileUploadButton.addEventListener('click', uploadImg)
$profileInput.addEventListener('change', previewProfileCover);
