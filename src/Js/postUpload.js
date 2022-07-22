window.URL = window.URL || window.webkitURL;

const fileSelect = document.getElementById('fileSelect'),
  fileElem = document.getElementById('fileElem'),
  fileList = document.getElementById('fileList'),
  uploadBtn = document.querySelector('.uploadBtn'),
  inputFile = document.querySelector('.inputDisabled');
let filesArray;
const token = localStorage.getItem('token');
const url = 'https://mandarin.api.weniv.co.kr';
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

  uploadBtn.style.backgroundColor = '#F26E22';
  let urls = [];
  uploadBtn.addEventListener('click', async () => {
    await filesArray.forEach(async (f) => {
      const filename = await imgUpload(f);
      console.log(filename);
      urls.push(`${urls}/${filename}`);
    });
    postUpload(urls);
    // window.location.href = './myProfile.html';
    console.log(token);
  });
}
// textArea 자동 줄 채우기
const textArea = document.querySelector('.uploadBoxText');
textArea.addEventListener('input', autoResize, false);
function autoResize() {
  this.style.height = '1px';
  this.style.height = this.scrollHeight + 'px';
}

async function imgUpload(file) {
  try {
    const formData = new FormData();
    formData.append('image', file);
    const res = await fetch(url + '/image/uploadfiles', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    console.log(data);
    return data[0].filename;
  } catch (err) {
    console.log(err);
  }
}

async function postUpload(urls) {
  try {
    const res = await fetch(url + '/post', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        post: {
          content: textArea.value, //textarea value 찾아넣기(0)
          image: urls.join(','), //content. image 값 value 찾아서 넣기 (1)
        },
      }),
    });
    const resJson = await res.json();
    console.log('resJson', resJson);
    // 로컬스토리지 저장하기 (2)
  } catch (err) {
    console.error(err);
  }
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
// 업로드 클릭 시, 페이지 post 페이지로 이동
// post 전송을 통해 post 페이지에 Template 불러오기
