/*게시글 좋아요 버튼, 댓글 버튼 클릭 시 배경 채워짐*/
const btnLike = document.querySelector('#btnLike');
const btnComment = document.querySelector('#btnComment');

// let numLike = 0;
// const numLikeTxt = document.querySelector('#numLike');
// btnLike.addEventListener('click', () => {
//   btnLike.classList.toggle('activeBtnLike');
// });

// btnComment.addEventListener('click', () => {
//   btnComment.classList.toggle('activeBtnComment');
// });

/*메인 모달*/
const btnSetting = document.querySelector('.btnSetting');
const mainModal = document.querySelector('.mainModal');
btnSetting.addEventListener('click', () => {
  mainModal.classList.toggle('displayModal');
});

document.querySelector('main').addEventListener('click', (event) => {
  mainModal.classList.remove('displayModal');
});

/*메인모달에서 뒤로가기*/
const btnBack = document.querySelector('.btnBack');
btnBack.addEventListener('click', () => {
  window.history.go(-1);
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

//로그아웃
const btnOkLogout = document.querySelector('.btnOkLogout');
btnOkLogout.addEventListener('click', () => {
  location.href = '../pages/splash.html';
  localStorage.clear();
});

// /*포스트 게시글 설정 모달*/
// const btnPostSetting = document.querySelector('#btnPostSetting');
// const postModal = document.querySelector('.postModal');
// btnPostSetting.addEventListener('click', (event) => {
//   event.stopPropagation();
//   btnPostSetting.focus();
//   postModal.classList.toggle('displayModal');
// });
// document.querySelector('main').addEventListener('click', (event) => {
//   postModal.classList.remove('displayModal');
// });
// /*포스트 게시글 삭제 확인 모달*/
// const btnDelPost = document.querySelector('#btnDelPost');
// const subDelPostModal = document.querySelector('#subDelPostModal');
// const btnCancelDel = document.querySelector('.btnCancelDel');
// btnDelPost.addEventListener('click', () => {
//   subDelPostModal.classList.add('displayModal');
// });
// /*게시글 삭제 취소 버튼 기능*/
// btnCancelDel.addEventListener('click', () => {
//   subDelPostModal.classList.remove('displayModal');
// });
