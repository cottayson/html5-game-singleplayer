function onStart() {
  console.log('onStart');
  console.log(TILE_SIZE)
  console.log(gameMap.camera)
  requestAnimationFrame(gameLoop)
  draw()
}

function onUpdate(steps) {
  //console.log('onUpdate ' + steps);
  // gameMap.camera.x += 1;
}

document.addEventListener("DOMContentLoaded", function (event) {
  console.log("--- DOM fully loaded and parsed ---");
})