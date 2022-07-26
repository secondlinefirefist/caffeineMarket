const $chatList = document.querySelector('.chatList');

const url = 'https://mandarin.api.weniv.co.kr';
const token = window.localStorage.getItem('token');
const accountname = localStorage.getItem('accountname');
const yourAccountname = location.search.replace('?', '').split('=')[1];

//  팔로잉 유저 GET요청으로 불러오기
(async function getChatListData() {
  try {
    const res = await fetch(url + '/profile/' + accountname + '/following/?limit=50', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-type': 'application/json',
      },
    });
    const resJson = await res.json();
    showFollowingList(resJson);
  } catch {
    console.error('err');
  }
})();

const date = new Date();
const time = date.getMonth() + 1 + '월 ' + date.getDate() + '일';
const showFollowingList = (resJson) => {
  console.log(resJson);
  for (let i = 0; i < resJson.length; i++) {
    const $li = document.createElement('li'),
      $link = document.createElement('a'),
      $userWrap = document.createElement('div'),
      $img = document.createElement('img'),
      $userInfo = document.createElement('div'),
      $chatDate = document.createElement('strong'),
      $userName = document.createElement('strong'),
      $p = document.createElement('p');

    $chatList.append($li);
    $li.append($link, $chatDate);
    $link.append($userWrap);
    $userWrap.append($img, $userInfo);
    $userInfo.append($userName, $p);

    $li.setAttribute('class', 'chatItem');
    $link.setAttribute(
      'href',
      './chatRoom.html?accountname=' + resJson[i].accountname
    );
    $link.setAttribute('class', 'linkChatRoom');
    $userWrap.setAttribute('class', 'userContent');
    $img.setAttribute('src', resJson[i].image);
    $img.setAttribute('alt', '유저 프로필 사진');
    $img.setAttribute('class', 'chatProfile');
    $userInfo.setAttribute('class', 'chatInfo');
    $chatDate.setAttribute('class', 'chatDate');

    $userName.setAttribute('class', 'userName');
    $userName.textContent = resJson[i].username;
    $p.setAttribute('class', 'userText');
    $p.textContent = resJson[i].intro;
    $chatDate.textContent = time;
  }
};

document.querySelector('.btnBack').addEventListener('click', () => {
  window.history.back();
});

