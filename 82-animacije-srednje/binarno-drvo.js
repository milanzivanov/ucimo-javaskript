const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
const W = window.innerWidth
const H = window.innerHeight
canvas.width = W
canvas.height = H

let length, divergence, reduction, line_width, start_points = []

function get_endpoint(x, y, a, length) {
  // calculate the end points based on simple vectors
  const epx = x + length * Math.cos(a * Math.PI / 180)
  const epy = y + length * Math.sin(a * Math.PI / 180)
  return {
    x: epx,
    y: epy
  }
}

function branches() {
  length *= reduction
  line_width *= reduction
  ctx.lineWidth = line_width

  const new_start_points = []
  ctx.beginPath()
  for (let i = 0; i < start_points.length; i++) {
    const sp = start_points[i]
    // 2 branches will come out of every start point. Hence there will be
    // 2 end points. There is a difference in the divergence.
    const ep1 = get_endpoint(sp.x, sp.y, sp.angle + divergence, length)
    const ep2 = get_endpoint(sp.x, sp.y, sp.angle - divergence, length)
    ctx.moveTo(sp.x, H - sp.y)
    ctx.lineTo(ep1.x, H - ep1.y)
    ctx.moveTo(sp.x, H - sp.y)
    ctx.lineTo(ep2.x, H - ep2.y)
    ep1.angle = sp.angle + divergence
    ep2.angle = sp.angle - divergence
    new_start_points.push(ep1)
    new_start_points.push(ep2)
  }
  if (length < 10) ctx.strokeStyle = 'green'
  else ctx.strokeStyle = 'brown'
  ctx.stroke()
  start_points = new_start_points
  // recursive call - only if length is more than 2
  if (length > 2) setTimeout(branches, 50)
  else setTimeout(init, 500)
}

function init() {
  ctx.fillStyle = 'white'
  ctx.fillRect(0, 0, W, H)
  // draw the trunk of the tree
  // randomise the variables
  length = 100 + Math.round(Math.random() * 50)
  // angle at which branches will diverge
  divergence = 10 + Math.round(Math.random() * 50)
  // Every branch will be 0.75times of the previous one
  reduction = Math.round(50 + Math.random() * 20) / 100
  // width of the branch/trunk
  line_width = 10
  // This is the end point of the trunk, from where branches will diverge
  const trunk = {
    x: W / 2,
    y: length + 50,
    angle: 90
  }
  // It becomes the start point for branches
  start_points = [] // empty the start points on every init();
  start_points.push(trunk)
  ctx.beginPath()
  ctx.moveTo(trunk.x, H - 50)
  ctx.lineTo(trunk.x, H - trunk.y)
  ctx.strokeStyle = 'brown'
  ctx.lineWidth = line_width
  ctx.stroke()
  branches()
}

init()
