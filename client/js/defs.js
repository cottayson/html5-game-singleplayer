let isDebug = true
let isPlay = true
// *************************
let testingLag = false
let isShowLag = false
// *************************
let SCALE_FACTOR = 2
const TILE_SIZE = 32

const REQUEST_READYSTATE_OK = 4

let CANVAS_WIDTH = 768 // 1024 // 800
let CANVAS_HEIGHT = 512 // 768 // 640

let destroyed_buildings_mapping = [
  [{x:11, y:3}], // w = 1 => h = 1
  [undefined, {x:6, y:4}], //w = 2 => h = 2
  [undefined, {x:3, y:4}, {x:0, y:6}], // w = 3 => h in [2, 3]
]

const canvas = document.getElementById('canvas-id')
const ctx = canvas.getContext('2d')