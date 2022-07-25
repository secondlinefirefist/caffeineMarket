const $chatList = document.querySelector('.chatList');

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
})();

const date = new Date();
const time = date.getMonth() + 1 + '월 ' + date.getDate() + '일';
const showfollowingList = (resJson) => {
  console.log(resJson);
  for (let i = 0; i < resJson.length; i++) {
    $chatList.innerHTML += `<li class="chatItem">
    <div class="userContent">
      <img
        src=${resJson[i].image}
        alt="유저 프로필사진"
        class="chatProfile"
      />
      <div class="chatInfo">
        <strong class="userName">${resJson[i].username}</strong>
        <p class="userText">${resJson[i].intro}</p>
      </div>
    </div>
    <strong class="chatDate">${time}</strong>
  </li>`;
  }
};

document.querySelector('.userContent').addEventListener('click', () => {
  location.href = './chatRoom.html';
});

document.querySelector('.btnBack').addEventListener('click', () => {
  location.href = './home.html';
});
