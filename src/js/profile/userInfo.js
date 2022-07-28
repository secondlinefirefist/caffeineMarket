const url = 'https://mandarin.api.weniv.co.kr';
const myAccountname = `${window.localStorage.getItem('accountname')}`;
const yourAccountname = location.search.replace('?', '').split('=')[1];
const token = window.localStorage.getItem('token');
const accountname = yourAccountname ? yourAccountname : myAccountname;
//프로필 정보 보여주기
const userSettings = document.querySelector('.userSettings');
async function infoUser() {
  try {
    const res = await fetch(url + '/profile/' + accountname, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-type': 'application/json',
      },
    });
    const resJson = await res.json();
    infoUserProfile(resJson);
    showYourProfileButton(resJson);
  } catch {
    console.error('ERROR!');
    location.href = '../pages/page404.html';
  }
}
infoUser();

// yourProfile 버튼 생성
const contProfile = document.querySelector('.contProfile');
function showYourProfileButton(resJson) {
  if (accountname != myAccountname) {
    userSettings.classList.add('userSettingsHide');
    const userFollowSection = document.createElement('section'),
      sectionName = document.createElement('h2'),
      btnKakao = document.createElement('button'),
      imgKakao = document.createElement('img'),
      btnFollow = document.createElement('button'),
      btnShare = document.createElement('button'),
      imgShare = document.createElement('img');

    contProfile.append(userFollowSection);
    userFollowSection.append(sectionName, btnKakao, btnFollow, btnShare);
    btnKakao.appendChild(imgKakao);
    btnShare.appendChild(imgShare);

    userFollowSection.setAttribute('class', 'userSns');
    sectionName.setAttribute('class', 'ir');
    btnKakao.setAttribute('class', 'btnKakao');
    btnKakao.setAttribute('type', 'button');
    imgKakao.setAttribute('src', '../img/icon-kakao.png');
    imgKakao.setAttribute('alt', '카카오');

    btnFollow.setAttribute('isfollow', resJson.profile.isfollow);
    btnFollow.setAttribute('id', 'userInfoFollowBtn');

    if (btnFollow.getAttribute('isfollow') == 'true') {
      btnFollow.setAttribute('class', 'btnFollowUser');
      btnFollow.setAttribute('type', 'button');
      btnFollow.textContent = '언팔로우';
    } else if (btnFollow.getAttribute('isfollow') == 'false') {
      btnFollow.setAttribute('class', 'btnUnFollowUser');
      btnFollow.setAttribute('type', 'button');
      btnFollow.textContent = '팔로우';
    }

    btnShare.setAttribute('class', 'btnShare');
    btnShare.setAttribute('type', 'button');
    imgShare.setAttribute('src', '../img/icon/icon-share.png');
    imgShare.setAttribute('alt', '공유하기');

    followDataFunc();
    goChatRoom(resJson);
  }
}

// 카카오 버튼 누르면 채팅창으로 넘어가기
function goChatRoom(resJson) {
  let btnKakao = document.querySelector('.btnKakao');
  btnKakao.addEventListener('click', () => {
    location.href =
      './chatRoom.html?accountname=' + resJson.profile.accountname;
  });
}

// 팔로우 & 언팔로우 매개변수
function followDataFunc() {
  let userInfoFollowBtn = document.querySelector('#userInfoFollowBtn');
  userInfoFollowBtn.addEventListener('click', (event) => {
    let followingState = event.currentTarget.getAttribute('isfollow');
    let followingClass = event.currentTarget.getAttribute('class');
    let followingTarget = event.currentTarget;
    clickUserInfoFollowBtn(followingState, followingClass, followingTarget);
    clickUserInfoUnFollowBtn(followingState, followingClass, followingTarget);
  });
}

//팔로우
async function clickUserInfoFollowBtn(
  followingState,
  followingClass,
  followingTarget
) {
  if (
    followingState == 'false' ||
    (followingState == 'true' && followingClass == 'btnUnFollowUser')
  )
    try {
      const res = await fetch(url + '/profile/' + accountname + '/follow', {
        method: 'POST',
        body: JSON.stringify(),
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-type': 'application/json',
        },
      });
      followingTarget.classList.add('btnFollowUser');
      followingTarget.classList.remove('btnUnFollowUser');
      followingTarget.textContent = '언팔로우';
      const resJson = await res.json();
    } catch {
      console.error('ERROR');
    }
}
// 언팔로우
async function clickUserInfoUnFollowBtn(
  followingState,
  followingClass,
  followingTarget
) {
  if (
    (followingState == 'true' && followingClass == 'btnFollowUser') ||
    (followingState == 'false' && followingClass == 'btnFollowUser')
  ) {
    try {
      const res = await fetch(url + '/profile/' + accountname + '/unfollow', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-type': 'application/json',
        },
        body: JSON.stringify(),
      });
      const resJson = await res.json();
      followingTarget.classList.add('btnUnFollowUser');
      followingTarget.classList.remove('btnFollowUser');
      followingTarget.textContent = '팔로우';
    } catch {
      console.error('ERROR');
    }
  }
}

// profile 정보 GET
const marketName = document.querySelector('.marketName');
const followerCount = document.querySelector('.btnFollowers > strong');
const followingCount = document.querySelector('.btnFollwings > strong');
const userAccountname = document.querySelector('.marketId');
const marketDetail = document.querySelector('.marketDetail');
const imgProfile = document.querySelector('.imgProfile');
function infoUserProfile(resJson) {
  marketName.textContent = resJson.profile.username;
  followerCount.textContent = resJson.profile.followerCount;
  followingCount.textContent = resJson.profile.followingCount;
  userAccountname.textContent = '@ ' + resJson.profile.accountname;
  marketDetail.textContent = resJson.profile.intro;
  imgProfile.setAttribute('src', resJson.profile.image);
}

//프로필 수정 링크 이동
const btnEditProfile = document.querySelector('.btnEditProfile');
btnEditProfile.addEventListener('click', () => {
  location.href = '../pages/profileModification.html';
});

//팔로우 버튼 클릭하여 팔로잉리스트로 넘어가기
const btnFollwings = document.querySelector('.btnFollwings');
const goFollowingsList = yourAccountname
  ? '../pages/followingList.html?accountname=' + yourAccountname
  : '../pages/followingList.html';
btnFollwings.addEventListener('click', () => {
  location.href = goFollowingsList;
});

//팔로우 버튼 클릭하여 팔로워리스트로 넘어가기
const btnFollowers = document.querySelector('.btnFollowers');
const goFollowerList = yourAccountname
  ? '../pages/followerList.html?accountname=' + yourAccountname
  : '../pages/followerList.html';
btnFollowers.addEventListener('click', () => {
  location.href = goFollowerList;
});
