class GameMap {
  /** Size of `tex1.bmp` in tiles */
  static LANDSCAPE_TEXTURE_SIZE = 256;
  /** Size of `structures.bmp.bmp` in tiles */
  static SCTRUCTURES_TEXTURE_SIZE = 256;
  /** Upper bound for `tileId` type */
  static MAX_TILE_ID = GameMap.SCTRUCTURES_TEXTURE_SIZE + GameMap.LANDSCAPE_TEXTURE_SIZE;

  /**
   * @param {HTMLImageElement[]} textures
   * @param {number} width width of the map
   * @param {number} height height of the map
   */
  constructor(textures, width, height) {
    this.textureSizeInTiles = SCTRUCTURES_TEXTURE_WIDTH;
    this.textures = textures; // source
    this.width = width;
    this.height = height;
    this.data = new Uint16Array(0);
    this.data_stored = new Uint16Array(0);
    // позиция камеры должна различаеться на один пиксель т.е. 1/32 размера тайла
    this.camera = {
      x: 0,
      y: 0,
      width: Math.floor(CANVAS_WIDTH / 32),
      height: Math.floor(CANVAS_HEIGHT / 32),
    };
  }

  getTileTexture() {
    return this.textures[0];
  }

  getStructuresTexture() {
    return this.textures[1];
  }

  /**
   * @param {ArrayLike<number> | ArrayBuffer} inputArray
   */
  fromArray(inputArray) {
    this.data = new Uint16Array(inputArray);
  }

  /** Checks that data is loaded.
   * If `GameMap.data` is not loaded, it is an empty array `[]` */
  isLoaded() {
    return this.data.length > 0;
  }

  /**
   * @param {number} x
   * @param {number} y
   */
  getTile(x, y) {
    return this.data[y * this.width + x];
  }

  /**
   * @param {number} tileId number in range `[0..65535]`
   * @param {number} x
   * @param {number} y
   */
  setTile(tileId, x, y) {
    this.data[y * this.width + x] = tileId;
  }

  /**
   * @param {number} leftTileId minimum tile id
   * @param {number} rightTileId maximum tile id
   */
  randomizeMap(leftTileId, rightTileId) {
    for(let i = 0; i < this.data.length; i++) {
      this.data[i] = randint(leftTileId, rightTileId);
    }
  }

  /**
   * @param {number} sourceId
   * @param {number} width
   * @param {number} height
   * @param {number} x
   * @param {number} y
   */
  setBuildTiles(sourceId, width, height, x, y) {
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        this.setTile(sourceId + j + i * this.textureSizeInTiles, x + j, y + i);
      }
    }
  }

  /** @param {CanvasRenderingContext2D} ctx */
  draw(ctx) {
    if (this.isLoaded() === false) {
      throw new Error('data not loaded');
    }
    // Reset current transformation matrix to the identity matrix
    // ctx.setTransform(1, 0, 0, 1, 0, 0);

    const tileTexture = this.getTileTexture();
    const structuresTexture = this.getStructuresTexture();
    ctx.save();
    ctx.scale(SCALE_FACTOR, SCALE_FACTOR);
    const testOffsetX = 0; // 32
    const testOffsetY = 0; // 32
    const quotientX = Math.floor(this.camera.x / TILE_SIZE);
    const quotientY = Math.floor(this.camera.y / TILE_SIZE);
    const residueX = Math.floor(this.camera.x) % TILE_SIZE;
    const residueY = Math.floor(this.camera.y) % TILE_SIZE;
    let textureSource = tileTexture;

    for (let i = 0; i < this.camera.height / SCALE_FACTOR + 1; i++) { // i index of row
      for (let j = 0; j < this.camera.width / SCALE_FACTOR + 1; j++) { // j index of column
        const tileDestX = j + quotientX;
        const tileDestY = i + quotientY;
        if ( !(tileDestX >= 0 && tileDestX < this.width && tileDestY >= 0 && tileDestY < this.height) ) {
          continue;
        }
        const tileId = this.getTile(tileDestX, tileDestY);

        if (tileId < 0 || tileId > GameMap.MAX_TILE_ID) {
          throw new Error(`tileId not in range: [0..${GameMap.MAX_TILE_ID}]`);
        }

        const tileSourceX = tileId % this.textureSizeInTiles; // 0 <= id <= 255 
        let tileSourceY = undefined;

        if (tileId < GameMap.LANDSCAPE_TEXTURE_SIZE) {
          textureSource = tileTexture;
          tileSourceY = Math.floor(tileId / this.textureSizeInTiles);
        } else {
          textureSource = structuresTexture;
          tileSourceY = Math.floor((tileId - GameMap.LANDSCAPE_TEXTURE_SIZE) / this.textureSizeInTiles);
        }
        
        ctx.drawImage(
          textureSource, // CanvasImageSource
          TILE_SIZE * tileSourceX, TILE_SIZE * tileSourceY, //  sx: number, sy: number
          TILE_SIZE, TILE_SIZE, // sw: number, sh: number
          TILE_SIZE * j - residueX + testOffsetX, TILE_SIZE * i - residueY + testOffsetY, // dx: number, dy: number
          TILE_SIZE, TILE_SIZE // dw: number, dh: number
        );
      }
    }
    ctx.restore();
  }
}
