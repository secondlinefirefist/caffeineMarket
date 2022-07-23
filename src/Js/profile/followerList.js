const followersList = document.querySelector('.followersList');
const url = 'https://mandarin.api.weniv.co.kr';
const myAccountname = `${window.localStorage.getItem('accountname')}`;
const yourAccountname = location.search.replace('?', '').split('=')[1];
const accountname = yourAccountname ? yourAccountname : myAccountname;
async function followListData() {
  try {
    const res = await fetch(
      url + '/profile/' + accountname + '/follower/?limit=50',
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${window.localStorage.getItem('token')}`,
          'Content-type': 'application/json',
        },
      }
    );
    const resJson = await res.json();
    if (resJson == '') {
      const noFollowingTxt = document.createElement('p');
      noFollowingTxt.textContent = '팔로워 유저가 없습니다 (´。＿。｀)';
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
      link = document.createElement('a'),
      imgWrap = document.createElement('div'),
      img = document.createElement('img'),
      txtWrap = document.createElement('div'),
      strong = document.createElement('strong'),
      p = document.createElement('p'),
      button = document.createElement('button');

    followersList.append(li);
    li.append(link, txtWrap, button);
    link.append(imgWrap, txtWrap);
    imgWrap.append(img);
    txtWrap.append(strong, p);
    link.setAttribute(
      'href',
      '../pages/myProfile.html?accountname=' + resJson[i].accountname
    );
    link.setAttribute('class', 'followerLink');

    imgWrap.setAttribute('class', 'wrapImg');
    img.setAttribute('src', resJson[i].image);
    img.setAttribute('alt', '팔로워 프로필사진');
    img.setAttribute('class', 'followerProfileImg');

    txtWrap.setAttribute('class', 'txtWrap');
    strong.setAttribute('class', 'txtFollowerTitle');
    strong.textContent = resJson[i].username;
    p.setAttribute('class', 'txtFollwerInfo');
    p.textContent = resJson[i].intro;

    button.setAttribute('isfollow', resJson[i].isfollow);
    if (button.getAttribute('isfollow') == 'true') {
      button.setAttribute('class', 'btnFollow');
      button.setAttribute('id', 'btnSelectFollow');
      button.textContent = '취소';
    } else if (button.getAttribute('isfollow') == 'false') {
      button.setAttribute('class', 'btnUnfollow');
      button.setAttribute('id', 'btnSelectFollow');
      button.textContent = '팔로우';
    }
  }
  followingData(resJson);
}

//팔로우 & 언팔로에 필요한 매개변수값들 넘겨주기
function followingData(resJson) {
  console.log(resJson, '언팔로우 함수 내부입니다');
  let btnSelectFollow = document.querySelectorAll('#btnSelectFollow');
  for (let i = 0; i < btnSelectFollow.length; i++) {
    btnSelectFollow[i].addEventListener('click', (event) => {
      // console.log(resJson[i].accountname);
      let followUserData = resJson[i];
      let followState = event.currentTarget.getAttribute('isfollow');
      let targetButton = event.currentTarget;
      clickUnFollow(followUserData, followState, targetButton);
      clickFollow(followUserData, followState, targetButton);
    });
  }
}
//언팔로우하기
async function clickUnFollow(followUserData, followState, targetButton) {
  let userAccountName = followUserData.accountname;
  if (followState == 'true' && targetButton.classList.contains('btnFollow')) {
    try {
      const res = await fetch(
        url + '/profile/' + userAccountName + '/unfollow',
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${window.localStorage.getItem('token')}`,
            'Content-type': 'application/json',
          },
          body: JSON.stringify(),
        }
      );
      const resJson = await res.json();
      console.log('언팔로우됨');
      targetButton.classList.add('btnUnfollow');
      targetButton.classList.remove('btnFollow');
      targetButton.textContent = '팔로우';
    } catch {
      console.error('ERROR');
    }
  }
}

//팔로우하기
async function clickFollow(followUserData, followState, targetButton) {
  let userAccountName = followUserData.accountname;
  if (
    followState === 'false' ||
    (followState === 'true' && targetButton.classList.contains('btnUnfollow'))
  ) {
    try {
      const res = await fetch(url + '/profile/' + userAccountName + '/follow', {
        method: 'POST',
        body: JSON.stringify(),
        headers: {
          'Authorization': `Bearer ${window.localStorage.getItem('token')}`,
          'Content-type': 'application/json',
        },
      });
      console.log('왜 왜 왜!!!!!!!!!🐰 팔로우됨');
      const resJson = await res.json();
      targetButton.classList.add('btnFollow');
      targetButton.classList.remove('btnUnfollow');
      targetButton.textContent = '취소';
    } catch {
      console.error('ERROR');
    }
  }
}
