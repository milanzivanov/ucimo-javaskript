// mnogo spor algoritam
canvas = document.getElementById('myCanvas')
platno = canvas.getContext('2d')

function crtaGrane(pocetniX, pocetniY, shirinaStabla, nivo) {
  // manji nivo, vece drvo
  if (nivo < 12) {
    const menjajX = 100 / (nivo + 1)
    const menjajY = 200 / (nivo + 1)

    const gornjiDesniX = pocetniX + Math.random() * menjajX
    const gornjiDesniY = pocetniY - Math.random() * menjajY

    const gornjiLeviX = pocetniX - Math.random() * menjajX
    const gornjiLeviY = pocetniY - Math.random() * menjajY

    // crta desnu rachvu
    platno.beginPath()
    platno.moveTo(pocetniX + shirinaStabla / 4, pocetniY)
    platno.quadraticCurveTo(pocetniX + shirinaStabla / 4, pocetniY - shirinaStabla, gornjiDesniX, gornjiDesniY)
    platno.lineWidth = shirinaStabla
    platno.lineCap = 'round'
    platno.stroke()

    // crta levu rachvu
    platno.beginPath()
    platno.moveTo(pocetniX - shirinaStabla / 4, pocetniY)
    platno.quadraticCurveTo(pocetniX - shirinaStabla / 4, pocetniY - shirinaStabla, gornjiLeviX, gornjiLeviY)
    platno.lineWidth = shirinaStabla
    platno.lineCap = 'round'
    platno.stroke()

    crtaGrane(gornjiDesniX, gornjiDesniY, shirinaStabla * 0.7, nivo + 1)
    crtaGrane(gornjiLeviX, gornjiLeviY, shirinaStabla * 0.7, nivo + 1)
  }
}

crtaGrane(canvas.width / 2, canvas.height, 50, 0)
