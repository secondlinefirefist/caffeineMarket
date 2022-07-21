const $userNameInput = document.querySelector('#userName');
const $userIdInput = document.querySelector('#userId');
const $introInput = document.querySelector('#intro');
const $profileInput = document.querySelector('#profile-input');
const $profileCover = document.querySelector('.profile-cover');
const $profileUploadButton = document.querySelector('.profile-add');
const $profileSaveButton = document.querySelector('.btnSave');
const $RegErrorMessage = document.querySelector('#Reg-error-message');
const $duplicateErrorMessage = document.querySelector(
  '#duplicate-error-message'
);

const regexp = /[0-9a-zA-Z._]/g;

const url = 'https://mandarin.api.weniv.co.kr';

let checkUserNamInput = false;
let checkUserIdInput = false;
let checkIntroIdInput = false;

//프로필 수정 요청
async function modifiaction() {
  try {
    const res = await fetch(url + '/user', {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${window.localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: {
          username: $userNameInput.value,
          accountname: $userIdInput.value,
          intro: $introInput.value,
          image: $profileCover.src,
        },
      }),
    });
    const resJson = await res.json();
    console.log(resJson);
    checkImgSize(resJson);
    saveData(resJson);
    location.href = './myProfile.html';
  } catch (err) {
    console.error(err);
  }
}

//용량 체크
function checkImgSize(resJson) {
  if (resJson.message === 'request entity too large') {
    alert('이미지가 너무 큽니다.');
  }
}

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

    return resJson.message;
  } catch (err) {
    console.error(err);
  }
}

//로컬스토리지에 수정 데이터 저장하기
function saveData(resJson) {
  localStorage.setItem('accountname', resJson.user.accountname);
  localStorage.setItem('key', resJson.user._id);
}

//아이디 중복 체크 오류 메시지 출력
function userIdErrorMessage(resJson) {
  if (resJson.message === '이미 가입된 계정ID 입니다.') {
    $duplicateErrorMessage.classList.remove('display-none');
    checkUserIdInput = false;
    showButton();
  } else {
    $duplicateErrorMessage.classList.add('display-none');
  }
}

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
  showButton();
};

const introInputValue = (event) => {
  event.target.value !== ''
    ? (checkIntroIdInput = true)
    : (checkIntroIdInput = false);
  showButton();
};

const showButton = () => {
  checkUserNamInput &&
  checkUserIdInput &&
  checkIntroIdInput &&
  $RegErrorMessage.classList.contains('display-none') &&
  $duplicateErrorMessage.classList.contains('display-none')
    ? $profileSaveButton.classList.add('focus')
    : $profileSaveButton.classList.remove('focus');
};
//아이디 정규식 오류 메시지 출력
function userIdRegErrorMessage(event) {
  if (!regexp.test(event.target.value)) {
    $RegErrorMessage.classList.remove('display-none');
  } else {
    $RegErrorMessage.classList.add('display-none');
  }
}

function clickProfileInput(e) {
  $profileInput.click();
}

//저장 버튼 누르면 실행
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

$profileUploadButton.addEventListener('click', uploadImg);
$profileInput.addEventListener('change', previewProfileCover);
$profileSaveButton.addEventListener('click', modifiaction);
$userNameInput.addEventListener('input', checkUserNamInputValue);
$userIdInput.addEventListener('input', checkUserIdInputValue);
$userIdInput.addEventListener('input', userIdValid);

$introInput.addEventListener('input', introInputValue);
