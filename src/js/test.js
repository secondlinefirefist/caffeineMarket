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

function handleFiles(files) {
  const list = document.createElement('ul');
  fileList.appendChild(list);
  for (let i = 0; i < files.length; i++) {
    const li = document.createElement('li');
    list.style.display = 'flex';
    list.style.overflowX = 'scroll';
    list.appendChild(li);

    const img = document.createElement('img');
    const deleteImg = document.createElement('img');
    img.src = window.URL.createObjectURL(files[i]);
    img.width = 168;
    img.onload = function () {
      window.URL.revokeObjectURL(this.src);
    };
    li.appendChild(img);
    img.style.position = 'relative';
    deleteImg.backgroundImage = "url('../img/home.png')";
    deleteImg.position = 'absolute';
    deleteImg.top = 0;
    deleteImg.right = 0;
    deleteImg.width = 11;
    deleteImg.zIndex = 2;
    li.appendChild(deleteImg);
    console.log('img.src: ' + img.src);
    console.log('deleteImg.backgroundImage: ' + deleteImg.backgroundImage);
    // deleteImg.src = '../img/icon/icon-delete.png';
  }
}
// textArea 자동 줄 채우기
const textArea = document.querySelector('.uploadBoxText');
textArea.addEventListener('input', autoResize, false);
function autoResize() {
  this.style.height = '1px';
  this.style.height = this.scrollHeight + 'px';
}

// 다중 파일 업로드, 다중 파일 업로드 시 크기 변경
// x 버튼 추가, 클릭시 이미지 삭제
// 업로드 버튼 클릭 시, POST로 서버에 파일전송 및 피드에 UI 생성
