class BinaryLoader {
  /** @param {string} pathToBinaryFile */
  constructor(pathToBinaryFile) {
    this.pathToBinaryFile = pathToBinaryFile;
  }

  /**
   * @param {{ (arrayBufferMap: any): void; }} onLoadHandler
   * @param {() => void} [doAfterLoad]
   */
  load(onLoadHandler, doAfterLoad) {
    const request = new XMLHttpRequest();
    request.open("GET", this.pathToBinaryFile);
    request.responseType = "arraybuffer"; // the important part
    request.onreadystatechange = () => {
      if (request.readyState === REQUEST_READYSTATE_OK) {
        // @ts-ignore
        onLoadHandler(request.mozResponseArrayBuffer || request.response); // your arrayBuffer
        if (doAfterLoad !== undefined) {
          doAfterLoad();
        }
      }
    }
    request.send();
  }
}
