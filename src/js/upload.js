const loadFiles = (event) => {
  const image = document.querySelector('.loadFileArea');
  const button = document.querySelector('.uploadBtn');
  image.src = URL.createObjectURL(event.target.files[0]);
  console.log(event.target.files);
  button.style.backgroundColor = '#F26E22';
};
const textArea = document.querySelector('.uploadBoxText');
textArea.addEventListener('input', autoResize, false);
function autoResize() {
  this.style.height = '1px';
  this.style.height = this.scrollHeight + 'px';
}

// 다중 파일 업로드, 다중 파일 업로드 시 크기 변경
// x 버튼 추가, 클릭시 이미지 삭제
// 업로드 버튼 클릭 시, POST로 서버에 파일전송 및 피드에 UI 생성
