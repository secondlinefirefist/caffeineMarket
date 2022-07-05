const loadFile = (event) => {
  const image = document.querySelector('.loadFileArea');
  image.src = URL.createObjectURL(event.target.files[0]);
  console.log(image.src);
};
const textArea = document.querySelector('.uploadBoxText');
textArea.addEventListener('input', autoResize, false);
function autoResize() {
  this.style.height = '1px';
  this.style.height = this.scrollHeight + 'px';
}
