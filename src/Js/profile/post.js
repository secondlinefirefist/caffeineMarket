(async function postData() {
  try {
    const res = await fetch(url + '/post/' + accountname + '/userpost', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${window.localStorage.getItem('token')}`,
        'Content-type': 'application/json',
      },
    });
    const resJson = await res.json();
    console.log(resJson, 'postData');
    if (resJson.post != '') {
      postType.classList.remove('postTypeHide');
    }
    if (resJson.post == '') {
      postType.classList.add('postTypeHide');
    }
    createPostFeed(resJson);
  } catch {
    console.error('ERROR');
  }
})();

const contPost = document.querySelector('.contPost');
const wrapPost = document.querySelector('.wrapPost');
const postIndexList = document.querySelector('.postIndexList');
const postType = document.querySelector('.postType');

function createPostFeed(resJson) {
  for (let i = 0; i < resJson.post.length; i++) {
    const li = document.createElement('li'),
      imgProfile = document.createElement('img'),
      postWrap = document.createElement('div'),
      userName = document.createElement('strong'),
      postSetting = document.createElement('button'),
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
          postImage.setAttribute('class', 'imgIndexPost');
          postImage.setAttribute('alt', '게시 사진');
          postImage.setAttribute('src', resJson.post[i].image.split(',')[x]);
        }
      } else if (countImages <= 1) {
        let postImage = document.createElement('img');
        wrapPostImage.appendChild(postImage);
        postImage.setAttribute('class', 'imgIndexPost');
        postImage.setAttribute('alt', '게시 사진');
        postImage.setAttribute('src', resJson.post[i].image);
      }
    }

    wrapPostImage.setAttribute('class', 'wrapPostImage');
    postIndexList.append(li);
    li.append(imgProfile, postWrap);
    postWrap.setAttribute('class', 'postIndexCont');
    imgProfile.setAttribute('class', 'imgPostProfile');
    imgProfile.setAttribute('src', resJson.post[i].author.image);
    imgProfile.setAttribute('alt', '게시글 저자 프로필 사진');

    postSetting.appendChild(postSettingImg);
    userName.setAttribute('class', 'titleMarket');
    userName.textContent = resJson.post[i].author.username;
    account.setAttribute('class', 'marketId');
    account.textContent = '@ ' + resJson.post[i].author.accountname;
    postSetting.setAttribute('type', 'button');
    postSetting.setAttribute('class', 'btnPostSetting');
    postSettingImg.setAttribute('src', '../img/icon/s-icon-more-vertical.png');
    postSettingImg.setAttribute('alt', '설정으로가기');
    postSettingImg.setAttribute('id', 'btnPostSetting');
    text.setAttribute('class', 'postIndexText');
    text.textContent = resJson.post[i].content;
    date.setAttribute('class', 'dateTxt');
    date.textContent = resJson.post[i].createdAt.split('T')[0];

    wrapReaction.append(likeBtn, commentBtn);
    likeBtn.append(likeImage, likeNumber);
    commentBtn.append(commentImage, commentNumber);

    wrapReaction.setAttribute('class', 'wrapBtnReaction');
    likeBtn.setAttribute('type', 'button');
    likeImage.setAttribute('src', '../img/icon/icon-heart.png');
    likeImage.setAttribute('alt', '좋아요 버튼');
    likeImage.setAttribute('id', 'btnLike');
    likeNumber.setAttribute('id', 'numLike');
    likeNumber.textContent = resJson.post[i].heartCount;

    commentBtn.setAttribute('type', 'button');
    commentImage.setAttribute('src', '../img/icon/icon-message-circle.png');
    commentImage.setAttribute('alt', '댓글 버튼');
    commentImage.setAttribute('id', 'btnComment');
    commentNumber.textContent = resJson.post[i].commentCount;
  }
}
createPostFeed();
