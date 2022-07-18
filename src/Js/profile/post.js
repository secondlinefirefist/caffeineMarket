(async function postData() {
  try {
    const res = await fetch(
      url + '/post/' + accountname + '/userpost/?limit=5&skip=3',
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${window.localStorage.getItem('token')}`,
          'Content-type': 'application/json',
        },
      }
    );
    const resJson = await res.json();
    console.log(resJson, 'postData');
    // createPostFeed(resJson);
  } catch {
    console.error('ERROR');
  }
})();

const postIndexList = document.querySelector('.postIndexList');
function createPostFeed() {
  for (let i = 0; i < 10; i++) {
    const li = document.createElement('li'),
      imgProfile = document.createElement('img'),
      postWrap = document.createElement('div'),
      userName = document.createElement('strong'),
      postSetting = document.createElement('button'),
      postSettingImg = document.createElement('img'),
      account = document.createElement('button'),
      text = document.createElement('p'),
      wrapPostImage = document.querySelector('div'),
      postImage = document.createElement('img'),
      wrapReaction = document.createElement('div'),
      likeBtn = document.createElement('button'),
      likeImage = document.createElement('img'),
      likeNumber = document.createElement('span'),
      commentBtn = document.createElement('button'),
      commentImage = document.createElement('img'),
      commentNumber = document.createElement('span'),
      date = document.createElement('p');

    postIndexList.append(li);
    li.setAttribute('class', 'postIndexList');
    li.append(imgProfile, postWrap);
    wrapPostImage.appendChild(postImage);
    imgProfile.setAttribute('class', 'imgPostProfile');
    imgProfile.setAttribute('src', '../img/userProfile_base.png');
    imgProfile.setAttribute('alt', '게시글 저자 프로필 사진');
    postWrap.setAttribute('class', 'postIndexCont');

    postWrap.append(
      userName,
      postSetting,
      account,
      text,
      postImage,
      wrapReaction,
      date
    );

    postSetting.appendChild(postSettingImg);
    userName.setAttribute('class', 'titleMarket');
    postSetting.setAttribute('type', 'button');
    postSetting.setAttribute('class', 'btnPostSetting');
    postSettingImg.setAttribute('src', '../img/icon/s-icon-more-vertical.png');
    postSettingImg.setAttribute('alt', '설정으로가기');
    postSettingImg.setAttribute('id', 'btnPostSetting');
    text.setAttribute('type', 'postIndexText');
    postImage.setAttribute('class', 'imgIndexPost');
    postImage.setAttribute('src', '../img/post-img-example.png');
    postImage.setAttribute('alt', '게시 사진');
    date.setAttribute('class', 'dateTxt');

    wrapReaction.append(likeBtn, commentBtn);
    likeBtn.append(likeImage, likeNumber);
    commentBtn.append(commentImage, commentNumber);

    wrapReaction.setAttribute('class', 'wrapBtnReaction');
    likeBtn.setAttribute('type', 'button');
    likeImage.setAttribute('src', '../img/icon/icon-heart.png');
    likeImage.setAttribute('alt', '좋아요 버튼');
    likeImage.setAttribute('id', 'btnLike');
    likeNumber.setAttribute('id', 'numLike');

    commentBtn.setAttribute('type', 'button');
    commentImage.setAttribute('src', '../img/icon/icon-message-circle.png');
    commentImage.setAttribute('alt', '댓글 버튼');
    commentImage.setAttribute('id', 'btnComment');
  }
}
createPostFeed();
