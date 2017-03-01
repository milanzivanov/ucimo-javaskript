/* global vec2 */

/** KONFIG & INIT **/

const canvas = document.querySelector('.viewport')
const ctx = canvas.getContext('2d')

let WIDTH = window.innerWidth
let HEIGHT = window.innerHeight

canvas.width = WIDTH
canvas.height = HEIGHT

const offset = 100
const vehicles = []

/** * KLASE ***/

const Path = function() {
  this.points = []
  this.radius = 0

  this.addPoint = function(x, y) {
    const point = vec2.fromValues(x, y)

    this.points.push(point)
  }
  this.display = function() {
    ctx.lineJoin = 'round'
    ctx.lineCap = 'round'
    ctx.strokeStyle = '#e7e7e7'
    ctx.lineWidth = this.radius * 2

    ctx.beginPath()

    for (let i = 0; i < this.points.length; i++) {
      ctx.lineTo(this.points[i][0], this.points[i][1])
    }
    ctx.closePath()
    ctx.stroke()
  }
}

const Vehicle = function(location, mass) {
  this.location = location
  this.initMass = mass
  this.mass = mass
  this.maxspeed = 4 * 1 / this.mass
  this.maxforce = 1 / (this.mass * this.maxspeed)
  this.radius = this.mass * 2
  this.acceleration = vec2.create()
  this.velocity = vec2.fromValues(this.maxspeed, 0)
  this.bouncesNum = 0

  this.applyBehaviors = function(vehicles, path) {
    const f = this.follow(path)
    const s = this.separate(vehicles)

    if (this.bouncesNum >= 300 && this.bouncesNum % 100 === 0) {
      if (this.maxspeed < 3) {
        this.maxspeed += 0.1
        this.maxforce += 0.1
      }
    }

    vec2.scale(f, f, 2)
    vec2.scale(s, s, 4)

    const forces = vec2.add(vec2.create(), f, s)

    vec2.scale(forces, forces, 1 / this.mass)

    this.applyForce(forces)
  }
  this.applyForce = function(force) {
    vec2.add(this.acceleration, this.acceleration, force)
  }
  this.run = function() {
    this.update()
    this.borders()
    this.render()
  }
  this.follow = function(path) {
    const predict = vec2.clone(this.velocity)

    vec2.normalize(predict, predict)
    vec2.scale(predict, predict, 25)

    const predictLoc = vec2.create()

    vec2.add(predictLoc, predictLoc, this.location)
    vec2.add(predictLoc, predictLoc, predict)

    let normal = null
    let target = null
    let worldRecord = 1000000

    for (let i = 0; i < path.points.length; i++) {
      let a = vec2.clone(path.points[i])
      let b = vec2.clone(path.points[(i + 1) % path.points.length])

      let normalPoint = this.getNormalPoint(predictLoc, a, b)

      let dir = vec2.clone(b)

      vec2.sub(dir, dir, a)

      if (normalPoint[0] < Math.min(a[0], b[0]) || normalPoint[0] > Math.max(a[0], b[0]) || normalPoint[1] < Math.min(a[1], b[1]) || normalPoint[1] > Math.max(a[1], b[1])) {
        normalPoint = b

        a = vec2.clone(path.points[(i + 1) % path.points.length])
        b = vec2.clone(path.points[(i + 2) % path.points.length])
        dir = b
        vec2.sub(dir, dir, a)
      }

      const d = vec2.dist(predictLoc, normalPoint)

      if (d < worldRecord) {
        worldRecord = d
        normal = normalPoint

        vec2.normalize(dir, dir)
        vec2.scale(dir, dir, 25)
        target = normal
        vec2.add(target, target, dir)
      }
    }

    if (worldRecord > path.radius / 5) {
      return this.seek(target)
    } else {
      return vec2.create()
    }
  }
  this.getNormalPoint = function(p, a, b) {
    const ap = vec2.clone(p)
    const ab = vec2.clone(b)

    vec2.sub(ap, ap, a)
    vec2.sub(ab, ab, a)
    vec2.normalize(ab, ab)
    vec2.scale(ab, ab, vec2.dot(ap, ab))

    const normalPoint = vec2.clone(a)

    vec2.add(normalPoint, normalPoint, ab)

    return normalPoint
  }
  this.update = function() {
    vec2.add(this.velocity, this.velocity, this.acceleration)
    vec2.limit(this.velocity, this.velocity, this.maxspeed)
    vec2.add(this.location, this.location, this.velocity)
    vec2.scale(this.acceleration, this.acceleration, 0)
  }
  this.seek = function(target) {
    const desired = target

    vec2.sub(desired, desired, this.location)

    vec2.normalize(desired, desired)
    vec2.scale(desired, desired, this.maxspeed)

    const steer = desired

    vec2.sub(steer, steer, this.velocity)

    vec2.limit(steer, steer, this.maxforce)

    return steer
  }
  this.separate = function(boids) {
    const desiredseparation = this.radius * 2 + 4
    const steer = vec2.create()
    let count = 0

    for (let i = 0; i < boids.length; i++) {
      const other = boids[i]
      let d = this.location

      d = vec2.dist(d, other.location)

      if ((d > 0) && (d < desiredseparation)) {
        const diff = vec2.sub(vec2.create(), this.location, other.location)

        vec2.normalize(diff, diff)
        vec2.scale(diff, diff, 1 / d)
        vec2.add(steer, steer, diff)
        count++
      }
    }

    if (count > 0) {
      vec2.scale(steer, steer, 1 / count)
    }
    if (vec2.len(steer) > 0) {
      if (this.bouncesNum < 500) {
        this.style = '#ff0000'
      }

      ctx.beginPath()
      ctx.strokeStyle = '#ff0000'
      ctx.lineWidth = 1
      ctx.arc(this.location[0], this.location[1], this.radius + 5, 0, 2 * Math.PI, false)
      ctx.stroke()
      ctx.closePath()

      this.bouncesNum++

      vec2.normalize(steer, steer)
      vec2.scale(steer, steer, this.maxspeed)
      vec2.sub(steer, steer, this.velocity)
      vec2.limit(steer, steer, this.maxforce)
    } else {
      if (this.bouncesNum >= 500) {
        this.style = '#00E1FF'
      } else {
        this.style = '#000'
      }
    }

    return steer
  }
  this.borders = function() {
    if (this.location[0] < -this.radius) this.location[0] = WIDTH + this.radius
    if (this.location[0] > WIDTH + this.radius) this.location[0] = -this.radius
  }
  this.render = function() {
    ctx.fillStyle = this.style || '#000'

    ctx.beginPath()

    ctx.arc(this.location[0], this.location[1], this.radius, 0, 2 * Math.PI, false)

    ctx.closePath()

    ctx.fill()
  }
}

// dodaje metod na globalni objekat
vec2.limit = function(out, v, high) {
  const x = v[0]
  const  y = v[1]
  const len = x * x + y * y
  if (len > high * high && len > 0) {
    out[0] = x
    out[1] = y
    vec2.normalize(out, out)
    vec2.scale(out, out, high)
  }
  return out
}

/** INIT **/

const path = new Path()
path.radius = 30

/** * FUNCTIONS ***/

function draw() {
  ctx.fillStyle = '#eee'
  ctx.fillRect(0, 0, WIDTH, HEIGHT)

  path.display()

  for (let i = 0; i < vehicles.length; i++) {
    vehicles[i].applyBehaviors(vehicles, path)
    vehicles[i].run()
  }
  requestAnimationFrame(draw)
}

function setPoints() {
  path.addPoint(offset, offset)
  path.addPoint(offset + 100, offset)
  path.addPoint(offset + 100, offset + 100)
  path.addPoint(WIDTH - offset - 100, offset + 100)
  path.addPoint(WIDTH - offset - 100, offset)
  path.addPoint(WIDTH - offset, offset)
  path.addPoint(WIDTH - offset, offset + 200)
  path.addPoint(WIDTH - offset - 500, offset + 200)
  path.addPoint(WIDTH - offset - 500, offset + 300)
  path.addPoint(WIDTH - offset, offset + 300)
  path.addPoint(WIDTH - offset, HEIGHT - offset)
  path.addPoint(offset, HEIGHT - offset)
  path.addPoint(offset, offset)
}

function adjustSize() {
  WIDTH = window.innerWidth
  HEIGHT = window.innerHeight

  canvas.width = WIDTH
  canvas.height = HEIGHT

  path.points = []
  setPoints()
}

/** * LOGIC ***/

for (let i = 0; i < 200; i++) {
  const vehicle = new Vehicle(vec2.fromValues(WIDTH * Math.random(), HEIGHT * Math.random()), Math.random() * (5 - 1) + 1)
  vehicles.push(vehicle)
} // for

setPoints()
draw()

/** * LISTENERS ***/

window.addEventListener('resize', adjustSize)
