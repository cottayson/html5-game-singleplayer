class Sprite {
    constructor(imageId, width, height) {
      this.x = 0
      this.y = 0
      this.angle = 0
      this.cx = -Math.floor(width / 2)
      this.cy = -Math.floor(height / 2)
      this.imageId = imageId
      this.width = width
      this.height = height
    }
  
    draw() {
      ctx.save()
      ctx.translate(-this.cx, -this.cy)
      ctx.rotate(this.angle)
      ctx.drawImage(
        images[this.imageId],
        this.x + this.cx, this.y + this.cy,
        this.width, this.height
      )
      ctx.restore()
    }
  }