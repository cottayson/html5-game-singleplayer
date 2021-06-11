class BuildManager {
  /** Starting texture index for `structures.bmp` image. */
  static STRUCTURES_TEXTURE_INDEX = 256;

  /**
   * @param {JSONLoader} textureMapping 
   */
  constructor(textureMapping) {
    this.textureMapping = textureMapping;
  }

  /**
   * @param {{ x: number; y: number; }} texturePos
   * @private
   */
  _getId(texturePos) {
    return BuildManager.STRUCTURES_TEXTURE_INDEX + texturePos.x + texturePos.y * 16;
  }

  /**
   * @param {Unit} unit
   * @param {number} x
   * @param {number} y
   */
  placeBuilding(unit, x, y) {
    const rect = unit.spriteSource;
    if (unit.drawingState < 0 || unit.drawingState >= rect.positions.length) {
      throw new Error(`unit.drawingState = ${unit.drawingState} is not in range [0..${rect.positions.length - 1}]`);
    }
    const pos = rect.positions[unit.drawingState];
    gameMap.setBuildTiles(this._getId(pos), rect.w, rect.h, x, y);
  }

  loadTextureMapping() {
    console.log('loadTextureMapping:', this.textureMapping.isLoaded());
  }
}
