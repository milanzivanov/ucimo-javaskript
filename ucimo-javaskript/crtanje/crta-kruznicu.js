'use strict';
let PI = Math.PI;
let centarX = window.innerWidth / 3;
let centarX2 = (window.innerWidth / 3) * 2;
let centarY = window.innerHeight / 2;
let duzinaKraka = 130;
let poluprecnikKruzica = 5;
let platno = document.getElementById('platno');
platno.width = window.innerWidth;
platno.height = window.innerHeight;
let sadrzaj = platno.getContext('2d');
sadrzaj.fillStyle = "#701206";

for (let i = 0; i < 2 * PI; i += PI / 10) {
  let sin = Math.sin(i);
  let cos = Math.cos(i);
  let vektorX = sin * duzinaKraka;
  let vektorY = cos * duzinaKraka;
  // crta krake
  sadrzaj.beginPath();
  sadrzaj.moveTo(centarX, centarY);
  sadrzaj.lineTo(centarX + vektorX, centarY + vektorY);
  sadrzaj.stroke();
  // crta kruzice
  sadrzaj.beginPath();
  sadrzaj.arc(centarX2 + vektorX, centarY + vektorY, poluprecnikKruzica, 0, 2 * PI);
  sadrzaj.fill();
}
