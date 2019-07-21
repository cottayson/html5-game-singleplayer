class GameMap {
  constructor(textures, width, height) {
    this.textures = textures // source
    this.width = width
    this.height = height
    this.data = new Uint8Array()
    // позиция камеры должна различаеться на один пиксель т.е. 1/32 размера тайла
    this.camera = {
      x: 0,
      y: 0,
      width: Math.floor(CANVAS_WIDTH / 32),
      height: Math.floor(CANVAS_HEIGHT / 32)
    }
    console.log(canvas.width)
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

    for (let i = 0; i < this.camera.height; i++) { // i номер строки
      for (let j = 0; j < this.camera.width; j++) { // j номер столбца
        const tileDestX = j + this.camera.x
        const tileDestY = i + this.camera.y
        if ( !(tileDestX >= 0 && tileDestX < this.width && tileDestY >= 0 && tileDestY < this.height) ) {
          continue
        }
        const tileId = this.data[tileDestY * TILE_SIZE + tileDestX]
        const tileSourceX = tileId % textureSizeInTiles // 0 <= id <= 255 
        const tileSourceY = Math.floor(tileId / textureSizeInTiles)

        ctx.drawImage (
          tileTexture, // CanvasImageSource
          TILE_SIZE * tileSourceX, TILE_SIZE * tileSourceY, //  sx: number, sy: number
          TILE_SIZE, TILE_SIZE, // sw: number, sh: number
          TILE_SIZE * j, TILE_SIZE * i, // dx: number, dy: number
          TILE_SIZE, TILE_SIZE // dw: number, dh: number
        )
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