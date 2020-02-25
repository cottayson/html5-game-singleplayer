let objectManager;

function onStart() {
  console.log('onStart');
  console.log(TILE_SIZE)
  console.log(gameMap.camera)
  objectManager = new ObjectManager();
  // cameraOffset <=> { x: 7, y: 15 }
  let options = { pos: { x: 8, y: 20 } };
  let u = new Unit(gameMap, buildManager, options);
  objectManager.units.push(u);
  // MUST BE <=> TO objectManager.spawnUnit(options)

  requestAnimationFrame(gameLoop)
  draw()
  console.log(`innerWidth = ${innerWidth}, innerHeight = ${innerHeight}`)
}

function onUpdate(steps) {
  //console.log('onUpdate ' + steps);
  // gameMap.camera.x += 1;
  objectManager.update()
}

// document.addEventListener("DOMContentLoaded", function (event) {
//   console.log("--- DOM fully loaded and parsed ---");
// })