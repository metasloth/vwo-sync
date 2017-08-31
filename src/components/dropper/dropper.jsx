<div className="holder" onDragOver={this.handleOver} ondragleave={() => { return false }} ondragend={() => { return false }} onDrop={this.handleDrop} >
              Drag your file here
            </div>


handleDrop(e) {
    e.preventDefault()
    console.log('hey: ' + e)
    for (let f of e.dataTransfer.files) {
      console.log('File(s) you dragged here: ', f.path)
    }
  }

  handleOver(e) {
    e.preventDefault()
    console.log('yo: ' + e)
    
  }