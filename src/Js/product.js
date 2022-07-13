const $btnSave = document.querySelector('.btnSave');
const $productForm = document.querySelector('.productForm');
const $inputProductImg = document.querySelector('.inputProductImg');
const $inputProductTitle = document.querySelector('.inputProductTitle');
const $inputProductPrice = document.querySelector('.inputProductPrice');
const $inputProductLink = document.querySelector('.inputProductLink');

// 이미지 업로드

// 상품명 길이 유효성 검사
const checkProductName = () => {
  $inputProductTitle.value.length < 16 && $inputProductTitle.value.length > 1
    ? true // 상품명 2 ~ 15자이면 true
    : false;
  // console.log($inputProductTitle.value.length);
};

// 상품명 1자미만 15자 초과시 error 메시지 처리
// if() {
//   console.log('*2~15자 이내여야 합니다.')
// }

// 가격에 숫자만 입력 가능하도록

// 가격에 숫자 입력하지 않을 경우 error 메시지 처리

// 이미지, 상품명, 가격, 판매링크 모두 입력될 경우 저장버튼 활성화 함수
const handleCheckInput = () => {
  if (
    checkProductName &&
    $inputProductTitle.value &&
    $inputProductPrice.value &&
    $inputProductLink.value
  ) {
    $btnSave.removeAttribute('disabled');
    $btnSave.className = 'btnSaveActive';
  } else {
    $btnSave.setAttribute('disabled', true);
    $btnSave.className = 'btnSave';
  }
  // 이미지 업로드 되는 경우를 추가해야함
};

// 이미지, 상품명, 가격, 판매링크 모두 입력될 경우 저장버튼 활성화 이벤트 리스너
$productForm.addEventListener('input', handleCheckInput);

// POST요청
