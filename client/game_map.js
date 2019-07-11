class GameMap {
  constructor(imagesArray, width, height) {
    this.imagesArray = imagesArray // source
    this.width = width
    this.height = height
    this.data = new Uint8ClampedArray([
      0, 1, 2, 3,
      3, 2, 1, 0,
      0, 0, 0, 0,
      1, 1, 1, 1,
    ]);
  }

  draw(ctx) { // position
    // Reset current transformation matrix to the identity matrix
    // ctx.setTransform(1, 0, 0, 1, 0, 0);

    ctx.save()
    ctx.scale(SCALE_FACTOR, SCALE_FACTOR)
    // i номер строки, j номер столбца
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        const id = this.data[this.width * i + j]
        ctx.drawImage(this.imagesArray[id], TILE_SIZE * j, TILE_SIZE * i)
        ctx.fillText(id.toString(), TILE_SIZE * j, TILE_SIZE * i + 16)
      }
    }
    ctx.restore()
  }
}