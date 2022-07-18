const url = 'https://mandarin.api.weniv.co.kr';
const accountname = `${window.localStorage.getItem('accountname')}`;
async function followListData() {
  try {
    const res = await fetch(url + '/profile/' + accountname + '/following', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${window.localStorage.getItem('token')}`,
        'Content-type': 'application/json',
      },
    });
    const resJson = await res.json();
    console.log(resJson);
    showfollowingList(resJson);
  } catch {
    console.error('ERROR');
  }
}
followListData();

const followersList = document.querySelector('.followersList');
function showfollowingList(resJson) {
  console.log(resJson);
  for (let i = 0; i < resJson.length; i++) {
    const li = document.createElement('li'),
      imgwrap = document.createElement('div'),
      img = document.createElement('img'),
      div = document.createElement('div'),
      strong = document.createElement('strong'),
      p = document.createElement('p'),
      button = document.createElement('button');

    followersList.append(li);
    li.append(imgwrap, div, button);
    imgwrap.append(img);
    div.append(strong, p);

    imgwrap.setAttribute('class', 'wrapImg');
    img.setAttribute('src', resJson[i].image);
    img.setAttribute('alt', '팔로워 프로필사진');
    img.setAttribute('class', 'followerProfileImg');

    div.setAttribute('class', 'txtWrap');
    strong.setAttribute('class', 'txtFollowerTitle');
    strong.textContent = resJson[i].username;
    p.setAttribute('class', 'txtFollwerInfo');
    p.textContent = resJson[i].intro;

    button.setAttribute('class', 'btnFollow');
    button.setAttribute('isfollow', resJson[i].isfollow);
    button.textContent = '취소';
  }
}
