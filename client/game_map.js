class GameMap {
  constructor(textures, width, height) {
    this.textures = textures // source
    this.width = width
    this.height = height
    this.data = new Uint8Array()
    // позиция камеры должна различаеться на один пиксель т.е. 1/32 размера тайла
    this.camera = {
      x: 0,
      y: 5,
      width: 15,
      height: 10
    }
  }

  getTileTexture() {
    return this.textures[0]
  }

  fromArray(inputArray) {
    this.data = new Uint8Array(inputArray)
  }

  draw(ctx) {
    if (this.data.length == 0) {
      throw new Error('data not loaded')
    }
    const textureSizeInTiles = 16
    const tileTexture = this.getTileTexture()
    ctx.save()
    //ctx.scale(SCALE_FACTOR, SCALE_FACTOR)
    // (image: CanvasImageSource, sx: number, sy: number, sw: number, sh: number, dx: number, dy: number, dw: number, dh: number): void
      //ctx.drawImage()
    for (let i = 0; i < this.camera.height; i++) { // i номер строки
      for (let j = 0; j < this.camera.width; j++) { // j номер столбца
        const tileId = this.data[(i + this.camera.y) * TILE_SIZE + (j + this.camera.x)]
        const tileSourceX = tileId % textureSizeInTiles // 0 <= id <= 255 
        const tileSourceY = Math.floor(tileId / textureSizeInTiles)
        //console.log(tileX, tileY)
        ctx.drawImage(tileTexture, TILE_SIZE * tileSourceX, TILE_SIZE * tileSourceY, TILE_SIZE, TILE_SIZE, TILE_SIZE * j, TILE_SIZE * i, TILE_SIZE, TILE_SIZE)
      }
    }
    ctx.restore()
  }


  // draw(ctx) { // position
    // Reset current transformation matrix to the identity matrix
    // ctx.setTransform(1, 0, 0, 1, 0, 0);

    // ctx.save()
    // ctx.scale(SCALE_FACTOR, SCALE_FACTOR)
    // // i номер строки, j номер столбца
    // for (let i = 0; i < this.height; i++) {
    //   for (let j = 0; j < this.width; j++) {
    //     const id = this.data[this.width * i + j]
    //     ctx.drawImage(this.imagesArray[id], TILE_SIZE * j, TILE_SIZE * i)
    //     ctx.fillText(id.toString(), TILE_SIZE * j, TILE_SIZE * i + 16)
    //   }
    // }
    // ctx.restore()

  // }
    
}