/**
 * @param {boolean} boolean_value
 */
function assert(boolean_value) {
  if (boolean_value === true) {
    return boolean_value;
  } else {
    throw "Assertion Error";
  }
}

/**
 * @param {number} a
 * @param {number} b
 */
function randint(a, b) {
  return Math.floor(a + Math.random() * (b - a + 1));
}

function testLag() {
  let j = 0;
  const count = 8000000;
  for (let i = 0; i < count; i++) {
    j = i * i + Math.sqrt(i);
  }
  console.log(j);
}
  
/**
 * @param {string | undefined} message
 */
function checkError(message) {
  if (isDebug) {
    throw new Error(message);
  } else {
    console.error(message);
  }
}

/**
 * @param {{ fillText: (arg0: any, arg1: number, arg2: number) => void; }} ctx
 * @param {string} message
 */
function showMessage(ctx, message) {
  ctx.fillText(message, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
}

/**
 * @todo How to declare that output type `=` input type?
 * @param {any[] | Uint16Array | Uint32Array} a
 * @returns {any[] | Uint16Array | Uint32Array}
 */
function copy2DArray(a) {
  let temp = undefined;
  // @ts-ignore
  if (a.constructor.name === "Uint16Array") {
    temp = new Uint16Array(a.length);
    // @ts-ignore
  } else if(a.constructor.name === "Uint32Array") {
    temp = new Uint32Array(a.length);
    // @ts-ignore
  } else if(a.constructor.name === "Array") {
    temp = new Array(a.length);
  } else {
    throw new Error("Unsupported array type");
  }
  for (let i = 0; i < a.length; ++i) temp[i] = a[i];
  return temp;
}
