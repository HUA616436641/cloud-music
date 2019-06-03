import React from "react"
import "./MiniPlayer.module.scss"
export default class MiniPlayer extends React.Component {
  onCanPlayThrough = () => {
    let { togglePlayStatus } = this.props
    setTimeout(() => {
      document.querySelector(".player").play()
      togglePlayStatus(true)
    }, 2000)
  }
  render() {
    let { songUrl } = this.props.playDetail
    let { onTimeUpdate } = this.props
    return (
      <div styleName="mini-player">
        <audio
          src={songUrl}
          controls
          styleName="player"
          className="player"
          onTimeUpdate={onTimeUpdate}
          onCanPlayThrough={this.onCanPlayThrough}
        />
      </div>
    )
  }
}
