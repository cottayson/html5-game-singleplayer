class BuildManager {
  constructor(textureMap) {
    this.textureMap = textureMap
  }

  loadTextureMap() {
    console.log('loadTextureMap: ')
    console.log(this.textureMap.isLoaded())
    console.log(this.textureMap.getData())
  }
}