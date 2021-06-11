let objectManager = undefined;
let unitTurret = undefined;
let timers = [];

function createTimer(cb, milliseconds) {
  timers.push(setTimeout(cb, milliseconds));
}

function spawnUnits() {
  objectManager = new ObjectManager(gameMap, buildManager);
  // cameraOffset <=> { x: 7, y: 15 }
  let options = {
    pos: { x: 15, y: 20 },
    unitType: "outpost",
  };
  objectManager.spawnUnit(options);
  options.pos.y += 2;
  options.unitType = "turret";
  objectManager.spawnUnit(options);
  options.pos.y += 1;
  options.unitType = "rocket_turret";
  objectManager.spawnUnit(options);
  options.pos.x += 1;
  options.pos.y -= 1;
  options.unitType = "refinery";
  objectManager.spawnUnit(options);
  options.pos.y += 2;
  options.unitType = "starport";
  objectManager.spawnUnit(options);
  options.pos.x -= 2;
  options.unitType = "windtrap";
  objectManager.spawnUnit(options);
  options.pos.y -= 1;
  options.unitType = "wall";
  objectManager.spawnUnit(options);
  options.pos.y -= 1;
  options.unitType = "concrete";
  objectManager.spawnUnit(options);
  options.pos.y += 4;
  options.unitType = "construction_yard";
  objectManager.spawnUnit(options);
  options.pos.x += 2;
  options.pos.y += 1;
  options.unitType = "barracks";
  objectManager.spawnUnit(options);

  objectManager.units.map(createDebugAnimation);
  objectManager.units.map((unit, i) => {
    unit.destroy(150 + 20 * i);
  });
}

function createDebugAnimation(unit) {
  const startTime = 500;
  unit.nextDrawingState([0, 2]);
  createTimer(() => { unit.nextDrawingState([0, 2]); }, startTime);
  createTimer(() => { unit.nextDrawingState([0, 2]); }, startTime + 300);
  createTimer(() => { unit.nextDrawingState([0, 2]); }, startTime + 500);
  createTimer(() => { unit.nextDrawingState([0, 2]); }, startTime + 600);
  createTimer(() => { unit.nextDrawingState([0, 2]); }, startTime + 700);
}

function onRestart() {
  timers.map(clearTimeout);
  console.warn("timers cleared: ", timers.length);
  timers = [];
  spawnUnits();
  gameMap.data = copy2DArray(gameMap.data_stored);
}

function onStart() {
  console.log('onStart');
  console.log(TILE_SIZE);
  gameMap.camera.x = 450;
  gameMap.camera.y = 600;
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
