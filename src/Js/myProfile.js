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
const url = 'https://mandarin.api.weniv.co.kr';
async function okDelProduct() {
  try {
    const res = await fetch(url + '/product/:product_id', {
      method: 'DELETE',
      headers: {
        'Authorization':
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyY2I4OTc2ODJmZGNjNzEyZjQzODJhZSIsImV4cCI6MTY2Mjc5Nzg5NiwiaWF0IjoxNjU3NjEzODk2fQ.2dhYjxSagUtVf9bsBy8pPb52R2J_nzscfPv_7afguRs',
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

//프로필 정보 보여주기
async function profileInfo() {
  const profileData = {
    profile: {
      _id: '62cb897682fdcc712f4382ae',
      username: '김지수',
      accountname: 'wltn1385',
      intro: '반갑습니다 사랑합니다',
      image: 'http://146.56.183.55:5050/Ellipse.png',
      isfollow: Boolean,
      following: [],
      follower: [],
      followerCount: Number,
      followingCount: Number,
    },
  };
  try {
    const res = await fetch(url + '/profile/:wltn1385', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${window.localStorage.getItem('token')}`,
        'Content-type': 'application/json',
      },
      body: JSON.stringify(profileData),
    });
    const resJson = await res.json();
    console.log(resJson);
  } catch {
    console.error('ERROR!');
  }
}
profileInfo();

console.log(`${window.localStorage.getItem('token')}`);
