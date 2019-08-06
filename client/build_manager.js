class BuildManager {
  constructor(buildProps) {
    this.props = buildProps
  }

  loadTextureMap() {
    console.log('loadTextureMap: ')
    console.log(this.props.isLoaded())
    console.log(this.props.getData())
  }
}