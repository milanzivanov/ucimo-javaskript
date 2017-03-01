const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

// KONFIG

let width = 0
let height = 0
const mouse = {
  X: 0,
  Y: 0
}
const particules = []
const gouttes = []
const nombrebase = 5
const nombreb = 2

const controls = {
  rain: 2,
  Object: 'Nothing',
  alpha: 1,
  color: 200,
  auto: false,
  opacity: 1,
  saturation: 100,
  lightness: 50,
  back: 100,
  red: 0,
  green: 0,
  blue: 0,
  multi: false,
  speed: 2
}


// LISTENERS

window.onresize = function() {
  width = canvas.width = window.innerWidth
  height = canvas.height = window.innerHeight
}

window.onmousemove = function(event) {
  mouse.X = event.clientX
  mouse.Y = event.clientY
}


// IZVRŠENJE

window.onresize();

(function boucle() {
  requestAnimationFrame(boucle)
  update()
  rendu(ctx)
})()



// FUNKCIJE

function Rain(X, Y, nombre) {
  if (!nombre) {
    nombre = nombreb
  }
  while (nombre--) {
    particules.push({
      vitesseX: (Math.random() * 0.25),
      vitesseY: (Math.random() * 9) + 1,
      X,
      Y,
      alpha: 1,
      couleur: 'hsla(' + controls.color + ',' + controls.saturation + '%, ' + controls.lightness + '%,' + controls.opacity + ')',
    })
  }
} // Rain

function explosion(X, Y, couleur, nombre) {
  if (!nombre) {
    nombre = nombrebase
  }
  while (nombre--) {
    gouttes.push({
      vitesseX: (Math.random() * 4 - 2),
      vitesseY: (Math.random() * -4),
      X,
      Y,
      radius: 0.65 + Math.floor(Math.random() * 1.6),
      alpha: 1,
      couleur
    })
  }
} // explosion


function rendu(ctx) {

  if (controls.multi == true) {
    controls.color = Math.random() * 360
  }

  ctx.save()
  ctx.fillStyle = 'rgba(' + controls.red + ',' + controls.green + ',' + controls.blue + ',' + controls.alpha + ')'
  ctx.fillRect(0, 0, width, height)

  const particuleslocales = particules
  const goutteslocales = gouttes
  const tau = Math.PI * 2

  for (var i = 0, particulesactives; particulesactives = particuleslocales[i]; i++) {

    ctx.globalAlpha = particulesactives.alpha
    ctx.fillStyle = particulesactives.couleur
    ctx.fillRect(particulesactives.X, particulesactives.Y, particulesactives.vitesseY / 4, particulesactives.vitesseY)
  }

  for (var i = 0, gouttesactives; gouttesactives = goutteslocales[i]; i++) {

    ctx.globalAlpha = gouttesactives.alpha
    ctx.fillStyle = gouttesactives.couleur

    ctx.beginPath()
    ctx.arc(gouttesactives.X, gouttesactives.Y, gouttesactives.radius, 0, tau)
    ctx.fill()
  }
  ctx.strokeStyle = 'white'
  ctx.lineWidth = 2

  if (controls.Object == 'Umbrella') {
    ctx.beginPath()
    ctx.arc(mouse.X, mouse.Y + 10, 138, 1 * Math.PI, 2 * Math.PI, false)
    ctx.lineWidth = 3
    ctx.strokeStyle = 'hsla(0,100%,100%,1)'
    ctx.stroke()
  }
  if (controls.Object == 'Cup') {
    ctx.beginPath()
    ctx.arc(mouse.X, mouse.Y + 10, 143, 1 * Math.PI, 2 * Math.PI, true)
    ctx.lineWidth = 3
    ctx.strokeStyle = 'hsla(0,100%,100%,1)'
    ctx.stroke()
  }
  if (controls.Object == 'Circle') {
    ctx.beginPath()
    ctx.arc(mouse.X, mouse.Y + 10, 138, 1 * Math.PI, 3 * Math.PI, false)
    ctx.lineWidth = 3
    ctx.strokeStyle = 'hsla(0,100%,100%,1)'
    ctx.stroke()
  }
  ctx.restore()

  if (controls.auto) {
    controls.color += controls.speed
    if (controls.color >= 360) {
      controls.color = 0
    }
  }
} // rendu


function update() {

  const particuleslocales = particules
  const goutteslocales = gouttes

  for (var i = 0, particulesactives; particulesactives = particuleslocales[i]; i++) {
    particulesactives.X += particulesactives.vitesseX
    particulesactives.Y += particulesactives.vitesseY + 5
    if (particulesactives.Y > height - 15) {
      particuleslocales.splice(i--, 1)
      explosion(particulesactives.X, particulesactives.Y, particulesactives.couleur)
    }
    const umbrella = (particulesactives.X - mouse.X) * (particulesactives.X - mouse.X) + (particulesactives.Y - mouse.Y) * (particulesactives.Y - mouse.Y)
    if (controls.Object == 'Umbrella') {
      if (umbrella < 20000 && umbrella > 10000 && particulesactives.Y < mouse.Y) {
        explosion(particulesactives.X, particulesactives.Y, particulesactives.couleur)
        particuleslocales.splice(i--, 1)
      }
    }
    if (controls.Object == 'Cup') {
      if (umbrella > 20000 && umbrella < 30000 && particulesactives.X + 138 > mouse.X && particulesactives.X - 138 < mouse.X && particulesactives.Y > mouse.Y) {
        explosion(particulesactives.X, particulesactives.Y, particulesactives.couleur)
        particuleslocales.splice(i--, 1)
      }
    }
    if (controls.Object == 'Circle') {
      if (umbrella < 20000) {
        explosion(particulesactives.X, particulesactives.Y, particulesactives.couleur)
        particuleslocales.splice(i--, 1)
      }
    }
  }

  for (var i = 0, gouttesactives; gouttesactives = goutteslocales[i]; i++) {
    gouttesactives.X += gouttesactives.vitesseX
    gouttesactives.Y += gouttesactives.vitesseY
    gouttesactives.radius -= 0.075
    if (gouttesactives.alpha > 0) {
      gouttesactives.alpha -= 0.005
    } else {
      gouttesactives.alpha = 0
    }
    if (gouttesactives.radius < 0) {
      goutteslocales.splice(i--, 1)
    }
  }

  var i = controls.rain
  while (i--) {
    Rain(Math.floor((Math.random() * width)), -15)
  }
} // update
