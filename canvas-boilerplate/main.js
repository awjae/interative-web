const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  window.requestAnimationFrame(render);
}

render();

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
})

// 벚꽃 잎 클래스
class Petal {
  constructor() {}
}