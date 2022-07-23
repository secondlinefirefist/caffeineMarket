const url = 'https://mandarin.api.weniv.co.kr';
const myAccountname = `${window.localStorage.getItem('accountname')}`;
const yourAccountname = location.search.replace('?', '').split('=')[1];
const accountname = yourAccountname ? yourAccountname : myAccountname;
const userSettings = document.querySelector('.userSettings');
//프로필 정보 보여주기
async function infoUser() {
  try {
    const res = await fetch(url + '/profile/' + accountname, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${window.localStorage.getItem('token')}`,
        'Content-type': 'application/json',
      },
    });
    const resJson = await res.json();
    console.log(resJson);
    infoUserProfile(resJson);
    if (accountname != myAccountname) {
      showYourProfileButton();
    }
  } catch {
    console.error('ERROR!');
    location.href = '../pages/page404.html';
  }
}
infoUser();

//
const contProfile = document.querySelector('.contProfile');
function showYourProfileButton() {
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
  imgKakao.setAttribute('src', '../img/message-circle.png');
  imgKakao.setAttribute('alt', '카카오');

  btnFollow.setAttribute('class', 'btnFollow');
  btnFollow.setAttribute('type', 'button');
  btnFollow.textContent = '언팔로우';

  btnShare.setAttribute('class', 'btnShare');
  btnShare.setAttribute('type', 'button');
  imgShare.setAttribute('src', '../img/icon/icon-share.png');
  imgShare.setAttribute('alt', '공유하기');
}
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
