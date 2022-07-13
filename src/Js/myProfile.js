/*게시글 좋아요 버튼, 댓글 버튼 클릭 시 배경 채워짐*/
const btnLike = document.querySelector('#btnLike');
const btnComment = document.querySelector('#btnComment');

let numLike = 0;
const numLikeTxt = document.querySelector('#numLike');
btnLike.addEventListener('click', () => {
  btnLike.classList.toggle('activeBtnLike');
});

btnComment.addEventListener('click', () => {
  btnComment.classList.toggle('activeBtnComment');
});

/*상품등록 버튼 누르면 판매 상품 리스트 생성*/

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

/*메인 모달*/
const btnSetting = document.querySelector('.btnSetting');
const mainModal = document.querySelector('.mainModal');
btnSetting.addEventListener('click', () => {
  mainModal.classList.toggle('displayModal');
});

document.querySelector('main').addEventListener('click', (event) => {
  mainModal.classList.remove('displayModal');
});

/*로그아웃 모달*/
const btnGoLogout = document.querySelector('.btnGoLogout');
const subModal = document.querySelector('#subLogoutModal');
btnGoLogout.addEventListener('mousedown', (event) => {
  subLogoutModal.classList.add('displayModal');
});
/*로그아웃 취소 버튼 기능*/
const btnCancelLogout = document.querySelector('.btnCancelLogout');
btnCancelLogout.addEventListener('click', () => {
  subLogoutModal.classList.remove('displayModal');
});

/*로그아웃 버튼에 링크 달기*/
const btnOkLogout = document.querySelector('.btnOkLogout');
btnOkLogout.setAttribute('location.href', '../pages/login.html');
// btnOkLogout.addEventListener('click', (event) => {
//   event.target.setAttribute('location.href', '../pages/login.html');
// });

/*포스트 게시글 설정 모달*/
const btnPostSetting = document.querySelector('#btnPostSetting');
const postModal = document.querySelector('.postModal');
btnPostSetting.addEventListener('click', (event) => {
  event.stopPropagation();
  btnPostSetting.focus();
  postModal.classList.toggle('displayModal');
});
document.querySelector('main').addEventListener('click', (event) => {
  postModal.classList.remove('displayModal');
});
/*포스트 게시글 삭제 확인 모달*/
const btnDelPost = document.querySelector('#btnDelPost');
const subDelPostModal = document.querySelector('#subDelPostModal');
const btnCancelDel = document.querySelector('.btnCancelDel');
btnDelPost.addEventListener('click', () => {
  subDelPostModal.classList.add('displayModal');
});
/*게시글 삭제 취소 버튼 기능*/
btnCancelDel.addEventListener('click', () => {
  subDelPostModal.classList.remove('displayModal');
});

/*상품 삭제*/
//message: 유효하지 않은 토큰, 401 unauthorize 오류 뜨는 상태
const url = 'https://mandarin.api.weniv.co.kr';
async function okDelPost() {
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
    // 상품이 삭제되었습니다 메세지가 나오게 일단 해보려교고 넣은 것
  } catch {
    console.error('ERROR!');
  }
}

const btnOkDel = document.querySelector('.btnOkDel');
btnOkDel.addEventListener('click', okDelPost);
