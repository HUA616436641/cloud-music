import React from "react"
import "./MiniPlay.module.scss"
export default class MiniPlay extends React.Component {
  render () {
    let { id, cover, playing, name, author } = this.props.playDetail
    let { playlist } = this.props
    let { onTimeUpdate } = this.props
    return (
      <div styleName="mini-play" style={{ display: id ? 'bolck' : 'none' }}>
        <div styleName="background"></div>
        <div styleName="song-info">
          <img src={cover} styleName="cover" alt="" />
          <div styleName="text">
            <div styleName="name">{name}</div>
            <div styleName="author">{author.map(v => v.name).join('/')}</div>
          </div>
        </div>
        <div styleName="btns">
          <span className="iconfont icon-play1"></span>
          <span className="iconfont icon-play-list"></span>
        </div>
      </div>
    )
  }
}
