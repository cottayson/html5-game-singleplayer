const PATH_TO_IMAGES = '../images/';
const PATH_TO_TEXTURES = '../textures/';
const PATH_TO_BINARY_FILE = '../maps/atreides/map_07.bin';

const imageNames = ['earth.png', 'concrete.png', 'wall.png', 'sand.png'];
const textureNames = ['tex1.bmp', 'structures.bmp', 'landscape.png'];

// singletons?:
const buildTextureMap = new JSONLoader(PATH_TO_TEXTURES + 'buildings_texture_mapping.json');
const buildManager = new BuildManager(buildTextureMap);
const imageManager = new ImageManager(PATH_TO_IMAGES, imageNames);
const textureManager = new ImageManager(PATH_TO_TEXTURES, textureNames);
const binaryLoader = new BinaryLoader(PATH_TO_BINARY_FILE);
let gameMap = undefined;
// imageId, width, height
// let sprite = new Sprite(0, 128, 128)

function setupCanvasElement() {
  ctx.font = '12px consolas';
  ctx.fillStyle = 'rgb(255, 255, 255)';

  ctx.webkitImageSmoothingEnabled = false;
  ctx.mozImageSmoothingEnabled = false;
  ctx.imageSmoothingEnabled = false;
}

function setup() {
  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;

  setupCanvasElement();

  buildTextureMap.load(() => {
    gameMap = new GameMap(textureManager.images, 64, 64);
    binaryLoader.load(onLoadMap);
  })
}

function onLoadMap(arrayBufferMap) {
  const uint8Map = new Uint8Array(arrayBufferMap); // convert buffer to 0..255
  const uint16Map = new Uint16Array(uint8Map);
  if (gameMap === undefined) {
    throw new Error("gameMap is undefined");
  }
  gameMap.data = uint16Map;
  gameMap.data_stored = copy2DArray(uint16Map);
  imageManager.load(onLoadImages);
}

// **** load graphics BEGIN ****
function onLoadImages() {
  console.log('Images loaded');
  textureManager.load(onLoadTextures);
}

function onLoadTextures() {
  console.log('textures loaded');
  onLoadGraphics();
}

function onLoadGraphics() {
  console.log('all graphics loaded');
  buildManager.loadTextureMapping();
  setupInput();
  onStart();
}
// **** load graphics END ****

function resizeCanvas(width, height) {
  canvas.width = width;
  canvas.height = height;

  CANVAS_WIDTH = width;
  CANVAS_HEIGHT = height;

  setupCanvasElement();

  gameMap.camera.width = Math.floor(CANVAS_WIDTH / 32);
  gameMap.camera.height = Math.floor(CANVAS_HEIGHT / 32);
}

function draw() {
  if (testingLag) { testLag() }
  
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (gameMap === undefined) throw new Error("Game map is undefined");
  gameMap.draw(ctx);
}

function update(steps) {
  if (steps > 10) {
    showMessage(ctx, 'game paused due to steps > 10');
    // checkError('steps > 10')
    isPlay = false;
  }
  onUpdate(steps);
}

let lag = 0;
let oldTimeStamp = undefined;
const frameDuration = 1000 / 60;
let drawSteps = 1;
let globalSteps = 0;

function gameLoop(timeStamp) {
  // requestAnimationFrame(gameLoop)
  // Calculate how much time has passed

  // Pass the time to the update
  // if (isPlay) {
  let dt = undefined;
  if (oldTimeStamp !== undefined) {
    dt = timeStamp - oldTimeStamp;
  } else {
    dt = frameDuration;
  }
  oldTimeStamp = timeStamp;

  lag += dt;

  let steps = Math.floor(lag / frameDuration);

  if (isPlay) {
    update(steps);
    globalSteps++;
  }
  // isPlay could be changed in update function
  if (isPlay) {
    if (globalSteps % drawSteps === 0) {
      draw();
    }
  }
    
  lag -= steps * frameDuration;
  if (isPlay) {
    if (isShowLag) {
      console.log(steps, lag);
    }
  }
  // }
  
  requestAnimationFrame(gameLoop);
}



window.addEventListener('load', function () {
  setup();
});