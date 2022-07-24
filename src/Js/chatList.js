const url = 'https://mandarin.api.weniv.co.kr';
const token = window.localStorage.getItem('token');
const accountname = localStorage.getItem('accountname');

//  팔로잉 유저 GET요청으로 불러오기 
(async function chatListData() {
  try {
    const res = await fetch(url + '/profile/' + accountname + '/following', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-type': 'application/json',
      },
    });
    const resJson = await res.json();
    // console.log(resJson);
    showfollowingList(resJson);
  } catch {
    console.error('err');
  }
})()

const showfollowingList = (resJson) => {
  console.log(resJson);
}



document.querySelector('.userContent').addEventListener('click', () => {
  location.href = './chatRoom.html';
});

document.querySelector('.btnBack').addEventListener('click', () => {
  location.href = './home.html';
});