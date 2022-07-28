/*메인모달에서 뒤로가기*/
const locationPath = location.pathname.split('.')[0].split('/')[3];
const btnBack = document.querySelector('.btnBack');
btnBack.addEventListener('click', () => {
  if (accountname == yourAccountname) {
    location.href = `../pages/${locationPath}.html?accountname=${yourAccountname}`;
  } else if (accountname == myAccountname) {
    location.href = `../pages/${locationPath}.html`;
  }
  location.href = window.history.back();
});
