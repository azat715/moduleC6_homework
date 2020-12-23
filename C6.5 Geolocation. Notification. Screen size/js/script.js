const btn = document.getElementsByName('j-bt')[0];
const screenObj = window.screen;

document.addEventListener('DOMContentLoaded', () => {
  btn.addEventListener('click', () => {
    window.alert(`Разрешение экрана ${screenObj.width}:${screenObj.height}`);
  });
});
