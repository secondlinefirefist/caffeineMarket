const $btnSetting = document.querySelector('.btnSetting');
const $btnTextSubmit = document.querySelector('.btnTextSubmit');
const $inputImg = document.querySelector('#inputImg');
const $inputChatText = document.querySelector('.inputChatText');
const $chatRoom = document.querySelector('.chatRoom');
const $mainModal = document.querySelector('.mainModal');
const $btnModalClose = document.querySelector('.btnModalClose');

const url = 'https://mandarin.api.weniv.co.kr';
const token = window.localStorage.getItem('token');
const accountname = location.search.replace('?', '').split('=')[1];

// 메시지 입력시 true 반환
const checkMessage = () => {
  if ($inputChatText.value) {
    return true;
  } else {
    return false;
  }
};

// 메시지 입력 시 전송 버튼 활성화

const handleCheckMessage = () => {
  if (checkMessage()) {
    $btnTextSubmit.removeAttribute('disabled');
    $btnTextSubmit.className = 'btnTextSubmit btnActive';
  } else {
    $btnTextSubmit.setAttribute('disabled', true);
    $btnTextSubmit.className = 'btnTextSubmit';
  }
};

const date = new Date();
const time = date.getHours() + ':' + date.getMinutes() + '';
// 전송버튼 누르면 말풍선 렌더링
const handleTextSend = () => {
  $chatRoom.innerHTML += `
  <li class="chatContent myChatContent">
  <strong class="chatTime">${time}</strong>
  <p class="chatText">${$inputChatText.value}</p>
</li>
  `;
  $inputChatText.value = '';
  handleCheckMessage();
};

// 이미지 업로드 시 채팅창에서 미리보기
const imgPreView = (event) => {
  let reader = new FileReader();

  reader.onload = (event) => {
    $chatRoom.innerHTML += ` 
    <li class="chatContent myChatContent">
    <strong class="chatTime">${time}</strong>
    <img src=${event.target.result} alt="업로드 이미지" class="chatImg" />
    </li>`;
  };
  reader.readAsDataURL(event.target.files[0]);
};

// 설정 버튼 클릭 시 모달 창 보이도록
// 채팅방 나가기 버튼 클릭 시 채팅 리스트로 이동
$btnSetting.addEventListener('click', () => {
  $mainModal.classList.toggle('displayModal');
});

// 닫기 버튼 클릭시 모달 버튼 없애기
const closeModal = () => {
  $mainModal.className = 'mainModal';
};

$inputChatText.addEventListener('input', handleCheckMessage);
$btnTextSubmit.addEventListener('click', handleTextSend);
$btnModalClose.addEventListener('click', closeModal);

document.querySelector('.btnBack').addEventListener('click', () => {
  location.href = './chatList.html';
});

//  팔로잉 유저 GET요청으로 불러오기
(async function chatRoomData() {
  try {
    const res = await fetch(url + '/profile/' + accountname, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-type': 'application/json',
      },
    });
    const resJson = await res.json();
    console.log(resJson);
    showUser(resJson);
  } catch {
    console.error('err');
  }
})();

const showUser = (resJson) => {
  const $chatUserProfile = document.querySelectorAll('.chatUserProfile');
  for(i=0; i < $chatUserProfile.length; i ++){
  $chatUserProfile[i].setAttribute('src', resJson.profile.image);}
};

// WebSocket 접속
const socket = io();
