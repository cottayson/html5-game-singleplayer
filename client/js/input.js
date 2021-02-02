 // https://github.com/marquete/kibo
function setupInput() {
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      isPlay = !isPlay;
      if (isPlay) {
        console.log('play');
      } else {
        showMessage(ctx, "pause...");
        console.log('pause...');
      }
    }
  })
  
  document.addEventListener('mousemove', (event) => {
    const cameraOffset = { x: 7, y: 15 };
    const speed = 0.5;
    if (gameMap !== undefined) {
      gameMap.camera.x = speed * event.pageX + cameraOffset.x * 32;
      gameMap.camera.y = speed * event.pageY + cameraOffset.y * 32;
    }
  })
  
  let mousePressed = false;
  let mousePosition = { x: 0, y: 0 };
  document.addEventListener('mousedown', (event) => {
    if (gameMap !== undefined) {
      mousePressed = true;
    }
  })
  
  document.addEventListener('mouseup', (event) => {
    if (gameMap !== undefined) {
      mousePressed = false;
    }
  });
}
