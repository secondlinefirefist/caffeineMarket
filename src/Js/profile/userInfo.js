const url = 'https://mandarin.api.weniv.co.kr';
const myAccountname = `${window.localStorage.getItem('accountname')}`;
const yourAccountname = location.search.replace('?', '').split('=')[1];
const accountname =
  yourAccountname !== myAccountname ? yourAccountname : myAccountname;
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
  } catch {
    console.error('ERROR!');
  }
}
infoUser();

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
  userAccountname.textContent = resJson.profile.accountname;
  marketDetail.textContent = resJson.profile.intro;
  imgProfile.setAttribute('src', resJson.profile.image);
}

//프로필 수정 링크 이동
const btnEditProfile = document.querySelector('.btnEditProfile');
btnEditProfile.addEventListener('click', () => {
  location.href = '../pages/profileModification.html';
});

//팔로우 버튼 클릭하여 팔로우리스트로 넘어가기
const btnFollwings = document.querySelector('.btnFollwings');
btnFollwings.addEventListener('click', () => {
  location.href = '../pages/followingList.html';
});
