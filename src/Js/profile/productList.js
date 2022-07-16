// 상품 정보 불러오기
(async function productInfo() {
  try {
    const res = await fetch(url + '/product/' + accountname, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${window.localStorage.getItem('token')}`,
        'Content-type': 'application/json',
      },
    });
    const resJson = await res.json();
    console.log(resJson, 'resjson');
    prodcutListDummy = resJson.product;
    createProductList(prodcutListDummy);
  } catch {
    console.error('ERROR!');
  }
})();

//판매 상품 리스트 생성
const productList = document.querySelector('.productList');
function createProductList() {
  console.log(prodcutListDummy, 'test');
  for (let i = 0; i < prodcutListDummy.length; i++) {
    const li = document.createElement('li');
    const button = document.createElement('button');
    const img = document.createElement('img');
    const span = document.createElement('span');
    const strong = document.createElement('strong');

    productList.appendChild(li);
    li.appendChild(button);
    button.append(img, span, strong);

    button.setAttribute('type', 'button');
    button.setAttribute('class', 'btnProductItem');
    button.setAttribute('value', parseInt([i]));

    img.setAttribute('src', '#');
    img.setAttribute('alt', '상품이미지');

    span.setAttribute('class', 'productTitle');
    span.textContent = `${prodcutListDummy[i].itemName}`;
    strong.setAttribute('class', 'productPrice');
    strong.textContent = `${prodcutListDummy[i].price
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
  }
  onProductSettingModal();
}

const productModal = document.querySelector('.productModal');
function onProductSettingModal() {
  // 상품 리스트 설정 모달 열기
  let btnProductItem = document.querySelectorAll('.btnProductItem');
  for (let i = 0; i < btnProductItem.length; i++) {
    btnProductItem[i].addEventListener('click', (event) => {
      event.stopPropagation();
      productModal.classList.toggle('displayModal');
    });
  }
  // 메인 눌렀을 때도 모달이 닫힐 수 있게 설정
  document.querySelector('main').addEventListener(
    'click',
    (event) => {
      productModal.classList.remove('displayModal');
    },
    true
  );
}

// 상품 삭제 마지막 확인 모달
const btnDelProduct = document.querySelector('#btnDelProduct');
const subDelProductModal = document.querySelector('#subDelProductModal');
function openCheckDelProductModal() {
  btnDelProduct.addEventListener('click', (event) => {
    event.stopPropagation();
    subDelProductModal.classList.toggle('displayModal');
  });
}
openCheckDelProductModal();

//상품 삭제
async function okDelProduct() {
  const productId = prodcutListDummy[0].id;
  try {
    const res = await fetch(url + '/product/' + productId, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${window.localStorage.getItem('token')}`,
        'Content-type': 'application/json',
      },
      body: JSON.stringify(),
    });
    const json = await res.json();
    confirm(json.message);
    location.reload();
  } catch {
    console.error('ERROR!');
  }
}

const btnOkDeleteProdcut = document.querySelector('#btnOkDeleteProdcut');
btnOkDeleteProdcut.addEventListener('click', okDelProduct);
