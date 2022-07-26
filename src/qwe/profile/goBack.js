/*메인모달에서 뒤로가기*/
console.log(location.pathname.split('.')[0].split('/')[3]);
const locationPath = location.pathname.split('.')[0].split('/')[3];
const btnBack = document.querySelector('.btnBack');
btnBack.addEventListener('click', () => {
  if (accountname == yourAccountname) {
    location.href = `../pages/${locationPath}.html?accountname=${yourAccountname}`;
  }
  location.href = window.history.go(-1);
});
