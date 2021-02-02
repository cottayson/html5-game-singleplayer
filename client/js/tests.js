
// place this code in global_events.js -> OnStart
// assert => u2.pos.y += 2; should not affect on object u
function testOptionsObject() {
  objectManager = new ObjectManager();
  // cameraOffset <=> { x: 7, y: 15 }
  let options = {
    pos: { x: 8, y: 20 },
    unitType: "outpost",
  };
  let u = new Unit(gameMap, buildManager, options);
  let u2 = new Unit(gameMap, buildManager, options);
  u2.pos.y += 2; // try to modify mutable pos object
  u.destroy();
  objectManager.units.push(u);
}
