class ImageManager {
  /**
   * @param {string} pathToImages
   * @param {string[]} names
   */
  constructor(pathToImages, names) {
    this.path = pathToImages;
    this.names = names;
    this.countImageFiles = 0;
    /** @type {HTMLImageElement[]} */
    this.images = [];
  }

  /**
   * @param {() => void} handleLoadImages
   */
  load(handleLoadImages) {
    this.countImageFiles = 0;
    for (let i = 0; i < this.names.length; i++) {
      const img = new Image();
      this.setImageSrc(img, this.names[i], this.names.length, handleLoadImages);
      this.images.push(img);
    }
  }

  /**
   * @param {HTMLImageElement} img
   * @param {string} name
   * @param {number} numberOfPictures
   * @param {() => void} handleLoadImages
   */
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
