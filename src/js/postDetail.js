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

    // 날짜 구현 미완성
    // 좋아요 댓글 기능
    const likeCount = json.post.heartCount;
    const commentCount = json.post.commentCount;
    const createdAt = json.post.createdAt
      .slice(0, 11)
      .replace('-', '년 ')
      .replace('-', '월 ')
      .replace('T', '일');

    const profileImg = document.querySelector('.profileImg');
    const nickName = document.querySelector('.nickName');
    const idName = document.querySelector('.idName');
    const postCardMainText = document.querySelector('.postCardMainText');
    const fileImgArea = document.querySelector('.fileImgArea');
    const heartCountTxt = document.querySelector('.heartCountTxt');
    const commentCountTxt = document.querySelector('.commentCountTxt');
    const dateTxt = document.querySelector('.dateTxt');

    profileImg.setAttribute('src', profileImage);
    nickName.textContent = userName;
    idName.textContent = `@ ${accountName}`;
    postCardMainText.textContent = content;
    heartCountTxt.textContent = likeCount;
    commentCountTxt.textContent = commentCount;
    dateTxt.textContent = createdAt;

    const imgUl = document.createElement('ul');
    fileImgArea.appendChild(imgUl);

    if (jsonImg.length >= 1 && jsonImg[0] !== '') {
      jsonImg.map((src) => {
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

  // 메인 설정 모달창
  const mainModal = document.querySelector('.mainModal');
  const iconMoreVertical = document.querySelector('.iconMoreVertical');

  iconMoreVertical.addEventListener('click', () => {
    mainModal.classList.toggle('displayModal');
  });

  iconMoreVertical.addEventListener('blur', (event) => {
    mainModal.classList.remove('displayModal');
  });

  /*로그아웃 모달*/
  const btnGoLogout = document.querySelector('.btnGoLogout');
  const subModal = document.querySelector('#subLogoutModal');
  btnGoLogout.addEventListener('mousedown', (event) => {
    subLogoutModal.classList.add('displayModal');
  });
  /*로그아웃 취소 버튼 기능*/
  const btnCancelLogout = document.querySelector('.btnCancelLogout');
  btnCancelLogout.addEventListener('click', () => {
    subLogoutModal.classList.remove('displayModal');
  });

  //로그아웃
  const btnOkLogout = document.querySelector('.btnOkLogout');
  btnOkLogout.addEventListener('click', () => {
    location.href = '../pages/splash.html';
    localStorage.clear();
  });

  //포스트 게시글 설정 모달
  const postModal = document.querySelector('#postModal');
  const btnDelPost = document.querySelector('#btnDelPost');
  const contPost = document.querySelector('.contPost');
  function openPostSettingModal() {
    let btnPostSetting = document.getElementById('btnPostSetting');
    btnPostSetting.addEventListener('click', (event) => {
      event.stopPropagation();
      postModal.classList.toggle('displayModal');
      btnDelPost.setAttribute(
        'postId',
        event.currentTarget.getAttribute('data-id')
      );
      btnOkDelPost.setAttribute(
        'postId',
        event.currentTarget.getAttribute('data-id')
      );
      btnModifyPost.setAttribute(
        'postId',
        event.currentTarget.getAttribute('data-id')
      );
    });

    document.querySelector('main').addEventListener('click', (event) => {
      postModal.classList.remove('displayModal');
    });
  }
  openPostSettingModal();

  const subDelPostModal = document.querySelector('#subDelPostModal');
  const btnCancelDelPost = document.querySelector('#btnCancelDelPost');
  const btnOkDelPost = document.querySelector('#btnOkDelPost');
  function checkDelPost() {
    // 게시글 셋팅 모달의 '삭제' 버튼 누르기
    btnDelPost.addEventListener('click', (event) => {
      event.stopPropagation();
      subDelPostModal.classList.add('displayModal');
      postModal.classList.remove('displayModal');
    });

    // 게시글 삭제 '취소' 버튼 누르기
    btnCancelDelPost.addEventListener('click', () => {
      subDelPostModal.classList.remove('displayModal');
    });
  }
  checkDelPost();

  //게시글 최종 삭제 버튼 누르기
  async function confirmDelPost() {
    try {
      const res = await fetch(url + '/post/' + postId, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${window.localStorage.getItem('token')}`,
          'Content-type': 'application/json',
        },
        body: JSON.stringify(),
      });
      const json = await res.json();
      alertDelPost(json);
    } catch {
      console.error('ERROR!');
      location.href = './myProfile.html';
    }
  }
  btnOkDelPost.addEventListener('click', confirmDelPost);
}

renderPost();

/*로그아웃 메인 모달*/
