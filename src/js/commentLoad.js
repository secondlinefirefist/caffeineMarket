async function commentLoad() {
  const postId = location.search.replace('?', '').split('=')[1];
  const url = 'https://mandarin.api.weniv.co.kr';
  const token = localStorage.getItem('token');

  try {
    const res = await fetch(`${url}/post/${postId}/comments`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-type': 'application/json',
      },
    });
    const json = await res.json();
    // console.log(json);

    for (let i = 0; i < json.comments.length; i++) {
      const element = json.comments[i];
      const profileImg = element.author.image;
      const userName = element.author.username;
      const accountName = element.author.accountname;
      const content = element.content;
      const commentId = element.id;
      // const createdAt = element.createdAt.createdAt
      //   .slice(0, 11)
      //   .replace('-', '년 ')
      //   .replace('-', '월 ')
      //   .replace('T', '일');

      const div1 = document.querySelector('.commentComponent');
      // div.textContent = '';
      const div2 = document.createElement('div');
      const div3 = document.createElement('div');
      const div4 = document.createElement('div');
      const img1 = document.createElement('img');
      const img2 = document.createElement('img');
      const p1 = document.createElement('p');
      const p2 = document.createElement('p');
      const p3 = document.createElement('p');
      const btn = document.createElement('button');

      div2.className = 'commentProfileInfo';
      div3.className = 'commentAndNames';
      div4.className = 'commentNames';
      img1.className = 'commentProfileImg';
      p1.className = 'commentNickName';
      p2.className = 'commentWrittenTime';
      p3.className = 'commentText';
      btn.className = 'commonSetting';

      div1.append(div2);
      div2.append(img1, div3, btn);
      div3.append(div4, p3);
      div4.append(p1, p2);
      btn.append(img2);

      img1.setAttribute('src', profileImg);
      img1.setAttribute('alt', '회원 프로필');
      img2.setAttribute('src', '../img/icon/s-icon-more-vertical.png');
      p1.textContent = accountName;
      p3.textContent = content;
    }
  } catch (err) {
    console.log(err);
  }
}

commentLoad();

async function renderProfile() {
  const url = 'https://mandarin.api.weniv.co.kr';
  const token = localStorage.getItem('token');
  const accountName = localStorage.getItem('accountname');
  const inputProfileImg = document.querySelector('.inputProfileImg');
  try {
    const res = await fetch(url + '/profile/' + accountName, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    const json = await res.json();
    // console.log(json);
    inputProfileImg.setAttribute('src', json.profile.image);
  } catch (err) {
    console.error(err);
  }
}
renderProfile();

const commentPostBtn = document.querySelector('.commentPostBtn');
const inputCommentText = document.querySelector('.inputCommentText');
// 게시 버튼 활성화
function checkValue() {
  if (inputCommentText.value !== '') {
    commentPostBtn.disabled = false;
    commentPostBtn.style.color = '#664836';
  } else {
    commentPostBtn.disabled = true;
    commentPostBtn.style.color = '#b3a49b';
  }
}
inputCommentText.addEventListener('input', checkValue);
async function uploadComment() {
  const postId = location.search.replace('?', '').split('=')[1];
  const url = 'https://mandarin.api.weniv.co.kr';
  const token = localStorage.getItem('token');
  console.log(inputCommentText.value);

  try {
    const res = await fetch(url + '/post/' + postId + '/comments', {
      method: 'POST',
      body: JSON.stringify({
        comment: {
          content: `${inputCommentText.value}`,
        },
      }),
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-type': 'application/json',
      },
    });
    const json = await res.json();
    console.log(json);
    inputCommentText.value = '';
    checkValue();
  } catch (err) {
    console.log(err);
  }
}

commentPostBtn.addEventListener('click', uploadComment);
