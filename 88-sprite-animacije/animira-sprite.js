const canvas = document.getElementById('canvas5')
const ctx = canvas.getContext('2d')

/** * KLASE ***/

const Sprite = function(image, sx, sy, sw, sh) {
  this.image = image
  this.draw = (ctx, x, y) => {
    ctx.drawImage(this.image, sx, sy, sw, sh, x, y, sw, sh)
  }
}

const Animation = function(spritesheet, columns, rows, sw, sh) {
  const image = new Image()
  image.src = spritesheet
  const sprites = new Array(columns * rows)
  let currIndex = 0
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      sprites[j + i * columns] = new Sprite(image, j * sw, i * sh, sw, sh)
    }
  }

  this.draw = function(ctx, x, y) {
    currIndex = (currIndex + 1) % sprites.length
    sprites[currIndex].draw(ctx, x, y)
  }

  return this
}  // Animation

/** * LOGIKA ***/

const animation = new Animation('slike/spriteexplosion.png', 5, 5, 45, 45)

function clear() {
  ctx.fillStyle = 'black'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
}

setInterval(function() {
  clear()
  ctx.save()
  ctx.translate(140, 100)
  ctx.scale(3, 3)
  animation.draw(ctx, 0, 0)
  ctx.restore()
}, 30)
