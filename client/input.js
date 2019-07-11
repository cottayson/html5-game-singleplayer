 // https://github.com/marquete/kibo

document.addEventListener('keydown', (e) => {
  if (e.key === ' ') {
    isPlay = !isPlay
    if (isPlay) {
      console.log('play')
    } else {
      console.log('pause...')
    }
  }
})