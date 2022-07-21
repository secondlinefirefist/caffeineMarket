const $btnSave = document.querySelector('.btnSave');
const $productForm = document.querySelector('.productForm');
const $inputProductImg = document.querySelector('.inputProductImg');
const $inputProductTitle = document.querySelector('.inputProductTitle');
const $inputProductPrice = document.querySelector('.inputProductPrice');
const $inputProductLink = document.querySelector('.inputProductLink');
const $productImg = document.querySelector('.productImg');

const url = 'https://mandarin.api.weniv.co.kr';
const token = window.localStorage.getItem('token');
let filename = '';

// 이미지 업로드 시 미리보기
const imgPreView = async (event) => {
  let reader = new FileReader();

  reader.onload = (event) => {
    $productImg.setAttribute('src', event.target.result);
    $productImg.style.display = 'block';
  };
  reader.readAsDataURL(event.target.files[0]);
  filename = await storeImage(event.target); // 리턴 받은 파일명을 filename에 저장
  console.log(event.target.files[0])
};

// 이미지 POST요청
const storeImage = async (target) => {
  const formData = new FormData();
  formData.append('image', target.files[0]);
  try {
    const res = await fetch(url + '/image/uploadfile', {
      method: 'POST',
      body: formData,
    });
    const resJson = await res.json();
    return resJson.filename; // 응답 중 filename 리턴
  } catch (err) {
    console.error(err);
  }
};

// 상품명 길이 유효성 검사 -> if문 리턴으로

const checkProductName = () => {
  if (
    $inputProductTitle.value.length < 16 &&
    $inputProductTitle.value.length > 1
  ) {
    return true;
  } else {
    return false;
  }
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

// 상품 가격 유효성 검사
const checkProductPrice = (event) => {
  const $errProductPrice = document.querySelector('.errProductPrice');
  let originNum = event.target.value.replace(/,/gi, ''); // 콤마를 빈 문자열로 변경
  // 숫자가 아니라면 error 메시지 출력
  if (isNaN(originNum)) {
    $errProductPrice.style.display = 'block';
  } else {
    $errProductPrice.style.display = 'none';
    // 가격자동 원단위 콤마 표시
    event.target.value = originNum.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
};

// 이미지, 상품명, 가격, 판매링크 모두 입력될 경우 저장버튼 활성화 함수
const handleCheckInput = () => {
  if (
    checkProductName() &&
    $inputProductImg.files.length &&
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
};

// 저장버튼 클릭시 상품 데이터 POST 요청(이미지 업로드 미구현)

async function productData() {
  try {
    const res = await fetch(url + '/product', {
      method: 'POST',
      body: JSON.stringify({
        product: {
          itemName: $inputProductTitle.value,
          price: parseInt($inputProductPrice.value.replaceAll(',', '')),
          link: $inputProductLink.value,
          itemImage: `${url}/${filename}`, 
        },
      }),
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-type': 'application/json',
      },
    });
    const resJson = await res.json();
    console.log(resJson);
    alert('상품이 정상적으로 등록되었습니다');
    if (resJson.type == 'entity.too.large') {
      alert('이미지 용량이 너무 큽니다');
      // location.href = './page404.html';
    } else {
      isProductTrue();
    }
  } catch (err) {
    console.error(err);
    location.href = './page404.html';
  }
}

// 상품등록 성공시 페이지전환
const isProductTrue = () => {
  location.href = './myProfile.html';
};

// 상품등록 실패시 알림문구 출력

$productForm.addEventListener('input', handleCheckInput);
$btnSave.addEventListener('click', productData);
$inputProductPrice.addEventListener('input', checkProductPrice);

