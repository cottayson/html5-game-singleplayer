class BuildManager {
  constructor(textureMapping) {
    this.textureMapping = textureMapping;
  }

  getId(building) {
    return 256 + building.x + building.y * 16;
  }

  placeBuilding(building, x, y) {
    gameMap.setBuildTiles(this.getId(building), building.w, building.h, x, y);
  }

  loadTextureMapping() {
    console.log('loadTextureMapping:', this.textureMapping.isLoaded());
  }
}
