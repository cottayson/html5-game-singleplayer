const canvas = document.getElementById('canvas-id')
const ctx = canvas.getContext('2d')
const images = []

// img.onload = function () {
//   onLoadImages()
//   draw()
// }

const ALL_IMAGES = 4
const PATH_TO_IMAGES = '../images/'
const imageNames = [
  'earth', 'concrete', 'wall', 'sand',
]

let countImageFiles = 0

function setImageSrc(img, name) {
  img.onload = function () {
    countImageFiles++
    if (countImageFiles == ALL_IMAGES) {
      onLoadImages()
    }
  }
  img.src = PATH_TO_IMAGES + name + '.png'
}

function onLoadImages() {
  requestAnimationFrame(gameLoop);
  console.log('Images loaded')
  draw()
}

function setup() {
  canvas.width = 500
  canvas.height = 300

  ctx.font = '12px consolas'
  ctx.fillStyle = 'rgb(255, 255, 255)'

  ctx.webkitImageSmoothingEnabled = false
  ctx.mozImageSmoothingEnabled = false
  ctx.imageSmoothingEnabled = false
  for (let i = 0; i < imageNames.length; i++) {
    const img = new Image()
    setImageSrc(img, imageNames[i])
    images.push(img)
  }
}

// (imagesArray, width, height) 
let gameMap = new GameMap(images, 4, 4)
// imageId, width, height
// let sprite = new Sprite(0, 128, 128)

function draw() {
  if (testingLag) {
    testLag()
  }
  
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  gameMap.draw(ctx)
}

function update(steps) {
  if (steps > 10) {
    checkError('steps > 10')
  }
  // console.log('update')
  // for (let i = 0; i < steps; i++) {
  //   sprite.angle += 0.025
  // }
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