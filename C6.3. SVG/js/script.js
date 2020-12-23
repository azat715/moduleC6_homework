const btn = document.getElementsByName('j-bt')[0];
const iconObj = document.getElementById('icon');

function changeIcon() {
  const data = iconObj.getAttribute('data');
  console.log(data);
  if (data == 'static/arrow-down-left-circle-fill.svg') {
    iconObj.setAttribute('data', 'static/arrow-down-left-circle.svg');
  } else {
    iconObj.setAttribute('data', 'static/arrow-down-left-circle-fill.svg');
  }
}

iconObj.addEventListener('animationend', () => {
  changeIcon();
  iconObj.classList.toggle('animation');
});

document.addEventListener('DOMContentLoaded', () => {
  btn.addEventListener('click', () => {
    iconObj.classList.toggle('animation');
  });
});
