import { ImagePicker, WingBlank, SegmentedControl } from "antd-mobile"
import React from "react"
import { user } from "../api"

class Upload extends React.Component {
  state = {
    files: [],
    multiple: true
  }
  onChange = (files, type, index) => {
    this.setState({
      files
    })
    let formData = new FormData()
    files.forEach(v => {
      if (!v.previewUrl) {
        formData.append("files", v.file)
      }
    })
    user.upload(formData).then(res => {
      console.log(res)
    })
  }
  render() {
    const { files } = this.state
    return (
      <ImagePicker
        files={files}
        onChange={this.onChange}
        onImageClick={(index, fs) => console.log(index, fs)}
        selectable={files.length < 7}
        multiple={this.state.multiple}
      />
    )
  }
}

export default Upload
