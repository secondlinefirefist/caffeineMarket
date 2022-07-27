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
const prodId = location.search.split('id=')[1];

// 모든 input창에 해당 상품 데이터 미리 보이도록
const setProductData = (resJson) => {
  $productImg.src = resJson.itemImage;
  $inputProductTitle.value = resJson.itemName;
  $inputProductPrice.value = resJson.price
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  $inputProductLink.value = resJson.link;

  filename = resJson.itemImage;

  if ($productImg.src) {
    $productImg.style.display = 'block';
  }
};

// 이미지 업로드 시 미리보기
const imgPreView = async (event) => {
  let reader = new FileReader();

  reader.onload = (event) => {
    $productImg.setAttribute('src', event.target.result);
    $productImg.style.display = 'block';
  };
  reader.readAsDataURL(event.target.files[0]);
  filename = await storeImage(event.target);
};

// 이미지 PUT요청
const storeImage = async (target) => {
  const formData = new FormData();
  formData.append('image', target.files[0]);
  try {
    const res = await fetch(url + '/image/uploadfile', {
      method: 'POST',
      body: formData,
    });
    const resJson = await res.json();
    console.log(resJson);
    return `${url}/${resJson.filename}`;
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
  let originNum = $inputProductPrice.value.replace(/,/gi, ''); // 콤마를 빈 문자열로 변경
  // 숫자가 아니라면 error 메시지 출력
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
    checkProductPrice() &&
    checkProductName() &&
    ($inputProductImg.files.length ||
      $inputProductTitle.value ||
      $inputProductPrice.value ||
      $inputProductLink.value)
  ) {
    $btnSave.removeAttribute('disabled');
    $btnSave.className = 'btnSave btnSaveActive';
  } else {
    $btnSave.setAttribute('disabled', true);
    $btnSave.className = 'btnSave';
  }
};

// 상품 데이터 GET요청으로 가져오기
(async function getProductData() {
  try {
    const res = await fetch(url + `/product/detail/${prodId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-type': 'application/json',
      },
    });
    const resJson = await res.json();
    setProductData(resJson.product);
  } catch (err) {
    console.error(err);
  }
})();

// 저장버튼 클릭시 상품 데이터 PUT 요청

async function productData() {
  try {
    const res = await fetch(url + `/product/${prodId}`, {
      method: 'PUT',
      body: JSON.stringify({
        product: {
          itemName: $inputProductTitle.value,
          price: parseInt($inputProductPrice.value.replaceAll(',', '')),
          link: $inputProductLink.value,
          itemImage: filename,
        },
      }),
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-type': 'application/json',
      },
    });
    const resJson = await res.json();
    console.log(resJson);
    console.log(resJson.type);
    if (resJson.type == 'entity.too.large') {
      alert('이미지 용량이 너무 큽니다');
    } else {
      isProductTrue();
    }
    alert('상품이 정상적으로 수정되었습니다');
    isProductTrue();
  } catch (err) {
    console.error(err);
    alert('상품 수정이 실패 했습니다. 다시 시도해 주세요');
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

$btnBack.addEventListener('click', () => {
  window.history.back();
});

// prodid값 체크
const checkProdId = () => {
  if (prodId) {
    return prodId;
  } else {
    return null;
  }
};
