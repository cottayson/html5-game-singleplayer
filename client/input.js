 // https://github.com/marquete/kibo

document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    isPlay = !isPlay
    if (isPlay) {
      console.log('play')
    } else {
      console.log('pause...')
    }
  }
})

document
  .getElementById('canvas-id')
  .addEventListener('mousemove', (event) =>
  {
    gameMap.camera.x = event.pageX
    gameMap.camera.y = event.pageY
  })