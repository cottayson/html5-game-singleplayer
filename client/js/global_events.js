/** @type {ObjectManager} */
let objectManager;
/** @type {number[]} */
let timers = [];

function initializeTimers() {
  const count = timers.length;
  timers.map(clearTimeout);
  timers = [];
  return count;
}

/**
 * @param {TimerHandler} callback
 * @param {number | undefined} milliseconds
 */
function createTimer(callback, milliseconds) {
  timers.push(setTimeout(callback, milliseconds));
}

function spawnUnits() {
  objectManager = new ObjectManager(gameMap, buildManager);
  objectManager.spawnUnit({
    needDelete: true,
    pos: { x: 15, y: 22 },
    unitType: UNIT_TYPE.outpost,
  });

  objectManager.spawnUnit({
    pos: { x: 17, y: 22 },
    unitType: UNIT_TYPE.construction_yard,
  });

  objectManager.spawnUnit({
    pos: { x: 17, y: 25 },
    unitType: UNIT_TYPE.refinery,
  });

  // objectManager.units.filter(unit => unit.unitType !== "outpost").map(createDebugAnimation);
  objectManager.units.map(unit => {
    if (unit.unitType !== UNIT_TYPE.refinery) {
      createDebugConstructionAnimation(unit);
    }
  });
}

/**
 * Incorrectly implemented construction animation.
 * When user hit `pause` some strange effects occur.
 * But for debugging it's enough.
 * @param {Unit} unit
 */
function createDebugConstructionAnimation(unit, startTime = 800) {
  unit.nextDrawingState([0, 2]);
  [0, 300, 500, 600, 700].forEach(dt => {
    createTimer(() => { unit.nextDrawingState([0, 2]); }, startTime + dt);
  });
}

function onRestart() {
  console.warn("timers cleared: ", initializeTimers());
  spawnUnits();
  // @ts-ignore
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

/**
 * @param {number} steps
 */
function onUpdate(steps) {
  objectManager.update(steps);
}

// document.addEventListener("DOMContentLoaded", function (event) {
//   console.log("--- DOM fully loaded and parsed ---");
// })
