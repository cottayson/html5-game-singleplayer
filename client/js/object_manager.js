// @ts-check

const DRAWING_STATE = {
  normal: 0,
  under_construction: 1,
  destroyed: 2,
}

const UNIT_CATEGORY = {
  building: 0,
  unit: 1,
  particle: 2,
}

class DefaultUnit {  
  constructor() {
    this.armor = 100;
    this.damage = 1;
    this.pos = { x: 0, y: 0 };
    this.category = UNIT_CATEGORY.building;
    this.unitType = "refinery";
    this.needDelete = false;
    /** animation */
    this.needUpdate = true;
    this._drawingState = DRAWING_STATE.normal;
    this.timeCount = 0;
    this.timerCallback = () => { console.warn("timerCallback nnot specified"); };
  }

  get drawingState() {
    return this._drawingState;
  }

  set drawingState(value) {
    this._drawingState = value;
    this.needUpdate = true;
  }
}

class Unit extends DefaultUnit {
  constructor(mapObject, buildManager, objManager, options) {
    super()
    assignOptions(this, options);
    /** textures */
    this.mapObject = mapObject;
    this.buildManager = buildManager;
    this.objectManager = objManager;
    this.jsonTextureData = buildManager.textureMapping.getData();
    /** @type {SpriteSource} */
    this.spriteSource = this.jsonTextureData[this.unitType];

    /** unique id */
    this.id = getUniqueId();
    if (this.spriteSource === undefined) {
      // disable animation
      this.needUpdate = false;
      console.warn("Unit type not found:", this.unitType);
    }
  }

  get drawingState() {
    return this._drawingState;
  }

  set drawingState(value) {
    if (value < 0 || value >= this.spriteSource.positions.length) {
      console.warn(`unit.drawingState = ${this.drawingState} is not in range [0..${this.spriteSource.positions.length - 1}]`);
      return;
    }
    this._drawingState = value;
    this.needUpdate = true;
  }

  nextDrawingState(range = [0, this.spriteSource.positions.length]) {
    if (range[0] !== 0) throw new Error("Unsupported range");
    this.drawingState = (this.drawingState + 1) % range[1];
  }

  createAnimation() {
    console.log("create animation");
  }

  destroy(timeCount = 100) {
    this.timeCount = timeCount;
    this.timerEnabled = true;
    this.timerCallback = function () {
      console.log('timerCallback building destroyed');
      this.immediatelyDestroy();
    }
  }

  immediatelyDestroy() {
    this.drawingState = DRAWING_STATE.destroyed;
    this.needUpdate = true;
    this.needDelete = true; // just one update and delete unit from list of units
  }

  updateTime(steps) {
    if (this.timeCount <= 0) {
      console.log('timer exceeded ' + this.timeCount);
      this.timerEnabled = false;
      this.timerCallback();
    }
    this.timeCount -= steps;
    if (steps > 1) {
      console.log('steps = ' + steps);
    }
  }

  update(steps) {
    if (this.needUpdate) {
      console.log("update unit " + this.unitType);
      this.buildManager.placeBuilding(this, this.pos.x, this.pos.y);
      this.needUpdate = false;
    }
    if (this.timerEnabled) {
      this.updateTime(steps);
    }
  }
}

class ObjectManager {
  constructor(_gameMap, _buildManager) {
    this.units = [];
    this.gameMap = _gameMap;
    this.buildManager = _buildManager;
  }

  update(steps) {
    for (let unit of this.units) {
      unit.update(steps);
    }
    this.deleteUnits();
  }

  deleteUnits() {
    for (let i = this.units.length - 1; i >= 0; i--) {
      let unit = this.units[i];
      if (unit.needDelete && !unit.needUpdate) {
        this.units.splice(i, 1);
      }
    }
  }

  spawnUnit(options) {
    let unit = new Unit(this.gameMap, this.buildManager, this, options);
    this.units.push(unit);
    return unit;
  }
}

function getUniqueId() {
  return Math.floor(Math.random() * 1000000);
}

function getDestroyedBuildingTexPos(w, h, unitType) {
  // @ts-ignore
  let pos = destroyed_buildings_mapping[w - 1][h - 1];
  if (pos === undefined) {
    throw new Error(`destroyed_buildings_mapping[${w - 1}][${h - 1}] is undefined: You can specify it in defs.js`);
  } else {
    if (unitType === "wall") {
      return { x: 9, y: 3 };
    } else {
      return pos;
    }
  }
}

function assignOptions(target, source) {
  for (let key in source) {
    let item = target[key];
    if (item instanceof Object) {
      for (let innerKey in item) {
        target[key][innerKey] = source[key][innerKey];
      }
    } else {
      target[key] = source[key];
    }
    // console.log('key: ', key, 'assigned to', options[key]);
  }
}