/** Flag for debugging.
 * @todo Make verbosity levels.
 */
let isDebug = true;
/** It equals `true` if game is not paused. */
let isPlay = true;
// *************************
/** Need for testing lags. */
let testingLag = false;
/** Need for testing lags. */
let isShowLag = false;
// *************************
/** Zoom coefficient. Can be changed during debugging. */
let SCALE_FACTOR = 3;
/** Size of tile in pixels. */
const TILE_SIZE = 32;
/** Width of `structures.bmp` in tiles. */
const SCTRUCTURES_TEXTURE_WIDTH = 16;

const REQUEST_READYSTATE_OK = 4;

let CANVAS_WIDTH = 900; // 1024 // 800
let CANVAS_HEIGHT = 900; // 768 // 640

/** @type {HTMLCanvasElement}
 * @todo Why changing type `HTMLCanvasElement | null` create typescript errors with `canvas.width` in `main.js`?
 */
// @ts-ignore
const canvas = document.getElementById('canvas-id');
/** @type {CanvasRenderingContext2D} */
let ctx;
if (canvas === null) {
  throw new Error("Canvas not found.");
} else {
  const ctxOrNull = canvas.getContext('2d');
  if (ctxOrNull === null) {
    throw new Error("`getContext` method not works with canvas");
  } else {
    ctx = ctxOrNull;
  }
}
