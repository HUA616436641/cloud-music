import React from "react"
// import { Icon } from 'antd-mobile'
import { withRouter } from "react-router"
import "./playlist.module.scss"
import { home } from "../api"

class Playlist extends React.Component {
  constructor() {
    super()
    this.state = {
      detail: {
        creator: {},
        tracks: []
      }
    }
  }
  componentWillMount() {
    let id = this.props.match.params.id
    if (!id) return
    home.getPlayListDetail({ id }).then(res => {
      this.setState({
        detail: res.playlist
      })
    })
  }
  onSongClick(song) {
    let { onPlay } = this.props
    this.props.history.push(`/play/${song.id}`)
    onPlay(song, this.state.detail.tracks)
  }
  render() {
    let detail = this.state.detail
    return (
      <div className="content">
        <div styleName="detail">
          <img src={detail.coverImgUrl} styleName="cover" alt="" />
          <div styleName="info">
            <div styleName="playlist-name">{detail.name}</div>
            <div styleName="creator">
              <img src={detail.creator.avatarUrl} styleName="avatar" alt="" />
              <span styleName="name">{detail.creator.nickname}></span>
            </div>
            <div
              styleName="desc"
              style={{ display: "-webkit-box", WebkitBoxOrient: "vertical" }}
            >
              {detail.description}
            </div>
          </div>
        </div>
        <div className="song-list">
          {this.state.detail.tracks.map((item, index) => (
            <div
              styleName="song"
              key={index}
              onClick={() => this.onSongClick(item)}
            >
              <div styleName="lt">{index + 1}</div>
              <div styleName="ct">
                <div styleName="name">{item.name}</div>
                <div styleName="author">
                  {item.ar[0].name}-{item.al.name}
                </div>
              </div>
              <div styleName="rt">
                <span
                  className="iconfont icon-play1"
                  style={{ fontSize: "0.6rem" }}
                />
                <span className="iconfont icon-more" />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
}
export default withRouter(Playlist)
