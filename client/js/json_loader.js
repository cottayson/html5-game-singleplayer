class JSONLoader {
  constructor(pathToFile) {
    this.pathToFile = pathToFile;
    this.data = null;
    this.loaded = false;
  }

  load(doAfterLoad) {
    const request = new XMLHttpRequest();
    request.open("GET", this.pathToFile, true/*async*/);
    request.responseType = "text"; // right is "json" but how handle error parseJson?
    request.onreadystatechange = () => {
      if (request.readyState === REQUEST_READYSTATE_OK) {
        try {
          this.data = JSON.parse(request.response);
        } catch (err) {
          console.error(`error load JSON file: ${this.pathToFile}`);
          throw err;
        }

        this.loaded = true;
        // this.data = request.response
        console.log('json data loaded:');
        // console.log(this.data)

        // console.log('callback: ', doAfterLoad)
        if (doAfterLoad !== undefined) {
          doAfterLoad();
        }
      }
    }
    
    request.send();
  }

  getData() {
    return this.data;
  }

  isLoaded() {
    return this.loaded;
  }
}
