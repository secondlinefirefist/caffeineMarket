//인풋 내용 검사 후 로그인 버튼 활성화
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
$loginButton.addEventListener('click', loginData);


// 로그인 데이터 요청 
const url = "https://mandarin.api.weniv.co.kr";
const createP = document.createElement('p');
const createText = document.createTextNode('이거 안맞음')

async function loginData() {
    try{
    const res = await fetch(url+"/user/login/", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body : JSON.stringify({
                            "user":{
                                "email": $emailInput.value,
                                "password": $pwInput.value
                            }
                        })
                    });
    const resJson = await res.json();
    console.log(resJson);
    } catch(err){
      console.error(err);
      $pwInput.appendChild(createText);
    }
}
