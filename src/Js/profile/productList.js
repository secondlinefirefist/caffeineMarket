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
    showSwitchProduct(resJson);
    console.log(resJson, '상품목록');
    prodcutListDummy = resJson.product;
    createProductList(prodcutListDummy);
  } catch {
    console.error('ERROR!');
  }
})();

// 상품 품목 없으면 상품 마크업 아예 안 보이기
const contSale = document.querySelector('.contSale');
function showSwitchProduct(resJson) {
  if (resJson.data == 0) {
    contSale.style.display = 'none';
  }
}

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
    li.setAttribute('data-id', `${prodcutListDummy[i].id}`);

    button.append(img, span, strong);

    button.setAttribute('type', 'button');
    button.setAttribute('class', 'btnProductItem');
    button.setAttribute('data-id', `${prodcutListDummy[i].id}`);
    button.setAttribute('data-link', `${prodcutListDummy[i].link}`);

    img.setAttribute('src', `${prodcutListDummy[i].itemImage}`);
    img.setAttribute('alt', '상품이미지');

    span.setAttribute('class', 'productTitle');
    span.textContent = `${prodcutListDummy[i].itemName}`;

    strong.setAttribute('class', 'productPrice');
    strong.textContent = `${prodcutListDummy[i].price
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 원`;
  }
  onProductSettingModal();
}

const productModal = document.querySelector('.productModal');
const btnGoStore = document.querySelector('.btnGoStore');
function onProductSettingModal() {
  // 상품 리스트 설정 모달 열기
  let btnProductItem = document.querySelectorAll('.btnProductItem');
  for (let i = 0; i < btnProductItem.length; i++) {
    btnProductItem[i].addEventListener('click', (event) => {
      event.stopPropagation();
      productModal.classList.toggle('displayModal');
      btnDelProduct.setAttribute(
        'dataId',
        event.currentTarget.getAttribute('data-id')
      );
      btnModifyProduct.setAttribute(
        'dataId',
        event.currentTarget.getAttribute('data-id')
      );
      btnGoStore.setAttribute(
        'datalink',
        event.currentTarget.getAttribute('data-link')
      );
      console.log(event.currentTarget);
    });
  }
  document.querySelector('main').addEventListener('click', () => {
    productModal.classList.remove('displayModal');
  });
}

// 상품 삭제 마지막 확인 모달
const btnCancelDelProduct = document.querySelector('#btnCancelDelProduct');
const btnDelProduct = document.querySelector('#btnDelProduct');
const subDelProductModal = document.querySelector('#subDelProductModal');
function openCheckDelProductModal() {
  btnDelProduct.addEventListener('click', (event) => {
    event.stopPropagation();
    subDelProductModal.classList.toggle('displayModal');
  });

  btnCancelDelProduct.addEventListener('click', (event) => {
    subDelProductModal.classList.remove('displayModal');
  });
}
openCheckDelProductModal();

//상품 삭제
async function delProduct() {
  const productId = btnDelProduct.getAttribute('dataId');
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
    okDelProducItem(json);
  } catch {
    console.error('ERROR!');
  }
}

function okDelProducItem(json) {
  if (json.message == '등록된 상품이 없습니다.') {
    alert(json.message);
  }
  if (json.message == '잘못된 요청입니다. 로그인 정보를 확인하세요.') {
    alert(json.message);
  }
  location.reload();
}

const btnOkDeleteProdcut = document.querySelector('#btnOkDeleteProdcut');
btnOkDeleteProdcut.addEventListener('click', delProduct);

//상품 등록
const btnAddProduct = document.querySelector('.btnAddProduct');
btnAddProduct.addEventListener('click', () => {
  location.href = '../pages/product.html';
});

// 상품 수정
const btnModifyProduct = document.querySelector('.btnModifyProduct');
btnModifyProduct.addEventListener('click', (event) => {
  location.href =
    '../pages/productModification.html?id=' +
    event.target.getAttribute('dataId');
});

// 웹사이트에서 상품 보기
(function goStoreSite() {
  btnGoStore.addEventListener('click', (event) => {
    location.href = event.currentTarget.getAttribute('datalink');
  });
})();
