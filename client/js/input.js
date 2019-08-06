 // https://github.com/marquete/kibo
 
document.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    isPlay = !isPlay

    if (isPlay) {
      console.log('play')
    } else {
      showMessage(ctx, "pause...")
      console.log('pause...')
    }
  }
})

document.addEventListener('mousemove', (event) => {
  const speed = 2
  if (gameMap != undefined) {
    gameMap.camera.x = speed * event.pageX
    gameMap.camera.y = speed * event.pageY
  }
})