class ImageManager {
  constructor(pathToImages, names) {
    this.path = pathToImages;
    this.names = names;
    this.countImageFiles = 0;
    this.images = [];
  }

  load(handleLoadImages) {
    this.countImageFiles = 0;
    for (let i = 0; i < this.names.length; i++) {
      const img = new Image();
      this.setImageSrc(img, this.names[i], this.names.length, handleLoadImages);
      this.images.push(img);
    }
  }

  setImageSrc(img, name, numberOfPictures, handleLoadImages) {
    // why function() does not work?
    img.onload = () => {
      this.countImageFiles++;
      // console.log(`load image ${img.src}`)
      if (this.countImageFiles === numberOfPictures) {
        handleLoadImages();
      }
    }
    img.src = this.path + name;
  }
}
