class DefaultUnit {
  constructor() {
    this.armor = 100;
    this.damage = 1;
    this.pos = { x: 0, y: 0 };
    this.type = "building"
    this.unitType = "refinery"
    this.needDelete = false
  }
}

class Unit extends DefaultUnit {
  constructor(mapObject, buildManager, objManager, options) {
    super()
    for (let key in options) {
      let item = this[key]
      if (item instanceof Object) {
        for (let innerKey in item) {
          this[key][innerKey] = options[key][innerKey]
        }
      } else {
        this[key] = options[key]
      }
      console.log('key: ',key, 'assigned to', options[key])
    }
    if (mapObject === undefined) throw "arg mapObject is undefined";
    /** textures */
    this.mapObject = mapObject
    this.buildManager = buildManager
    this.objectManager = objManager
    this.jsonTextureData = buildManager.textureMapping.getData()
    this.building = this.jsonTextureData[this.unitType]
    /** animation */
    this.needUpdate = true
  }

  create() {
    console.log("create unit")
  }

  destroy() {
    this.timeCount = 100
    this.timerEnabled = true
    this.timerCallback = function () {
      console.log('timerCallback building destroyed')
      this.immediatelyDestroy()
    }
  }

  immediatelyDestroy() {
    this.needUpdate = true
    let texturePos = getDestroyedBuildingTexPos(this.building.w, this.building.h, this.unitType)
    this.building.x = texturePos.x
    this.building.y = texturePos.y
    this.needDelete = true
  }

  updateTime() {
    if (this.timeCount <= 0) {
      console.log('timer exceeded ' + this.timeCount)
      this.timerEnabled = false
      this.timerCallback()
    }
    this.timeCount -= 1
  }

  update() {
    if (this.needUpdate) {
      console.log("update unit")
      this.buildManager.placeBuilding(this.building, this.pos.x, this.pos.y)
      this.needUpdate = false
    }
    if (this.timerEnabled) {
      this.updateTime()
    }
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
    this.deleteUnits()
  }

  deleteUnits() {
    for (let i = this.units.length - 1; i >= 0; i--) {
      let unit = this.units[i]
      if (unit.needDelete && !unit.needUpdate) {
        this.units.splice(i, 1)
      }
    }
  }

  spawnUnit(options) {

  }
}

function getDestroyedBuildingTexPos(w, h, unitType) {
  let pos = destroyed_buildings_mapping[w-1][h-1]
  if (pos === undefined) {
    throw `destroyed_buildings_mapping[${w-1}][${h-1}] is undefined`
  } else {
    if (unitType === "wall") {
      return {x: 9, y: 3}
    } else
      return pos
  }
}