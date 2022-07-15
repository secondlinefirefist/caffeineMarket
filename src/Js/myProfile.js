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
  for (let i = 0; i < prodcutListDummy.length; i++) {
    const li = document.createElement('li');
    const button = document.createElement('button');
    const img = document.createElement('img');
    const span = document.createElement('span');
    const strong = document.createElement('strong');

    productList.appendChild(li);
    li.appendChild(button);
    button.append(img, span, strong);

    button.setAttribute('type', 'button');
    button.setAttribute('class', 'btnProductItem');
    button.setAttribute('id', 'btnProductItem');

    img.setAttribute('src', '#');
    img.setAttribute('alt', '상품이미지');

    span.setAttribute('class', 'productTitle');
    span.textContent = `${prodcutListDummy[i].itemName}`;
    strong.setAttribute('class', 'productPrice');
    strong.textContent = `${prodcutListDummy[i].price
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
  }
  // 상품 리스트 설정 모달 열기
  const productModal = document.querySelector('.productModal');
  let btnProductItem = document.querySelectorAll('.btnProductItem');
  console.log(btnProductItem.length);
  for (let i = 0; i < btnProductItem.length; i++) {
    btnProductItem[i].addEventListener('click', (event) => {
      event.stopPropagation();
      productModal.classList.toggle('displayModal');
    });
  }
  // 메인 눌렀을 때도 모달이 닫힐 수 있게 설정
  document.querySelector('main').addEventListener('click', (event) => {
    productModal.classList.remove('displayModal');
  });
}

//상품 삭제
async function okDelProduct() {
  console.log(prodcutListDummy, 'okDelProduct');
  const productId = `${prodcutListDummy[0].id}`;
  console.log(productId, 'productId');
  try {
    const res = await fetch(url + '/product/' + productId, {
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
  } catch {
    console.error('ERROR!');
  }
}
const btnDelProduct = document.querySelector('#btnDelProduct');
btnDelProduct.addEventListener('click', okDelProduct);

//로그아웃
const btnOkLogout = document.querySelector('.btnOkLogout');
btnOkLogout.addEventListener('click', () => {
  location.href = '../pages/splash.html';
  localStorage.clear();
});

//프로필 수정 링크 이동
const btnEditProfile = document.querySelector('.btnEditProfile');
btnEditProfile.addEventListener('click', () => {
  location.href = '../pages/profileModification.html';
});
