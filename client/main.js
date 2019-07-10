const canvas = document.getElementById('canvas-id')
const ctx = canvas.getContext('2d')
const images = []
let isPlay = true
// *************************
const testingLag = false
// *************************
let sprite = {
  x: 0,
  y: 0,
  r: 0,
}

function setup() {
  canvas.width = 500
  canvas.height = 200
  const img = new Image()
  img.onload = function () {
    onLoadImages()
  }
  img.src = '../images/sand.png'
  images.push(img)
}

function testLag() {
  let j = 0
  const count = 8000000
  for (let i = 0; i < count; i++) {
    j = i * i + Math.sqrt(i)
  }
  console.log(j)
}


function update(steps) {
  for (let i = 0; i < steps; i++) {
    sprite.r += 0.025
  }
  // console.log(dt)
}

function draw() {
  if (testingLag) {
    testLag()
  }
  

  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.save()
  ctx.translate(64, 64)
  ctx.rotate(sprite.r)
  ctx.drawImage(images[0], sprite.x - 64, sprite.y - 64, 128, 128)
  ctx.restore()
}

let lag = 0
let oldTimeStamp = undefined
const frameDuration = 1000 / 60

function gameLoop(timeStamp) {
  // requestAnimationFrame(gameLoop)
  // Calculate how much time has passed

  // Pass the time to the update
  // if (isPlay) {
  let dt = undefined
  if (oldTimeStamp !== undefined) {
    dt = timeStamp - oldTimeStamp
  } else {
    dt = frameDuration
  }
  oldTimeStamp = timeStamp

  lag += dt

  let steps = Math.floor(lag / frameDuration)

  if (isPlay) {
    update(steps)
    draw()
  }
    
  lag -= steps * frameDuration
  // console.log(steps, lag)
  // }
  requestAnimationFrame(gameLoop);
}

function onLoadImages() {
  requestAnimationFrame(gameLoop);
}

document.addEventListener('keydown', (e) => {
  if (e.key === ' ') {
    isPlay = !isPlay
  }
})

window.addEventListener('load', function () {
  setup()
})

 // https://github.com/marquete/kibo