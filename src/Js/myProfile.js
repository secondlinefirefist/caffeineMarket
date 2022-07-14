const url = 'https://mandarin.api.weniv.co.kr';
//프로필 정보 보여주기
(async function infoUser() {
  try {
    const accountname = `${window.localStorage.getItem('accountname')}`;
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
})();

function infoUserProfile(resJson) {
  const marketName = document.querySelector('.marketName');
  const followerCount = document.querySelector('.btnFollowers > strong');
  const followingCount = document.querySelector('.btnFollwings > strong');
  const userAccountname = document.querySelector('.marketId');
  const marketDetail = document.querySelector('.marketDetail');
  const imgProfile = document.querySelector('.imgProfile');
  marketName.textContent = resJson.profile.username;
  followerCount.textContent = resJson.profile.followerCount;
  followingCount.textContent = resJson.profile.followingCount;
  userAccountname.textContent = resJson.profile.accountname;
  marketDetail.textContent = resJson.profile.intro;
  imgProfile.setAttribute('src', resJson.profile.image);
}

//상품등록 버튼 누르면 판매 상품 리스트 생성
const createProductList = () => {
  const productList = document.querySelector('.productList');
  const productItem = document.createElement('li');
  const productItemBtn = document.createElement('button');
  const productItemImg = document.createElement('img');
  const productItemSpan = document.createElement('span');
  const productItemStrong = document.createElement('strong');

  productList.appendChild(productItem);
  productItem.appendChild(productItemBtn);
  productItemBtn.append(productItemImg, productItemSpan, productItemStrong);
  productItemBtn.setAttribute('class', 'btnProductItem');
  productItemBtn.setAttribute('type', 'button');
  productItemImg.setAttribute('src', '../img/product-img-example.png');
  productItemImg.setAttribute('alt', '상품');
  productItemSpan.classList.add('prodcutTitle');
  productItemSpan.textContent = '애월읍 엄청 큰 낑깡';
  productItemStrong.classList.add('prodcutPrice');
  productItemStrong.textContent = '4500';
};

const btnAddProduct = document.querySelector('.btnAddProduct');
btnAddProduct.addEventListener('click', createProductList);

//상품 삭제
//message: 유효하지 않은 토큰, 401 unauthorize 오류 뜨는 상태
async function okDelProduct() {
  try {
    const res = await fetch(url + '/product/:product_id', {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${window.localStorage.getItem('token')}`,
        'Content-type': 'application/json',
      },
      body: JSON.stringify(),
    });
    const json = await res.json();
    console.log(json);
    alert(json.message);
    // 상품이 삭제되었습니다 메세지가 나오게 일단 해보려교 넣은 것
  } catch {
    console.error('ERROR!');
  }
}

const btnDelProduct = document.querySelector('#btnDelProduct');
btnDelProduct.addEventListener('click', okDelProduct);

//로그아웃
const btnOkLogout = document.querySelector('.btnOkLogout');
btnOkLogout.addEventListener('click', () => {
  btnOkLogout.setAttribute('location.href', '../pages/splash.html');
  // localStorage.clear();
});
