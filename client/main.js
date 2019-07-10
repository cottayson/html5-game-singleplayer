const canvas = document.getElementById('canvas-id')
const ctx = canvas.getContext('2d')
const images = []

// imageId, width, height
let sprite = new Sprite(0, 128, 128)

function onLoadImages() {
  requestAnimationFrame(gameLoop);
}

function setup() {
  canvas.width = 500
  canvas.height = 200
  const img = new Image()
  img.onload = function () {
    onLoadImages()
    draw()
  }
  img.src = '../images/sand.png'
  images.push(img)
}

function draw() {
  if (testingLag) {
    testLag()
  }
  
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  sprite.draw()
}

function update(steps) {
  if (steps > 10) {
    checkError('steps > 10')
  }
  for (let i = 0; i < steps; i++) {
    sprite.angle += 0.025
  }
  // console.log(dt)
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

window.addEventListener('load', function () {
  setup()
})