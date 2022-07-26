//로컬스토리지 토큰 있을 경우 피드로 바로 이동하기
const loginToken = localStorage.getItem('token');

function isStartLoginTrue() {
  loginToken && (location.href = './home.html');
}
isStartLoginTrue();
