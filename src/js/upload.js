window.URL = window.URL || window.webkitURL;

const fileSelect = document.getElementById('fileSelect'),
  fileElem = document.getElementById('fileElem'),
  fileList = document.getElementById('fileList'),
  uploadBtn = document.querySelector('.uploadBtn'),
  inputFile = document.querySelector('.inputDisabled'),
  fileImgArea = document.getElementById('#fileImgArea');
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

// 프로필 이미지 불러오기
async function renderProfile() {
  const accountName = localStorage.getItem('accountname');
  const profileImg = document.querySelector('.profileImg');
  try {
    const res = await fetch(url + '/profile/' + accountName, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    const json = await res.json();
    console.log(json);
    profileImg.setAttribute('src', json.profile.image);
  } catch (err) {
    console.error(err);
  }
}
renderProfile();
uploadBtn.disabled = true;
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
  }
  filesArray = Array.from(files);
  uploadBtn.disabled = false;
  let urls = [];
  uploadBtn.addEventListener('click', async () => {
    await filesArray.forEach(async (f, index) => {
      const filename = await imgUpload(f);
      console.log('filename', filename);
      urls.push(`${url}/${filename}`);
      if (filesArray.length - 1 === index) {
        postUpload(urls);
        setTimeout(() => {
          alert('업로드가 완료되었습니다 :)');
          window.location.href = './myProfile.html';
        }, 2000);
      }
    });
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
    return data[0].filename;
  } catch (err) {
    console.log(err);
  }
}

async function postUpload(urls) {
  console.log('post urls', urls);
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
    console.log(resJson);
    // 로컬스토리지 저장하기 (2)
  } catch (err) {
    console.error(err);
  }
}

// 업로드 전 이미지, 이미지 데이터 삭제
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('deleteImg')) {
    const list = [...e.target.parentElement.parentElement.children];
    const index = list.indexOf(e.target.parentElement);
    filesArray.splice(index, 1);
    e.target.parentNode.remove();
    // 이미지를 모두 지우는 경우, 업로드 버튼 비활성화
    if (filesArray.length === 0) {
      uploadBtn.disabled = true;
    }
  }
});
