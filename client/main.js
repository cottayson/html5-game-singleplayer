const canvas = document.getElementById('canvas-id')
const ctx = canvas.getContext('2d')

const PATH_TO_IMAGES = '../images/'
const PATH_TO_TEXTURES = '../textures/'
const PATH_TO_BINARY_FILE = '../maps/atreides/map_01.bin'
const imageNames = [
  'earth.png', 'concrete.png', 'wall.png', 'sand.png',
]

const textureNames = [
  'tex1.bmp', 'structures.bmp', 'landscape.png',
]

const buildTextureMap = new JSONLoader(PATH_TO_TEXTURES + 'build_texture_map.json')
const buildManager = new BuildManager(buildTextureMap)
const imageManager = new ImageManager(PATH_TO_IMAGES, imageNames)
const textureManager = new ImageManager(PATH_TO_TEXTURES, textureNames)
const binaryLoader = new BinaryLoader(PATH_TO_BINARY_FILE)
// (imagesArray, width, height) 
const gameMap = new GameMap(textureManager.images, 32, 32)
// imageId, width, height
// let sprite = new Sprite(0, 128, 128)

function setup() {
  canvas.width = CANVAS_WIDTH
  canvas.height = CANVAS_HEIGHT

  ctx.font = '12px consolas'
  ctx.fillStyle = 'rgb(255, 255, 255)'

  ctx.webkitImageSmoothingEnabled = false
  ctx.mozImageSmoothingEnabled = false
  ctx.imageSmoothingEnabled = false

  buildTextureMap.load(() => {
    binaryLoader.load(onLoadMap, () => {
      imageManager.load(onLoadImages)
    })
  })
}

function onLoadMap(arrayBufferMap) {
  const uint8Map = new Uint8Array(arrayBufferMap)
  gameMap.data = uint8Map
}

// **** load graphics BEGIN ****
function onLoadImages() {
  console.log('Images loaded')
  textureManager.load(onLoadTextures)
}

function onLoadTextures() {
  console.log('textures loaded')
  onLoadGraphics()
}

function onLoadGraphics() {
  console.log('all graphics loaded')
  buildManager.loadTextureMap()
  requestAnimationFrame(gameLoop);
  draw()
}
// **** load graphics END ****
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
  if (isPlay) {
    if (isShowLag) {
      console.log(steps, lag)
    }
  }
  // }
  requestAnimationFrame(gameLoop);
}

window.addEventListener('load', function () {
  setup()
})