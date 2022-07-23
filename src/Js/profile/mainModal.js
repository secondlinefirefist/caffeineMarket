/*메인 모달*/
const btnSetting = document.querySelector('.btnSetting');
const mainModal = document.querySelector('.mainModal');
btnSetting.addEventListener('click', () => {
  mainModal.classList.toggle('displayModal');
});

btnSetting.addEventListener('blur', (event) => {
  mainModal.classList.remove('displayModal');
});

/*메인모달에서 뒤로가기*/
const btnBack = document.querySelector('.btnBack');
btnBack.addEventListener('click', () => {
  window.history.back();
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
