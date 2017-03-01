// FB - 20121227

const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')
const xr = context.canvas.width
const yr = context.canvas.height
const imgd = context.createImageData(xr, yr)
const pix = imgd.data

const xmin = -2.0
const xmax = 1.0
const ymin = -1.5
const ymax = 1.5

// these are for coloring the image
let mr0 = 0
let mg0 = 0
let mb0 = 0
while (mr0 == mg0 || mr0 == mb0 || mg0 == mb0) {
  mr0 = Math.pow(2, Math.ceil(Math.random() * 3 + 3))
  mg0 = Math.pow(2, Math.ceil(Math.random() * 3 + 3))
  mb0 = Math.pow(2, Math.ceil(Math.random() * 3 + 3))
}
const mr1 = 256 / mr0
const mg1 = 256 / mg0
const mb1 = 256 / mb0

const maxIt = 256
let x = 0.0
let y = 0.0
let zx = 0.0
let zx0 = 0.0
let zy = 0.0
let zx2 = 0.0
let zy2 = 0.0

for (let ky = 0; ky < yr; ky++) {
  y = ymin + (ymax - ymin) * ky / yr
  for (let kx = 0; kx < xr; kx++) {
    x = xmin + (xmax - xmin) * kx / xr
    zx = x
    zy = y
    for (var i = 0; i < maxIt; i++) {
      zx2 = zx * zx
      zy2 = zy * zy
      if (zx2 + zy2 > 4.0) break
      zx0 = zx2 - zy2 + x
      zy = 2.0 * zx * zy + y
      zx = zx0
    }
    const p = (xr * ky + kx) * 4
    pix[p] = i % mr0 * mr1 // red
    pix[p + 1] = i % mg0 * mg1 // green
    pix[p + 2] = i % mb0 * mb1 // blue
    pix[p + 3] = 255 // alpha
  }
}

context.putImageData(imgd, 0, 0)
