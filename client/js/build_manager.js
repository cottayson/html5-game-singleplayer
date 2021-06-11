class BuildManager {
  constructor(textureMapping) {
    this.textureMapping = textureMapping;
  }

  _getId(texturePos) {
    return 256 + texturePos.x + texturePos.y * 16;
  }

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
