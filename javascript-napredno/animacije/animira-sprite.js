'use strict';

var canvas = document.getElementById('canvas5');
var ctx = canvas.getContext('2d');

/*** KLASE ***/

var Sprite = function(image, sx, sy, sw, sh) {
  var self = this;
  self.image = image;

  self.draw = function(ctx, x, y) {
    ctx.drawImage(self.image, sx, sy, sw, sh, x, y, sw, sh);
  };

};  // Sprite

var Animation = function(spritesheet, columns, rows, sw, sh) {
  var self = this;
  var image = new Image();
  image.src = spritesheet;
  var sprites = new Array(columns * rows);
  var currIndex = 0;
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < columns; j++) {
      sprites[j + i * columns] = new Sprite(image, j * sw, i * sh, sw, sh);
    }
  }

  self.draw = function(ctx, x, y) {
    tick();
    sprites[currIndex].draw(ctx, x, y);
  };

  function tick () {
    currIndex = (currIndex + 1) % sprites.length;
  };

  return self;
};  // Animation


/*** LOGIKA ***/

var animation = new Animation('slike/spriteexplosion.png', 5, 5, 45, 45);

var interval = setInterval(function() {
  clear();
  ctx.save();
  ctx.translate(140, 100);
  ctx.scale(3, 3);
  animation.draw(ctx, 0, 0);
  ctx.restore();
}, 30);


/*** POMOĆNE FUNKCIJE ***/

function clear() {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
};
