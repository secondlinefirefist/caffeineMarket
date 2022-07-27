const token = window.localStorage.getItem('token');
const accountname = window.localStorage.getItem('accountname');
const key = localStorage.getItem('key');
const url = 'https://mandarin.api.weniv.co.kr';

//팔로우 피드 내역 불러오기
async function getFollowerFeed() {
  try {
    const res = await fetch(url + '/post/feed', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    const resJson = await res.json();
    console.log(resJson); //나중에 지우기
    isFollowCheck(resJson);
    createPostFeed(resJson);
  } catch (err) {
    changePageTo404();
  }
}

//404에러 처리
function changePageTo404() {
  location.href = './page404.html';
}

//팔로우 피드 체크
function isFollowCheck(resJson) {
  if (Array.isArray(resJson) && resJson.length === 0) {
    changePageToHomeEpmty();
  }
}

//빈 홈으로 이동
function changePageToHomeEpmty() {
  location.href = './homeEmpty.html';
}

//피드 내역 불러오기
getFollowerFeed();

const wrapPost = document.querySelector('.wrapPost');
const postIndexList = document.querySelector('.postIndexList');
const postType = document.querySelector('.postType');
const postGridList = document.querySelector('.postGridList');

// 리스트 타입 피드 보기
const listType = document.querySelector('.listType');
listType.addEventListener('click', () => {
  postIndexList.classList.remove('postTypeHide');
  postGridList.classList.remove('postGridShow');
  postGridList.classList.add('postGridList');
  btnGridTypeImg.classList.remove('btnGridTypeOn');
  btnListTypeImg.classList.add('btnListTypeOn');
});

function createPostFeed(resJson) {
  for (let i = 0; i < resJson.posts.length; i++) {
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
    const countImages = resJson.posts[i].image.split(',').length;
    if (resJson.posts[i].image != '') {
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
          postImage.setAttribute('src', resJson.posts[i].image.split(',')[x]);
        }
      } else if (countImages <= 1) {
        let postImage = document.createElement('img');
        wrapPostImage.appendChild(postImage);
        wrapPostImage.setAttribute('class', 'wrapPostImage');
        postImage.setAttribute('class', 'imgIndexPost');
        postImage.setAttribute('alt', '게시 사진');
        postImage.setAttribute('src', resJson.posts[i].image);
      }
    }

    postIndexList.append(li);
    li.append(imgProfile, postWrap);
    postWrap.setAttribute('class', 'postIndexCont');
    imgProfile.setAttribute('class', 'imgPostProfile');
    imgProfile.setAttribute('src', resJson.posts[i].author.image);
    imgProfile.setAttribute('alt', '게시글 저자 프로필 사진');

    postSetting.appendChild(postSettingImg);
    postSetting.setAttribute('type', 'button');
    postSetting.setAttribute('class', 'btnPostSetting');
    postSetting.setAttribute('data-id', resJson.posts[i].id);
    userName.setAttribute('class', 'titleMarket');
    userName.textContent = resJson.posts[i].author.username;
    account.setAttribute('class', 'marketId');
    account.textContent = '@ ' + resJson.posts[i].author.accountname;
    postSettingImg.setAttribute('src', '../img/icon/s-icon-more-vertical.png');
    postSettingImg.setAttribute('alt', '설정으로가기');
    postSettingImg.setAttribute('id', 'btnPostSetting');
    text.setAttribute('class', 'postIndexText');
    text.textContent = resJson.posts[i].content;
    date.setAttribute('class', 'dateTxt');
    date.textContent = resJson.posts[i].createdAt.split('T')[0];

    wrapReaction.append(likeBtn, commentBtn);
    likeBtn.append(likeImage, likeNumber);
    commentBtn.append(commentImage, commentNumber);

    wrapReaction.setAttribute('class', 'wrapBtnReaction');
    likeBtn.setAttribute('type', 'button');
    likeBtn.setAttribute('id', 'likeBtn');
    likeBtn.setAttribute('hearted', resJson.posts[i].hearted);
    likeBtn.setAttribute('likeid', resJson.posts[i].id);
    likeImage.setAttribute('alt', '좋아요 버튼');
    if (likeBtn.getAttribute('hearted') == 'true') {
      likeImage.setAttribute('src', '../img/icon/icon-heart-active.png');
    } else if (likeBtn.getAttribute('hearted') == 'false') {
      likeImage.setAttribute('src', '../img/icon/icon-heart.png');
    }
    likeImage.setAttribute('id', 'btnLikeImg');
    likeNumber.setAttribute('id', 'numLike');
    likeNumber.textContent = resJson.posts[i].heartCount;

    commentBtn.setAttribute('type', 'button');
    commentImage.setAttribute('src', '../img/icon/icon-message-circle.png');
    commentImage.setAttribute('alt', '댓글 버튼');
    commentImage.setAttribute('id', 'btnComment');
    commentNumber.textContent = resJson.posts[i].commentCount;
  }
}
