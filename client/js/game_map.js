class GameMap {
  constructor(textures, width, height) {
    this.textureSizeInTiles = 16
    this.textures = textures // source
    this.width = width
    this.height = height
    this.data = new Uint16Array()
    // позиция камеры должна различаеться на один пиксель т.е. 1/32 размера тайла
    this.camera = {
      x: 0,
      y: 0,
      width: Math.floor(CANVAS_WIDTH / 32) + 1/* - 1*/,
      height: Math.floor(CANVAS_HEIGHT / 32) + 1/* - 1*/,
    }
  }

  getTileTexture() {
    return this.textures[0]
  }

  getStructuresTexture() {
    return this.textures[1]
  }

  fromArray(inputArray) {
    this.data = new Uint16Array(inputArray)
  }

  isLoaded() {
    return this.data.length > 0
  }

  setTile(id, x, y) {
    this.data[y * this.width + x] = id
  }

  randomizeMap(leftTileId, rightTileId) {
    for(let i = 0; i < this.data.length; i++) {
      this.data[i] = randint(leftTileId, rightTileId)
    }
  }

  setBuildTiles(sourceId, width, height, x, y) {
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        this.setTile(sourceId + j + i * this.textureSizeInTiles, x + j, y + i)
      }
    }
  }

  draw(ctx) {
    if (this.isLoaded() == false) {
      throw new Error('data not loaded')
    }
    // Reset current transformation matrix to the identity matrix
    // ctx.setTransform(1, 0, 0, 1, 0, 0);

    const tileTexture = this.getTileTexture()
    const structuresTexture = this.getStructuresTexture()
    ctx.save()
    //ctx.scale(SCALE_FACTOR, SCALE_FACTOR)
    const testOffsetX = 0 // 32
    const testOffsetY = 0 // 32
    const quotientX = Math.floor(this.camera.x / 32)
    const quotientY = Math.floor(this.camera.y / 32)
    const residueX = this.camera.x % 32
    const residueY = this.camera.y % 32
    let textureSource = tileTexture

    for (let i = 0; i < this.camera.height; i++) { // i номер строки
      for (let j = 0; j < this.camera.width; j++) { // j номер столбца
        const tileDestX = j + quotientX
        const tileDestY = i + quotientY
        if ( !(tileDestX >= 0 && tileDestX < this.width && tileDestY >= 0 && tileDestY < this.height) ) {
          continue
        }
        const tileId = this.data[tileDestY * this.width + tileDestX]
        if (tileId < 0) {
          throw Error("tileId < 0")
        }

        const tileSourceX = tileId % this.textureSizeInTiles // 0 <= id <= 255 
        let tileSourceY

        if (tileId < 256) {
          textureSource = tileTexture
          tileSourceY = Math.floor(tileId / this.textureSizeInTiles)
        } else {
          textureSource = structuresTexture
          tileSourceY = Math.floor( (tileId - 256) / this.textureSizeInTiles )
        }
        

        ctx.drawImage (
          textureSource, // CanvasImageSource
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