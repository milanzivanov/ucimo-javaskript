const platno = document.getElementById('platno').getContext('2d')
platno.canvas.width = window.innerWidth
platno.canvas.height = window.innerHeight

function Grafikon(config) {
  // svojstva koja se podesavaju
  this.canvas = document.getElementById(config.canvasId)
  this.minX = config.minX
  this.minY = config.minY
  this.maxX = config.maxX
  this.maxY = config.maxY
  this.jedinicaPoPodeoku = config.jedinicaPoPodeoku

  // konstante
  this.bojaOse = '#aaa'
  this.font = '8pt Calibri'
  this.velicinaPodeoka = 20

  // odnosi
  this.platno = this.canvas.getContext('2d')
  this.rasponX = this.maxX - this.minX
  this.rasponY = this.maxY - this.minY
  this.jedinicaX = this.canvas.width / this.rasponX
  this.jedinicaY = this.canvas.height / this.rasponY
  this.centarY = Math.round(Math.abs(this.minY / this.rasponY) * this.canvas.height)
  this.centarX = Math.round(Math.abs(this.minX / this.rasponX) * this.canvas.width)
  this.iteration = (this.maxX - this.minX) / 1000
  this.Xskala = this.canvas.width / this.rasponX
  this.Yskala = this.canvas.height / this.rasponY

  // crta horizontalu i vertikalu
  this.crtaHorizontalu()
  this.crtaVertikalu()
}

Grafikon.prototype.crtaHorizontalu = function() {
  const platno = this.platno
  platno.save()
  platno.beginPath()
  platno.moveTo(0, this.centarY)
  platno.lineTo(this.canvas.width, this.centarY)
  platno.strokeStyle = this.bojaOse
  platno.lineWidth = 2
  platno.stroke()

  // crta oznake
  const xUvecavanje = this.jedinicaPoPodeoku * this.jedinicaX
  let xPoz, jedinica
  platno.font = this.font
  platno.textAlign = 'center'
  platno.textBaseline = 'top'

  // crta oznake levo
  xPoz = this.centarX - xUvecavanje
  jedinica = -1 * this.jedinicaPoPodeoku
  while (xPoz > 0) {
    platno.moveTo(xPoz, this.centarY - this.velicinaPodeoka / 2)
    platno.lineTo(xPoz, this.centarY + this.velicinaPodeoka / 2)
    platno.stroke()
    platno.fillText(jedinica, xPoz, this.centarY + this.velicinaPodeoka / 2 + 3)
    jedinica -= this.jedinicaPoPodeoku
    xPoz = Math.round(xPoz - xUvecavanje)
  }

  // crta oznake desno
  xPoz = this.centarX + xUvecavanje
  jedinica = this.jedinicaPoPodeoku
  while (xPoz < this.canvas.width) {
    platno.moveTo(xPoz, this.centarY - this.velicinaPodeoka / 2)
    platno.lineTo(xPoz, this.centarY + this.velicinaPodeoka / 2)
    platno.stroke()
    platno.fillText(jedinica, xPoz, this.centarY + this.velicinaPodeoka / 2 + 3)
    jedinica += this.jedinicaPoPodeoku
    xPoz = Math.round(xPoz + xUvecavanje)
  }
  platno.restore()
}

Grafikon.prototype.crtaVertikalu = function() {
  const platno = this.platno
  platno.save()
  platno.beginPath()
  platno.moveTo(this.centarX, 0)
  platno.lineTo(this.centarX, this.canvas.height)
  platno.strokeStyle = this.bojaOse
  platno.lineWidth = 2
  platno.stroke()

  // crta oznake
  const yUvecavanje = this.jedinicaPoPodeoku * this.jedinicaY
  let yPoz, jedinica
  platno.font = this.font
  platno.textAlign = 'right'
  platno.textBaseline = 'middle'

  // crtao znake gore
  yPoz = this.centarY - yUvecavanje
  jedinica = this.jedinicaPoPodeoku
  while (yPoz > 0) {
    platno.moveTo(this.centarX - this.velicinaPodeoka / 2, yPoz)
    platno.lineTo(this.centarX + this.velicinaPodeoka / 2, yPoz)
    platno.stroke()
    platno.fillText(jedinica, this.centarX - this.velicinaPodeoka / 2 - 3, yPoz)
    jedinica += this.jedinicaPoPodeoku
    yPoz = Math.round(yPoz - yUvecavanje)
  }

  // crta oznake dole
  yPoz = this.centarY + yUvecavanje
  jedinica = -1 * this.jedinicaPoPodeoku
  while (yPoz < this.canvas.height) {
    platno.moveTo(this.centarX - this.velicinaPodeoka / 2, yPoz)
    platno.lineTo(this.centarX + this.velicinaPodeoka / 2, yPoz)
    platno.stroke()
    platno.fillText(jedinica, this.centarX - this.velicinaPodeoka / 2 - 3, yPoz)
    jedinica -= this.jedinicaPoPodeoku
    yPoz = Math.round(yPoz + yUvecavanje)
  }
  platno.restore()
}

Grafikon.prototype.crtaJednacinu = function(equation, color, thickness) {
  const platno = this.platno
  platno.save()
  platno.save()
  this.prilagodiPlatno()

  platno.beginPath()
  platno.moveTo(this.minX, equation(this.minX))

  for (let x = this.minX + this.iteration; x <= this.maxX; x += this.iteration) {
    platno.lineTo(x, equation(x))
  }

  platno.restore()
  platno.lineJoin = 'round'
  platno.lineWidth = thickness
  platno.strokeStyle = color
  platno.stroke()
  platno.restore()
}

Grafikon.prototype.prilagodiPlatno = function() {
  const platno = this.platno
  // postavlja platno na centar kanvasa
  this.platno.translate(this.centarX, this.centarY)
  // rasteže rešetke da se prilagode veličnini platna i
  // invertuje y skalu da bi uvećanje išlo unazad
  platno.scale(this.Xskala, -this.Yskala)
}

// postavlja grafikon sa podeocima
const mojGrafikon = new Grafikon({
  canvasId: 'platno',
  minX: -16,
  minY: -12,
  maxX: 16,
  maxY: 12,
  jedinicaPoPodeoku: 1
})

// crta funkcije od x
mojGrafikon.crtaJednacinu(function(x) {
  return 5 * Math.sin(x)
}, 'green', 3)

mojGrafikon.crtaJednacinu(function(x) {
  return x * x
}, 'blue', 3)

mojGrafikon.crtaJednacinu(function(x) {
  return 2 * x + 3
}, 'red', 3)
