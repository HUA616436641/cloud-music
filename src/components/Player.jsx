import React from "react"
import "./Player.module.scss"
export default class MiniPlay extends React.Component {
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
      <div styleName="player-wrap">
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
