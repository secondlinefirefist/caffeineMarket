const $btnSave = document.querySelector('.btnSave');
const $btnBack = document.querySelector('.btnBack');
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
  filename = await storeImage(event.target);
  console.log(event.target.files[0]);
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
    return resJson.filename;
  } catch (err) {
    console.error(err);
  }
};

// 상품명 길이 유효성 검사
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
const checkProductPrice = () => {
  const $errProductPrice = document.querySelector('.errProductPrice');
  let originNum = $inputProductPrice.value.replace(/,/gi, ''); 
  if (!isNaN(originNum)) {
    $errProductPrice.style.display = 'none';
    $inputProductPrice.value = originNum.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return true;
  } else {
    $errProductPrice.style.display = 'block';
    return false;
  }
};

// 이미지, 상품명, 가격, 판매링크 모두 입력될 경우 저장버튼 활성화
const handleCheckInput = () => {
  if (
    checkProductName() &&
    checkProductPrice() &&
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

// 저장버튼 클릭시 상품 데이터 POST 요청
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
    if (resJson.type == 'entity.too.large') {
      alert('이미지 용량이 너무 큽니다');
    } else {
      alert('상품이 정상적으로 등록되었습니다');
      isProductTrue();
    }
  } catch (err) {
    console.error(err);
    alert('상품 등록이 실패 했습니다. 다시 시도해 주세요');
  }
}

// 상품등록 성공시 페이지전환
const isProductTrue = () => {
  location.href = './myProfile.html';
};

$productForm.addEventListener('input', handleCheckInput);
$btnSave.addEventListener('click', productData);
$btnBack.addEventListener('click', () => {
  window.history.back();
});
$inputProductPrice.addEventListener('input', checkProductPrice);
