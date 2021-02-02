let objectManager = undefined;

function spawnUnits() {
  objectManager = new ObjectManager();
  // cameraOffset <=> { x: 7, y: 15 }
  let options = {
    pos: { x: 15, y: 20 },
    unitType: "outpost",
  };
  let unitOutpost = new Unit(gameMap, buildManager, objectManager, options);
  options.pos.y += 2;
  options.unitType = "turret";
  let unitTurret = new Unit(gameMap, buildManager, objectManager, options);
  unitOutpost.destroy();
  unitTurret.destroy(200);
  objectManager.units.push(unitOutpost);
  objectManager.units.push(unitTurret);
  // MUST BE <=> TO objectManager.spawnUnit(options)
}

function onStart() {
  console.log('onStart');
  console.log(TILE_SIZE);
  console.log(gameMap.camera);

  spawnUnits();
  
  requestAnimationFrame(gameLoop);
  draw();
  console.log(`innerWidth = ${innerWidth}, innerHeight = ${innerHeight}`);
}

function onUpdate(steps) {
  objectManager.update(steps);
}

// document.addEventListener("DOMContentLoaded", function (event) {
//   console.log("--- DOM fully loaded and parsed ---");
// })
