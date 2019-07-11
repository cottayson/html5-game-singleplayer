class ImageManager {
  constructor(ext) {
    this.countImageFiles = 0
    this.fileExtension = ext
    this.images = []
  }

  load(imageNames, handleLoadImages) {
    for (let i = 0; i < imageNames.length; i++) {
      const img = new Image()
      this.setImageSrc(img, imageNames[i], imageNames.length, handleLoadImages)
      this.images.push(img)
    }
  }

  setImageSrc(img, name, numberOfPictures, handleLoadImages) {
    // why function() does not work?
    img.onload = () => {
      this.countImageFiles++
      console.log(`load image ${img.src}`)
      if (this.countImageFiles == numberOfPictures) {
        handleLoadImages()
      }
    }
    img.src = PATH_TO_IMAGES + name + this.fileExtension
  }
}