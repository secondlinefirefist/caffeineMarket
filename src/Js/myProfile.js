/*게시글 좋아요 버튼, 댓글 버튼 클릭 시 배경 채워짐*/
const btnLike = document.querySelector('#btnLike');
const btnComment = document.querySelector('#btnComment');

let numLike = 0;
const numLikeTxt = document.querySelector('#numLike');
btnLike.addEventListener('click', () => {
  btnLike.classList.toggle('activeBtnLike');
});

btnComment.addEventListener('click', () => {
  btnComment.classList.toggle('activeBtnComment');
});
