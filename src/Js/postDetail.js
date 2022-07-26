async function renderPost() {
  const postId = location.search.replace('?', '').split('=')[1];
  const url = 'https://mandarin.api.weniv.co.kr';
  const token = localStorage.getItem('token');
  // const accountname = localStorage.getItem('accountname');
  try {
    const res = await fetch(`${url}/post/${postId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-type': 'application/json',
      },
    });
    const json = await res.json();
    // console.log(json);

    //render

    const profileImage = json.post.author.image;
    const userName = json.post.author.username;
    const accountName = json.post.author.accountname;
    const content = json.post.content;
    const jsonImg = json.post.image.split(',');
    // console.log(jsonImg);

    // 날짜 구현 미완성
    // const heartCount = json.post.heartCount;
    // const commentCount = json.post.commentCount;
    // const createdAt = json.post.createdAt
    //   .slice(0, 11)
    //   .replace('-', '년 ')
    //   .replace('-', '월 ')
    //   .replace('T', '일');

    const profileImg = document.querySelector('.profileImg');
    const nickName = document.querySelector('.nickName');
    const idName = document.querySelector('.idName');
    const postCardMainText = document.querySelector('.postCardMainText');
    const fileImgArea = document.querySelector('.fileImgArea');

    profileImg.setAttribute('src', profileImage);
    nickName.textContent = userName;
    idName.textContent = `@ ${accountName}`;
    postCardMainText.textContent = content;

    const imgUl = document.createElement('ul');
    fileImgArea.appendChild(imgUl);

    if (jsonImg.length >= 1 && jsonImg[0] !== '') {
      jsonImg.map((src) => {
        // console.log('src', src);
        const imgLi = document.createElement('li');
        const postImg = document.createElement('img');
        postImg.setAttribute('src', src);
        imgUl.appendChild(imgLi);
        imgLi.appendChild(postImg);
        imgUl.className = 'imgUl';
        imgLi.className = 'imgLi';
        postImg.className = 'postImg';
      });
    }
  } catch (err) {
    // location.href = './page404.html';
    console.error(err);
  }
}

renderPost();
