window.URL = window.URL || window.webkitURL;

const fileSelect = document.getElementById('fileSelect'),
  fileElem = document.getElementById('fileElem'),
  fileList = document.getElementById('fileList'),
  inputFile = document.querySelector('.inputDisabled');
let filesArray;

fileSelect.addEventListener(
  'click',
  function (e) {
    if (fileElem) {
      fileElem.click();
    }
    e.preventDefault();
  },
  false
);

function handleFiles(files) {
  const ul = document.createElement('ul');
  fileList.appendChild(ul);
  for (let i = 0; i < files.length; i++) {
    const li = document.createElement('li');
    const img = document.createElement('img');
    const deleteImg = document.createElement('div');
    deleteImg.dataset.id = files[i].name;
    ul.classList.add('imgUl');
    li.classList.add('imgLi');
    deleteImg.classList.add('deleteImg');
    ul.appendChild(li);
    li.appendChild(img);
    li.appendChild(deleteImg);
    img.src = window.URL.createObjectURL(files[i]);
    img.onload = function () {
      window.URL.revokeObjectURL(this.src);
    };
  }
  filesArray = Array.from(files);
}
// textArea 자동 줄 채우기
const textArea = document.querySelector('.uploadBoxText');
textArea.addEventListener('input', autoResize, false);
function autoResize() {
  this.style.height = '1px';
  this.style.height = this.scrollHeight + 'px';
}

// x 버튼 추가, 클릭시 이미지 삭제
// fileList index 대상 파일 삭제
// post 시, 삭제된 파일 전송 불가 기능
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('deleteImg')) {
    const list = [...e.target.parentElement.parentElement.children];
    const index = list.indexOf(e.target.parentElement);
    filesArray.splice(index, 1);
    e.target.parentNode.remove();
  }
});

// 업로드 버튼 클릭 시, POST로 서버에 파일전송 및 피드에 UI 생성
// 1. x버튼 클릭시, 해당 li 제거 (id값?)
