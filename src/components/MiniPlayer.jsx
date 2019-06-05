import React from "react"
import "./MiniPlayer.module.scss"
export default class MiniPlayer extends React.Component {
  onCanPlayThrough = () => {
    let { togglePlay } = this.props
    setTimeout(() => {
      document.querySelector(".player").play()
      togglePlay(true)
    }, 1000)
  }
  render() {
    let { songUrl, draging } = this.props.playDetail
    let { onTimeUpdate } = this.props
    return (
      <div styleName="mini-player">
        <audio
          src={songUrl}
          controls
          styleName="player"
          className="player"
          onTimeUpdate={() => {
            !draging && onTimeUpdate()
          }}
          onCanPlayThrough={this.onCanPlayThrough}
        />
      </div>
    )
  }
}
