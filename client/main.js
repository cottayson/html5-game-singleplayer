const canvas = document.getElementById('canvas-id')
const ctx = canvas.getContext('2d')

const PATH_TO_IMAGES = '../images/'
const PATH_TO_TEXTURES = '../textures/'
const imageNames = [
  'earth.png', 'concrete.png', 'wall.png', 'sand.png',
]

const textureNames = [
  'tex1.bmp', 'structures.bmp', 'landscape.png',
]

const imageManager = new ImageManager(PATH_TO_IMAGES, imageNames)
const textureManager = new ImageManager(PATH_TO_TEXTURES, textureNames)
// (imagesArray, width, height) 
const gameMap = new GameMap(imageManager.images, 5, 4)
gameMap.fromArray([
  0, 1, 2, 3, 0,
  3, 2, 1, 0, 0,
  0, 0, 0, 0, 1,
  1, 1, 1, 1, 0,
])
// imageId, width, height
// let sprite = new Sprite(0, 128, 128)

function setup() {
  canvas.width = 500
  canvas.height = 300

  ctx.font = '12px consolas'
  ctx.fillStyle = 'rgb(255, 255, 255)'

  ctx.webkitImageSmoothingEnabled = false
  ctx.mozImageSmoothingEnabled = false
  ctx.imageSmoothingEnabled = false

  imageManager.load(onLoadImages)
}

function onLoadImages() {
  console.log('Images loaded')
  textureManager.load(onLoadTextures)
}

function onLoadTextures() {
  console.log('textures loaded')
  onLoadGraphics()
  // test loading textures
  for (let i = 0; i < textureManager.images.length; i++) {
    setTimeout(() => {
      ctx.drawImage(textureManager.images[i], 0, 0)
    }, 1000 * (i + 1))
  }
}

function onLoadGraphics() {
  console.log('all graphics loaded')
  requestAnimationFrame(gameLoop);
  draw()
}

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