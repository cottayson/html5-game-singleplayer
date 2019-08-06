class BinaryLoader {
    constructor(pathToBinaryFile) {
      this.pathToBinaryFile = pathToBinaryFile
    }

    load(onLoadHandler, doAfterLoad) {
      const request = new XMLHttpRequest()
      request.open("GET", this.pathToBinaryFile)
      request.responseType = "arraybuffer" // the important part
      request.onreadystatechange = () => {
        if (request.readyState == REQUEST_READYSTATE_OK) {
          onLoadHandler(request.mozResponseArrayBuffer || request.response) // your arrayBuffer
          console.log('callback: ', doAfterLoad)
          if (doAfterLoad !== undefined) {
            doAfterLoad()
          }
        }
      }
      
      request.send()
    }
}