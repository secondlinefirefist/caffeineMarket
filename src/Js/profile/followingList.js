const followersList = document.querySelector('.followersList');
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
    if (resJson == '') {
      const noFollowingTxt = document.createElement('p');
      noFollowingTxt.textContent = '팔로워가 없습니다 (´。＿。｀)';
      followersList.appendChild(noFollowingTxt);
    } else {
      showfollowingList(resJson);
    }
  } catch {
    console.error('ERROR');
  }
}
followListData();

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
  unfollowData(resJson);
}

function unfollowData(resJson) {
  console.log(resJson, '언팔로우 함수 내부입니다');
  let btnFollow = document.querySelectorAll('.btnFollow');
  for (let i = 0; i < btnFollow.length; i++) {
    btnFollow[i].addEventListener('click', (event) => {
      console.log(resJson[i].accountname);
      let unfollowUserData = resJson[i];
      let followState = event.currentTarget.getAttribute('isfollow');
      let targetButton = event.currentTarget;
      clickUnFollow(unfollowUserData, followState, targetButton);
    });
  }
}

async function clickUnFollow(unfollowUserData, followState, targetButton) {
  let unfollowUserAccountName = unfollowUserData.accountname;
  if (followState == 'true') {
    try {
      const res = await fetch(
        url + '/profile/' + unfollowUserAccountName + '/unfollow',
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${window.localStorage.getItem('token')}`,
            'Content-type': 'application/json',
            'body': JSON.stringify(),
          },
        }
      );
      const resJson = await res.json();
      // targetButton.classList.add('btnUnfollow');
      // targetButton.textContent = '팔로우';
      location.reload();
    } catch {
      console.error('ERROR');
    }
  }
}