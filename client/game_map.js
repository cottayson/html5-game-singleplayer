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
      width: Math.floor(CANVAS_WIDTH / 32) + 1/* - 1*/,
      height: Math.floor(CANVAS_HEIGHT / 32) + 1/* - 1*/,
    }
    console.log(canvas.width)
  }

  getTileTexture() {
    return this.textures[0]
  }

  fromArray(inputArray) {
    this.data = new Uint8Array(inputArray)
  }

  isLoaded() {
    return this.data.length > 0
  }

  draw(ctx) {
    if (this.isLoaded() == false) {
      throw new Error('data not loaded')
    }
    // Reset current transformation matrix to the identity matrix
    // ctx.setTransform(1, 0, 0, 1, 0, 0);

    const textureSizeInTiles = 16
    const tileTexture = this.getTileTexture()
    ctx.save()
    //ctx.scale(SCALE_FACTOR, SCALE_FACTOR)
    const testOffsetX = 0 // 32
    const testOffsetY = 0 // 32
    const quotientX = Math.floor(this.camera.x / 32)
    const quotientY = Math.floor(this.camera.y / 32)
    const residueX = this.camera.x % 32
    const residueY = this.camera.y % 32

    for (let i = 0; i < this.camera.height; i++) { // i номер строки
      for (let j = 0; j < this.camera.width; j++) { // j номер столбца
        const tileDestX = j + quotientX
        const tileDestY = i + quotientY
        if ( !(tileDestX >= 0 && tileDestX < this.width && tileDestY >= 0 && tileDestY < this.height) ) {
          continue
        }
        const tileId = this.data[tileDestY * this.width + tileDestX]
        const tileSourceX = tileId % textureSizeInTiles // 0 <= id <= 255 
        const tileSourceY = Math.floor(tileId / textureSizeInTiles)

        ctx.drawImage (
          tileTexture, // CanvasImageSource
          TILE_SIZE * tileSourceX, TILE_SIZE * tileSourceY, //  sx: number, sy: number
          TILE_SIZE, TILE_SIZE, // sw: number, sh: number
          TILE_SIZE * j - residueX + testOffsetX, TILE_SIZE * i - residueY + testOffsetY, // dx: number, dy: number
          TILE_SIZE, TILE_SIZE // dw: number, dh: number
        )
      }
    }
    ctx.restore()
  }
}