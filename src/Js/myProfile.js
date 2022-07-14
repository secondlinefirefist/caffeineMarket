const url = 'https://mandarin.api.weniv.co.kr';
const accountname = `${window.localStorage.getItem('accountname')}`;
//프로필 정보 보여주기
(async function infoUser() {
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
})();

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

// 상품 정보 불러오기
(async function productInfo() {
  try {
    const res = await fetch(url + '/product/' + accountname, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${window.localStorage.getItem('token')}`,
        'Content-type': 'application/json',
      },
    });
    const resJson = await res.json();
    console.log(resJson, 'resjson');
    // console.log(resJson.product.map((x) => x));
    prodcutListDummy = resJson.product;
    createProductList(prodcutListDummy);
  } catch {
    console.error('ERROR!');
  }
})();

//상품등록 버튼 누르면 판매 상품 리스트 생성

const productList = document.querySelector('.productList');
function createProductList() {
  console.log(prodcutListDummy, 'test');
  productList.innerHTML = prodcutListDummy
    .map(
      (element) =>
        `
  <li>
    <button type="button" class="btnProductItem">
      <img src=${element.itemImage}alt="상품1" />
      <span class="prodcutTitle">${element.itemName}</span>
      <strong class="prodcutPrice">${element.price}</strong>
    </button>
  </li>
  `
    )
    .join('');
}

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
