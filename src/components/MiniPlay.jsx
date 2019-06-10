import React from "react"
import "./MiniPlay.module.scss"
export default class MiniPlay extends React.Component {
  render() {
    let { songUrl, draging } = this.props.playDetail
    let { onTimeUpdate } = this.props
    return (
      <div styleName="mini-play">
        {/* <audio
          src={songUrl}
          controls
          styleName="player"
          className="player"
          onTimeUpdate={() => {
            !draging && onTimeUpdate()
          }}
          onCanPlayThrough={this.onCanPlayThrough}
        /> */}
      </div>
    )
  }
}
