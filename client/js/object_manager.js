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

/** @todo We can generate it from `buildings_props.json` dynamically or using nodejs script */
const UNIT_TYPE = {
  palace:                "palace"               ,
  starport:              "starport"             ,
  light_vehicle_factory: "light_vehicle_factory",
  heavy_vehicle_factory: "heavy_vehicle_factory",
  refinery:              "refinery"             ,
  repair:                "repair"               ,
  hi_tech:               "hi-tech"              ,
  barracks:              "barracks"             ,
  construction_yard:     "construction_yard"    ,
  windtrap:              "windtrap"             ,
  spice_silo:            "spice_silo"           ,
  outpost:               "outpost"              ,
  concrete:              "concrete"             ,
  wall:                  "wall"                 ,
  turret:                "turret"               ,
  rocket_turret:         "rocket_turret"        ,
}

class DefaultUnit {  
  constructor() {
    this.armor = 100;
    this.damage = 1;
    this.pos = { x: 0, y: 0 };
    this.category = UNIT_CATEGORY.building;
    this.unitType = UNIT_TYPE.refinery;
    this.needDelete = false;
    /** animation */
    this.needUpdate = true;
    this._drawingState = DRAWING_STATE.normal;
    this.timeCount = 0;
    this.timerCallback = () => { console.warn("timerCallback not specified"); };
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
  /**
   * @param {GameMap} mapObject 
   * @param {BuildManager} buildManager 
   * @param {ObjectManager} objManager 
   * @param {UnitOptions} options 
   */
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

  /** @returns {number} */
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

  /** @param {number} steps */
  updateTime(steps) {
    if (this.timeCount <= 0) {
      console.log('timer exceeded ' + this.timeCount);
      this.timerEnabled = false;
      this.timerCallback();
    }
    this.timeCount -= steps;
  }

  /** @param {number} steps */
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
  /**
   * @param {GameMap} _gameMap 
   * @param {BuildManager} _buildManager 
   */
  constructor(_gameMap, _buildManager) {
    /** @type {Unit[]} */
    this.units = [];
    this.gameMap = _gameMap;
    this.buildManager = _buildManager;
  }

  /**
   * @param {(u: Unit) => boolean} predicate 
   * @returns array of units as copied object links filtered by `predicate`
   */
  getUnits(predicate = u => true) {
    let filtered = [];
    for (let unit of this.units) {
      if (predicate(unit)) {
        filtered.push(unit);
      }
    }
    return filtered;
  }

  /** Create new unit and add it to `ObjectManager.units` array.
   * @param {UnitOptions} options optional fields of `Unit` class
   * @returns {Unit} unit
   */
  spawnUnit(options) {
    let unit = new Unit(this.gameMap, this.buildManager, this, options);
    this.units.push(unit);
    return unit;
  }

  /**
   * Launch update for each unit that corresponds to `ObjectManager` instance
   * @param {number} steps number of game ticks between last and penultimate updates
   */
  update(steps) {
    for (let unit of this.units) {
      unit.update(steps);
    }
    this._deleteUnits();
  }

  /** @protected */
  _deleteUnits() {
    for (let i = this.units.length - 1; i >= 0; i--) {
      let unit = this.units[i];
      if (unit.needDelete && !unit.needUpdate) {
        this.units.splice(i, 1);
      }
    }
  }
}

/**
 * @todo Make (more human-readable id or just string id) and id with no collisions
*/
function getUniqueId() {
  return Math.floor(Math.random() * 1000000);
}

// @ts-ignore
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
  }
}
