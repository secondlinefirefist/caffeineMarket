// 구현 사항
// 1. 계정 아이디 중복 확인, 영문 숫자 특문만 가능하게 세팅하기
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
$loginButton.addEventListener('click', sendSingUpdata);

//아이디 중복 체크

async function userIdValid () {
  const url = "https://mandarin.api.weniv.co.kr";
  try{
        const res = await fetch(url+"/user/accountnamevalid", {
                          method: "POST",
                          headers: {
                              "Content-Type": "application/json",
                          },
                          body : JSON.stringify({
                            "user": {
                              "accountname": $userIdInput.value,
                            }
                        })
                      });
        const resJson = await res.json();
        console.log(resJson)
        return resJson.message
      } catch(err){
        console.error(err);
      }
}

//회원가입 정보 보내기

async function sendSingUpdata() {
  const url = "https://mandarin.api.weniv.co.kr";
  const userIdResult = await userIdValid();
  if (userIdResult === '사용 가능한 계정ID 입니다.') {
    try{
      const res = await fetch(url+"/user", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body : JSON.stringify({
                          "user": {
                              "username": $userNameInput.value, 
                              "email": localStorage.getItem('email'), //로컬스토리지 데이터 넘기기
                              "password": localStorage.getItem('password'), //로컬스토리지 데이터 넘기기
                              "accountname": $userIdInput.value,
                              "intro": $introInput.value,
                              "image": String 
                          }
                      })
                    });
      const resJson = await res.json();
      console.log(resJson);
      //location.href = './search.html';
    } catch(err){
      console.error(err);
    }
  }  
}