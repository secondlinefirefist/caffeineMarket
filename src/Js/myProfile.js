/*상품등록 버튼 누르면 판매 상품 리스트 생성*/
const createProductList = () => {
  const productList = document.querySelector('.productList');
  const productItem = document.createElement('li');
  const productItemBtn = document.createElement('button');
  const productItemImg = document.createElement('img');
  const productItemSpan = document.createElement('span');
  const productItemStrong = document.createElement('strong');

  productList.appendChild(productItem);
  productItem.appendChild(productItemBtn);
  productItemBtn.append(productItemImg, productItemSpan, productItemStrong);
  productItemBtn.setAttribute('class', 'btnProductItem');
  productItemBtn.setAttribute('type', 'button');
  productItemImg.setAttribute('src', '../img/product-img-example.png');
  productItemImg.setAttribute('alt', '상품');
  productItemSpan.classList.add('prodcutTitle');
  productItemSpan.textContent = '애월읍 엄청 큰 낑깡';
  productItemStrong.classList.add('prodcutPrice');
  productItemStrong.textContent = '4500';
};

const btnAddProduct = document.querySelector('.btnAddProduct');
btnAddProduct.addEventListener('click', createProductList);

/*상품 삭제*/
//message: 유효하지 않은 토큰, 401 unauthorize 오류 뜨는 상태
const url = 'https://mandarin.api.weniv.co.kr';
async function okDelPost() {
  try {
    const res = await fetch(url + '/product/:product_id', {
      method: 'DELETE',
      headers: {
        'Authorization':
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyY2I4OTc2ODJmZGNjNzEyZjQzODJhZSIsImV4cCI6MTY2Mjc5Nzg5NiwiaWF0IjoxNjU3NjEzODk2fQ.2dhYjxSagUtVf9bsBy8pPb52R2J_nzscfPv_7afguRs',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(),
    });
    const json = await res.json();
    console.log(json);
    alert(json.message);
    // 상품이 삭제되었습니다 메세지가 나오게 일단 해보려교고 넣은 것
  } catch {
    console.error('ERROR!');
  }
}

const btnOkDel = document.querySelector('.btnOkDel');
btnOkDel.addEventListener('click', okDelPost);
