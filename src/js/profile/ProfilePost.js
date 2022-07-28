//post data 가져오기
(async function postData() {
  try {
    const res = await fetch(
      url + '/post/' + accountname + '/userpost/?limit=100',
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-type': 'application/json',
        },
      }
    );
    const resJson = await res.json();
    if (resJson.post != '') {
      postType.classList.remove('postTypeHide');
    }
    if (resJson.post == '') {
      postType.classList.add('postTypeHide');
    }
    createPostFeed(resJson);
    createGridFeed(resJson);
    clickLike(resJson);
  } catch {
    console.error('ERROR');
  }
})();

const wrapPost = document.querySelector('.wrapPost');
const postIndexList = document.querySelector('.postIndexList');
const postType = document.querySelector('.postType');
const postGridList = document.querySelector('.postGridList');

//그리드 타입 변환
// 그리드 타입 보기 버튼
const btnGridTypeImg = document.querySelector('#btnGridTypeImg');
const btnListTypeImg = document.querySelector('#btnListTypeImg');
const gridType = document.querySelector('.gridType');
gridType.addEventListener('click', () => {
  postIndexList.classList.add('postTypeHide');
  postGridList.classList.add('postGridShow');
  postGridList.classList.remove('postGridList');
  btnGridTypeImg.classList.add('btnGridTypeOn');
  btnListTypeImg.classList.remove('btnListTypeOn');
});
// 리스트 타입 피드 보기 버튼
const listType = document.querySelector('.listType');
listType.addEventListener('click', () => {
  postIndexList.classList.remove('postTypeHide');
  postGridList.classList.remove('postGridShow');
  postGridList.classList.add('postGridList');
  btnGridTypeImg.classList.remove('btnGridTypeOn');
  btnListTypeImg.classList.add('btnListTypeOn');
});

// 그리드 타입 피드 보기
function createGridFeed(resJson) {
  for (let i = 0; i < resJson.post.length; i++) {
    if (resJson.post[i].image != '') {
      const li = document.createElement('li'),
        btnGrid = document.createElement('button'),
        imgGrid = document.createElement('img');
      postGridList.appendChild(li);
      li.appendChild(btnGrid);
      btnGrid.appendChild(imgGrid);

      btnGrid.setAttribute('type', 'button');
      btnGrid.setAttribute('id', 'goDetailPost');
      btnGrid.setAttribute('commentid', resJson.post[i].id);
      imgGrid.setAttribute('src', resJson.post[i].image.split(',')[0]);
      imgGrid.setAttribute('alt', '그리드 게시 사진');
      imgGrid.setAttribute('class', 'imgGrindPost');
    }
  }
  goPostDetailComment();
  goPostDetailPage();
}

// 리스트 타입 피드 보기
function createPostFeed(resJson) {
  for (let i = 0; i < resJson.post.length; i++) {
    const li = document.createElement('li'),
      imgProfile = document.createElement('img'),
      postWrap = document.createElement('div'),
      postSetting = document.createElement('button'),
      userName = document.createElement('strong'),
      postSettingImg = document.createElement('img'),
      account = document.createElement('p'),
      text = document.createElement('p'),
      wrapPostImage = document.createElement('div');
    (wrapReaction = document.createElement('div')),
      (likeBtn = document.createElement('button')),
      (likeImage = document.createElement('img')),
      (likeNumber = document.createElement('span')),
      (commentBtn = document.createElement('button')),
      (commentImage = document.createElement('img')),
      (commentNumber = document.createElement('span')),
      (date = document.createElement('p'));

    postWrap.append(
      userName,
      postSetting,
      account,
      text,
      wrapPostImage,
      wrapReaction,
      date
    );
    //사진 만들기
    const countImages = resJson.post[i].image.split(',').length;
    if (resJson.post[i].image != '') {
      if (countImages > 1) {
        for (let x = 0; x < countImages; x++) {
          let postImage = document.createElement('img');
          wrapPostImage.appendChild(postImage);
          wrapPostImage.setAttribute(
            'class',
            'wrapPostImage wrapPostImageScroll'
          );
          postImage.setAttribute('class', 'imgIndexPost');
          postImage.setAttribute('alt', '게시 사진');
          postImage.setAttribute('src', resJson.post[i].image.split(',')[x]);
        }
      } else if (countImages <= 1) {
        let postImage = document.createElement('img');
        wrapPostImage.appendChild(postImage);
        wrapPostImage.setAttribute('class', 'wrapPostImage');
        postImage.setAttribute('class', 'imgIndexPost');
        postImage.setAttribute('alt', '게시 사진');
        postImage.setAttribute('src', resJson.post[i].image);
      }
    }

    postIndexList.append(li);
    li.append(imgProfile, postWrap);
    postWrap.setAttribute('class', 'postIndexCont');
    imgProfile.setAttribute('class', 'imgPostProfile');
    imgProfile.setAttribute('src', resJson.post[i].author.image);
    imgProfile.setAttribute('alt', '게시글 저자 프로필 사진');

    postSetting.appendChild(postSettingImg);
    postSetting.setAttribute('type', 'button');
    postSetting.setAttribute('class', 'btnPostSetting');
    postSetting.setAttribute('data-id', resJson.post[i].id);
    userName.setAttribute('class', 'titleMarket');
    userName.textContent = resJson.post[i].author.username;
    account.setAttribute('class', 'marketId');
    account.textContent = '@ ' + resJson.post[i].author.accountname;
    postSettingImg.setAttribute('src', '../img/icon/s-icon-more-vertical.png');
    postSettingImg.setAttribute('alt', '설정으로가기');
    postSettingImg.setAttribute('id', 'btnPostSetting');
    text.setAttribute('class', 'postIndexText');
    text.textContent = resJson.post[i].content;
    date.setAttribute('class', 'dateTxt');
    date.textContent = resJson.post[i].createdAt
      .slice(0, 11)
      .replace('-', '년 ')
      .replace('-', '월 ')
      .replace('T', '일');
    wrapReaction.append(likeBtn, commentBtn);
    likeBtn.append(likeImage, likeNumber);
    commentBtn.append(commentImage, commentNumber);

    wrapReaction.setAttribute('class', 'wrapBtnReaction');
    likeBtn.setAttribute('type', 'button');
    likeBtn.setAttribute('id', 'likeBtn');
    likeBtn.setAttribute('hearted', resJson.post[i].hearted);
    likeBtn.setAttribute('likeid', resJson.post[i].id);
    likeImage.setAttribute('alt', '좋아요 버튼');
    if (likeBtn.getAttribute('hearted') == 'true') {
      likeImage.setAttribute('src', '../img/icon/icon-heart-active.png');
    } else if (likeBtn.getAttribute('hearted') == 'false') {
      likeImage.setAttribute('src', '../img/icon/icon-heart.png');
    }
    likeImage.setAttribute('id', 'btnLikeImg');
    likeNumber.setAttribute('id', 'numLike');
    likeNumber.textContent = resJson.post[i].heartCount;

    commentBtn.setAttribute('type', 'button');
    commentBtn.setAttribute('id', 'commentButton');
    commentBtn.setAttribute('commentid', resJson.post[i].id);
    commentImage.setAttribute('src', '../img/icon/icon-message-circle.png');
    commentImage.setAttribute('alt', '댓글 버튼');
    commentImage.setAttribute('id', 'btnComment');
    commentNumber.textContent = resJson.post[i].commentCount;
  }
  openPostSettingModal();
}

//포스트 게시글 설정 모달
const postModal = document.querySelector('#postModal');
const btnDelPost = document.querySelector('#btnDelPost');
const contPost = document.querySelector('.contPost');
function openPostSettingModal() {
  let btnPostSetting = document.querySelectorAll('.btnPostSetting');
  for (let i = 0; i < btnPostSetting.length; i++) {
    btnPostSetting[i].addEventListener('click', (event) => {
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
  }
  document.querySelector('main').addEventListener('click', (event) => {
    postModal.classList.remove('displayModal');
  });
}

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
  const productId = btnOkDelPost.getAttribute('postid');
  try {
    const res = await fetch(url + '/post/' + productId, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-type': 'application/json',
      },
      body: JSON.stringify(),
    });
    const json = await res.json();
    alertDelPost(json);
  } catch {
    console.error('ERROR!');
  }
}
btnOkDelPost.addEventListener('click', confirmDelPost);

// 게시글 삭제 fail되면 알려주기
function alertDelPost(json) {
  if (json.message == '존재하지 않는 게시글입니다.') {
    alert(json.message);
  } else if (accountname != myAccountname) {
    alert('잘못된 접근입니다. 계정을 확인해주세요🔥');
  }
  location.reload();
}

// 게시글 수정 넘겨주기
const btnModifyPost = document.querySelector('#btnModifyPost');
btnModifyPost.addEventListener('click', (event) => {
  location.href =
    '../pages/upload.html?id=' + event.currentTarget.getAttribute('postid');
});

// 리스트 페이지 댓글 보기
function goPostDetailComment() {
  let commentButton = document.querySelectorAll('#commentButton');
  for (let i = 0; i < commentButton.length; i++) {
    commentButton[i].addEventListener('click', (event) => {
      location.href =
        '../pages/postDetail.html?id=' +
        event.currentTarget.getAttribute('commentid');
    });
  }
}

// post 상세 페이지로 이동 (그리드 타입에서만 작동)
function goPostDetailPage() {
  let goDetailPost = document.querySelectorAll('#goDetailPost');
  for (let i = 0; i < goDetailPost.length; i++) {
    goDetailPost[i].addEventListener('click', (event) => {
      location.href =
        '../pages/postDetail.html?id=' +
        event.currentTarget.getAttribute('commentid');
    });
  }
}

//좋아요 버튼 누르기
function clickLike(resJson) {
  let likeBtn = document.querySelectorAll('#likeBtn');
  let btnLikeImg = document.querySelectorAll('#btnLikeImg');
  for (let i = 0; i < likeBtn.length; i++) {
    likeBtn[i].addEventListener('click', (event) => {
      let likeId = event.currentTarget.getAttribute('likeid');
      let heartState = resJson.post[i].hearted;
      let likeBtnClass = btnLikeImg[i].getAttribute('class');
      let likeTarget = event.currentTarget.firstElementChild;
      console.log(likeBtnClass, likeTarget);

      onLikePost(likeId, heartState, likeBtnClass, likeTarget);
      cancleLikePost(likeId, heartState, likeBtnClass, likeTarget);
    });
  }
}

//좋아요 활성
async function onLikePost(likeId, heartState, likeBtnClass, likeTarget) {
  if (
    (likeBtnClass == null && !heartState) ||
    likeBtnClass == 'activeBtnLikeOff'
  ) {
    try {
      const res = await fetch(url + '/post/' + likeId + '/heart', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-type': 'application/json',
        },
      });
      const likeJson = await res.json();
      likeTarget.classList.add('activeBtnLike');
      likeTarget.classList.remove('activeBtnLikeOff');
    } catch {
      console.error('ERROR');
    }
  }
}

//좋아요 취소
async function cancleLikePost(likeId, heartState, likeBtnClass, likeTarget) {
  if (likeBtnClass == 'activeBtnLike' || (heartState && likeBtnClass == null)) {
    try {
      const res = await fetch(url + '/post/' + likeId + '/unheart', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-type': 'application/json',
        },
      });
      const likeJson = await res.json();
      likeTarget.classList.add('activeBtnLikeOff');
      likeTarget.classList.remove('activeBtnLike');
      likeTarget.setAttribute('src', '../img/icon/icon-heart.png');
    } catch {
      console.error('ERROR');
    }
  }
}
