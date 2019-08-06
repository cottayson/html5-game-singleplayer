 // https://github.com/marquete/kibo
 
document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    isPlay = !isPlay
    if (isPlay) {
      console.log('play')
    } else {
      ctx.fillText("pause...", CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2)
      console.log('pause...')
    }
  }
})

document
  .addEventListener('mousemove', (event) =>
  {
    if (gameMap != undefined) {
      gameMap.camera.x = 2 * event.pageX
      gameMap.camera.y = 2 * event.pageY
    }
  })