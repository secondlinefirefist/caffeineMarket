const $navSerch = document.querySelector('.serch-button');
const $mainSerchButton = document.querySelector('.serch-btn');
const token = window.localStorage.getItem('token');
const accountname = window.localStorage.getItem('accountname');
const key = localStorage.getItem('key');
const url = 'https://mandarin.api.weniv.co.kr';

//팔로우 내역 불러오기
async function getFollower() {
  try {
    const res = await fetch(url + '/profile/' + accountname + '/following', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    const resJson = await res.json();
    //팔로우 리스트 체크
    console.log(resJson);
    isFollowCheck(resJson);
  } catch (err) {
    changePageTo404();
  }
}

//화면 진입 시 피드 여부 판단
getFollower();

//404에러 처리
function changePageTo404() {
  location.href = './page404.html';
}

//팔로우 리스트 체크
function isFollowCheck(resJson) {
  if (Array.isArray(resJson) && !(resJson.length === 0)) {
    changePageeHome();
  }
}

//홈 피드로 이동
function changePageeHome() {
  location.href = './home.html';
}

//검색창으로 이동
function changePageToSerch() {
  location.href = './search.html';
}

function changePageTo404() {
  location.href = './page404.html';
}

$navSerch.addEventListener('click', changePageToSerch);
$mainSerchButton.addEventListener('click', changePageToSerch);
