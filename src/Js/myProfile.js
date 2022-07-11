/*데이터 불러오기*/

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
const logout = document.querySelector('#logout');
btnGoLogout.addEventListener('mousedown', (event) => {
  logout.classList.add('displayModal');
});

const btnCancelLogout = document.querySelector('.btnCancelLogout');
btnCancelLogout.addEventListener('click', () => {
  logout.classList.remove('displayModal');
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
  console.log('버튼');
  btnPostSetting.focus();
  postModal.classList.toggle('displayModal');
});
document.querySelector('main').addEventListener('click', (event) => {
  console.log('main');
  postModal.classList.remove('displayModal');
});
