
var canvas;
var context;
var toggle = false;
var prvaBoja = 'rgb(200,200,20)';
var drugaBoja = 'rgb(20,20,200)';
var modifikatorVremena = 0.002;

init();
update();

function init() {
  canvas = document.createElement('canvas');
  canvas.width = 800;
  canvas.height = 800;
  context = canvas.getContext('2d');
  document.body.appendChild(canvas);
} // init

function update() {
  requestAnimationFrame(update);
  crtaj();
} // update

function crtaj() {
  var time = new Date().getTime() * modifikatorVremena;
  console.log(time);
  var x = Math.sin(time) * 192 + 256;
  var y = Math.cos(time * 0.9) * 192 + 256;
  toggle = !toggle;

  context.fillStyle = toggle ? prvaBoja : drugaBoja;
  context.beginPath();
  context.arc(x, y, 10, 0, Math.PI * 2, true);
  context.closePath();
  context.fill();
} // crtaj