const loadFile = (e) => {
  // const loadImage = document.querySelector('.loadImageArea');
  const image = document.querySelector('.loadFileArea');
  const button = document.querySelector('.uploadBtn');
  // const newImage = document.createElement(image);
  // if ((i = 0)) {
  //   image.src = URL.createObjectURL(event.target.files[0]);
  // } else {
  // }
  // const multiImage = (i) => {
  //   for (let i = 0; i < 5; i++) {
  //     image.src = URL.createObjectURL(event.target.files[i]);
  //     loadImage.appendChild(newImage);
  //   }
  // };
  // 만약 1개라면 그대로 출력
  // 2개이상이라면 style바꾸고,file의 개수만큼 image를 태그를 늘려라.
  image.src = URL.createObjectURL(e.target.files[0]);
  console.log(e.target.files);
  button.style.backgroundColor = '#F26E22';
  // multiImage();
};
const textArea = document.querySelector('.uploadBoxText');
textArea.addEventListener('input', autoResize, false);
function autoResize() {
  this.style.height = '1px';
  this.style.height = this.scrollHeight + 'px';
}

// 다중 파일 업로드, 다중 파일 업로드 시 크기 변경
