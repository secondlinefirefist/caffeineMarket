window.URL = window.URL || window.webkitURL;

const fileSelect = document.getElementById('fileSelect'),
  fileElem = document.getElementById('fileElem'),
  fileList = document.getElementById('fileList');

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

//이미지 가로 스크롤, 여러 파일 업로드
// 다중 파일 업로드, 다중 파일 업로드 시 크기 변경
function handleFiles(files) {
  const ul = document.createElement('ul');
  fileList.appendChild(ul);
  for (let i = 0; i < files.length; i++) {
    const li = document.createElement('li');
    const img = document.createElement('img');
    const deleteImg = document.createElement('div');
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
}
// textArea 자동 줄 채우기
const textArea = document.querySelector('.uploadBoxText');
textArea.addEventListener('input', autoResize, false);
function autoResize() {
  this.style.height = '1px';
  this.style.height = this.scrollHeight + 'px';
}

// x 버튼 추가, 클릭시 이미지 삭제

// 업로드 버튼 클릭 시, POST로 서버에 파일전송 및 피드에 UI 생성
// 1. x버튼 클릭시, 해당 li 제거 (id값?)

document.addEventListener('click', (e) => {
  if (e.target.classList.contains('deleteImg')) {
    e.target.parentNode.remove();
  }
});
