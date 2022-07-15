const $btnTextSubmit = document.querySelector('.btnTextSubmit');
const $inputImg = document.querySelector('#inputImg');
const $inputChatText = document.querySelector('.inputChatText');

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

// 이미지 업로드 시 미리보기

// 채팅방 나가기 버튼 클릭 시 채팅 리스트로 이동

$inputChatText.addEventListener('input', handleCheckMessage);
