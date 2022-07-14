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
};

// 상품명 1자미만 15자 초과시 error 메시지 처리
$inputProductTitle.addEventListener('input', (event) => {
  const $errProductName = document.querySelector('.errProductName');
  if (event.target.value.length < 16 && event.target.value.length > 1) {
    $errProductName.style.display = 'none';
  } else {
    $errProductName.style.display = 'block';
  }
});

// 가격에 숫자만 입력 가능하도록

// 가격에 숫자 입력하지 않을 경우 error 메시지 처리

// 이미지, 상품명, 가격, 판매링크 모두 입력될 경우 저장버튼 활성화 함수
const handleCheckInput = () => {
  if (
    // checkProductName() &&
    $inputProductTitle.value &&
    $inputProductPrice.value &&
    $inputProductLink.value
  ) {
    $btnSave.removeAttribute('disabled');
    $btnSave.className = 'btnSave btnSaveActive';
  } else {
    $btnSave.setAttribute('disabled', true);
    $btnSave.className = 'btnSave';
  }
  // 이미지 업로드 되는 경우를 추가해야함
};


// 저장버튼 클릭시 상품 데이터 POST 요청
const url = 'https://mandarin.api.weniv.co.kr';

async function productData() {
  try {
    const res = await fetch(url + '/product', {
      method: 'POST',
      body: JSON.stringify({
        product: {
          itemName: $inputProductTitle.value,
          price: parseInt($inputProductPrice.value),
          link: $inputProductLink.value,
          itemImage: url,
        },
      }),
      headers: {
        'Authorization':
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyY2Y3MWJkODJmZGNjNzEyZjQ5YWQxYyIsImV4cCI6MTY2Mjk0NjI1OSwiaWF0IjoxNjU3NzYyMjU5fQ.ZZJU2G6yXYACD1gGnoMa_DPYBDCwD2mOWAsBtf5chxI',
        'Content-type': 'application/json',
      },
    });
    const resJson = await res.json();
    console.log(resJson);
  } catch (err) {
    console.error(err);
  }
}

// 상품등록 체크로직

// 상품등록 성공시 페이지전환

// 상품등록 식패시 알림문구 출력

$productForm.addEventListener('input', handleCheckInput);
$btnSave.addEventListener('click', productData);
