let radius

function $i(id) {
  return document.getElementById(id)
}

function $c(code) {
  return String.fromCharCode(code)
}

function get_screen_size() {
  const w = document.documentElement.clientWidth
  const h = document.documentElement.clientHeight
  return Array(w, h)
}

const canvas_x = 0
const canvas_y = 0
let canvas_w = 0
let canvas_h = 0
let context
const margin = 4

let x, y
let p_x, p_y
let a = 0
let b = 0
const angle = Math.PI / 180 * 8
const limit1 = Math.PI * 1.5
const limit2 = Math.PI * 1.79
const c = new Array(6)
const d = new Array(6)
let r, e
let prv_x, prv_y, prv_x2, prv_y2

let timeout
let pause = false
const fps = 10

const google_flag = true

function draw_line(x, y, x1, y1, x2, y2) {
  context.beginPath()
  context.moveTo(x + x1, y + y1)
  context.lineTo(x + x2, y + y2)
  context.moveTo(x - x1, y + y1)
  context.lineTo(x - x2, y + y2)
  context.moveTo(x - x1, y - y1)
  context.lineTo(x - x2, y - y2)
  context.moveTo(x + x1, y - y1)
  context.lineTo(x + x2, y - y2)
  context.moveTo(x + y1, y + x1)
  context.lineTo(x + y2, y + x2)
  context.moveTo(x - y1, y + x1)
  context.lineTo(x - y2, y + x2)
  context.moveTo(x - y1, y - x1)
  context.lineTo(x - y2, y - x2)
  context.moveTo(x + y1, y - x1)
  context.lineTo(x + y2, y - x2)
  context.moveTo(x, y + x2)
  context.lineTo(x, y + x1)
  context.moveTo(x, y - x2)
  context.lineTo(x, y - x1)
  context.moveTo(x + x2, y)
  context.lineTo(x + x1, y)
  context.moveTo(x - x2, y)
  context.lineTo(x - x1, y)
  context.stroke()
  context.closePath()
}

function anim() {
  const a1 = Math.cos(a * 2)
  const a2 = Math.cos(a * 4)
  const a3 = Math.cos(a)
  const a4 = Math.sin(a)
  if (b > limit1 && b < limit2) {
    r += radius * 0.02 * a1
    prv_x = x
    prv_y = y
    x = prv_x2 + r * a3
    y = prv_y2 + r * a4
  } else {
    prv_x = x
    prv_y = y
    prv_x2 = x
    prv_y2 = y
    x = (radius * c[0]) * Math.cos(a * d[1]) + (radius * c[2]) * Math.sin(a * d[3]) + (radius * c[4]) * Math.sin(a * d[5])
    y = (radius * c[5]) * Math.sin(a * d[4]) + (radius * c[3]) * Math.cos(a * d[2]) + (radius * c[1]) * Math.cos(a * d[0])
  }
  const c3 = 16 * Math.cos(a * 10)
  const c1 = Math.floor(56 * Math.cos(a * angle * 4) + c3)
  const c2 = Math.floor(56 * Math.sin(a * angle * 4) - c3)
  context.lineCap = 'round'
  context.strokeStyle = 'rgba(' + (192 + c1) + ',' + (192 + c2) + ',' + (192 - c1) + ',' + (0.01 - 0.005 * -a1) + ')'
  context.lineWidth = e * 1.4 + e * 0.8 * a3
  draw_line(p_x, p_y, prv_x, prv_y, x, y)
  context.lineWidth = e + e * 0.8 * a3
  draw_line(p_x, p_y, prv_x, prv_y, x, y)
  context.strokeStyle = 'rgba(' + (192 + c1) + ',' + (192 + c2) + ',' + (192 - c1) + ',' + (0.06 - 0.03 * -a1) + ')'
  context.lineWidth = e * 0.6 + e * 0.35 * a3
  draw_line(p_x, p_y, prv_x, prv_y, x, y)
  context.strokeStyle = 'rgba(0,0,0,0.06)'
  context.lineWidth = e * 0.4 + e * 0.225 * a3
  draw_line(p_x, p_y, prv_x, prv_y, x, y)
  context.strokeStyle = 'rgba(' + (192 + c1) + ',' + (192 + c2) + ',' + (192 - c1) + ',' + (0.1 - 0.075 * -a1) + ')'
  context.lineWidth = e * 0.2 + e * 0.1 * a3
  draw_line(p_x, p_y, prv_x, prv_y, x, y)
  context.strokeStyle = 'rgba(255,255,255,0.4)'
  context.lineWidth = e * (0.1 - 0.05 * -a2)
  draw_line(p_x, p_y, prv_x, prv_y, x, y)
  a += angle * Math.cos(b)
  b += angle * 0.1
  if (b > limit1) {
    context.fillStyle = 'rgba(0,0,0,0.08)'
    context.fillRect(0, 0, canvas_w, canvas_h)
  }
  if (b < limit2) timeout = setTimeout('anim()', fps)
  else reset()
}

function reset() {
  clearTimeout(timeout)
  a = Math.random(0, 1) * angle
  b = Math.random(0, 1) * angle
  r = 0
  for (let i = 0; i < 6; i++) {
    c[i] = Math.random(0, 1) / 2
    d[i] = Math.random(0, 1) / 2
  }
  radius = Math.round((canvas_w + canvas_h) / 8)
  e = radius * 0.2 /* 0.15 */
  p_x = Math.round(canvas_w / 2)
  p_y = Math.round(canvas_h / 2)
  x = (radius * c[0]) * Math.cos(a * d[1]) + (radius * c[2]) * Math.sin(a * d[3]) + (radius * c[4]) * Math.sin(a * d[5])
  y = (radius * c[5]) * Math.sin(a * d[4]) + (radius * c[3]) * Math.cos(a * d[2]) + (radius * c[1]) * Math.cos(a * d[0])
  anim()
}

function init() {
  const screen = $i('screen')
  screen.style.display = 'block'
  screen.style.position = 'absolute'
  screen.style.left = canvas_x + 'px'
  screen.style.top = canvas_y + 'px'
  screen.style.width = canvas_w + 'px'
  screen.style.height = canvas_h + 'px'
  const shadebob = $i('shadebob')
  shadebob.style.position = 'absolute'
  shadebob.style.left = canvas_x + 'px'
  shadebob.style.top = canvas_y + 'px'
  shadebob.width = canvas_w
  shadebob.height = canvas_h
  context = shadebob.getContext('2d')

  document.body.style.width = (canvas_x + canvas_w) + 'px'
  document.body.style.height = (canvas_y + canvas_h + 60 + margin * 2) + 'px'
  reset()
}

function resize() {
  canvas_w = get_screen_size()[0]
  canvas_h = get_screen_size()[1] - (google_flag ? 60 + margin * 2 : 0)
  init()
}

function key_manager(evt) {
  const key = evt.which || evt.keyCode
  switch (key) {
  case 27:
  case 13:
    pause = pause ? false : true
    if (pause) clearTimeout(timeout)
    else anim()
    break
  case 32:
    reset()
    break
  }
  top.status = '$' + key + '=' + $c(key)
}

document.onkeypress = key_manager
