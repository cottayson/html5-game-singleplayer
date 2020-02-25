class DefaultUnit {
  constructor() {
    this.armor = 100;
    this.damage = 1;
    this.pos = { x: 0, y: 0 };
    this.type = "building"
    this.unitType = "refinery"
  }
}

class Unit extends DefaultUnit {
  constructor(mapObject, buildManager, options) {
    super()
    for (let key in options) {
      this[key] = options[key]
      console.log('key: ',key, 'assigned to', options[key])
    }
    if (mapObject === undefined) throw "arg mapObject is undefined";
    this.mapObject = mapObject
    this.buildManager = buildManager
    this.jsonTextureData = buildManager.textureMapping.getData()
    this.building = this.jsonTextureData[this.unitType]
  }

  create() {
    console.log("create unit")
  }

  update() {
    console.log("update unit")
    this.buildManager.placeBuilding(this.building, this.pos.x, this.pos.y);
  }
}

class ObjectManager {
  constructor(buildManager) {
    this.units = []
  }

  update() {
    for (let unit of this.units) {
      unit.update()
    }
  }

  spawnUnit(pos, type, unitType) {

  }
}