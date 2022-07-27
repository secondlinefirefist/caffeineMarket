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
    console.log(resJson); //나중에 지우기
    //팔로우 리스트 체크
    isFollowCheck(resJson);
  } catch (err) {
    console.error(err); //나중에 지우기
  }
}

//팔로우 리스트 체크
function isFollowCheck(resJson) {
  if (Array.isArray(resJson) && resJson.length === 0) {
    changePageToHomeEpmty();
  } else changePageeHome();
}

//홈 피드로 이동
function changePageeHome() {
  location.href = './home.html';
}

//빈 홈으로 이동
function changePageToHomeEpmty() {
  location.href = './homeEmpty.html';
}

//검색창으로 이동
function changePageToSerch() {
  location.href = './search.html';
}

//화면 진입 시 피드 여부 판단
getFollower();

$navSerch.addEventListener('click', changePageToSerch);
$mainSerchButton.addEventListener('click', changePageToSerch);