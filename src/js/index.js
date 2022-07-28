const localToken = localStorage.getItem('token');
const url = 'https://mandarin.api.weniv.co.kr';

//토큰 유효성 검사
(async function tokenValid() {
  try {
    const res = await fetch(url + '/user/checktoken', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localToken}`,
        'Content-Type': 'application/json',
      },
    });
    const resJson = await res.json();
    console.log(resJson);
    if (resJson.isValid === true) {
      changePageeHome();
    } else {
      splash();
    }
  } catch (err) {
    changePageTo404();
  }
})();

function splash() {
  window.setTimeout(() => {
    location.href = './src/pages/splash.html';
  }, 0);
}

//홈 피드로 이동
function changePageeHome() {
  location.href = './src/pages/home.html';
}
