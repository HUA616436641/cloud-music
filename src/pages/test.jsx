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
      <div className="aaa" style={{border:'1px solid red',height:'200px',width:'200px'}}></div>
    )
  }
}

export default Upload
