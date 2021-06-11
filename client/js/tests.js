
// place this code in global_events.js -> OnStart
// assert => u2.pos.y += 2; should not affect on object u
function testOptionsObject() {
  objectManager = new ObjectManager(gameMap, buildManager);
  // cameraOffset <=> { x: 7, y: 15 }
  let options = {
    pos: { x: 8, y: 20 },
    unitType: "outpost",
  };
  let u = new Unit(gameMap, buildManager, objectManager, options);
  let u2 = new Unit(gameMap, buildManager, objectManager, options);
  u2.pos.y += 2; // try to modify mutable pos object
  u.destroy();
  objectManager.units.push(u);
}

function testUnits() {
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

  objectManager.units.map((unit, i) => {
    createDebugConstructionAnimation(unit, 500 + 20 * 10 * i);
  });
  objectManager.units.map((unit, i) => {
    unit.destroy(150 + 20 * i);
  });
}
