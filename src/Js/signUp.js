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
$loginButton.addEventListener('click', setProfileHref);

// 이메일 가입 회원 중복 체크
// {message: '사용 가능한 이메일 입니다.'} 전달 받으면 다음 페이지로 이동
async function emailValid () {
  const url = "https://mandarin.api.weniv.co.kr";
  try{
        const res = await fetch(url+"/user/emailvalid", {
                          method: "POST",
                          headers: {
                              "Content-Type": "application/json",
                          },
                          body : JSON.stringify({
                            "user": {
                                "email": $emailInput.value,
                            }
                        })
                      });
        const resJson = await res.json();
        return resJson.message
      } catch(err){
        console.error(err);
      }
}

//이메일 검증이 완료 되면 프로필 설정 페이지로 이동
async function setProfileHref() {
  const emailResult = await emailValid();
  if (emailResult === '사용 가능한 이메일 입니다.') {
    location.href = './setProfile.html';
  }
}


//회원가입 데이터 보내기 

// 프로필 설정까지 해서 데이터 보낼때 사용하기
// async function sendSingUpdata() {
//   const url = "https://mandarin.api.weniv.co.kr";

//   try{

//     const res = await fetch(url+"/user", {
//                       method: "POST",
//                       headers: {
//                           "Content-Type": "application/json",
//                       },
//                       body : JSON.stringify({
//                         "user": {
//                             "username": String,
//                             "email": String,
//                             "password": String,
//                             "accountname": String,
//                             "intro": String,
//                             "image": String 
//                         }
//                     })
//                   });
//     const resJson = await res.json();
//     console.log(resJson);
//   } catch(err){
//     console.error(err);
//   }
// }
