import React from "react"
// import { Icon } from 'antd-mobile'
import { withRouter } from "react-router"
import BScroll from "better-scroll"
import "./playlist.module.scss"
import { home } from "../api"

let scroller
class Playlist extends React.Component {
  state = {
    detail: {
      creator: {},
      tracks: []
    }
  }
  onSongClick(song) {
    let { updatePlaylist, updateCache } = this.props
    this.props.history.push(`/play/${song.id}`)
    updatePlaylist(this.state.detail.tracks)
    updateCache({
      playlist: { ...this.state.detail, scrollY: scroller.y }
    })
  }
  componentWillMount() {}
  componentDidMount() {
    const initScroll = (detail, scrollY = 0) => {
      this.setState({ detail })
      let wrapper = this.refs["songList"]
      scroller = new BScroll(wrapper, { click: true })
      setTimeout(() => {
        scroller.scrollTo(0, scrollY, 100)
      })
    }
    let id = this.props.match.params.id
    let { cache } = this.props
    if (!id) return
    let playlist = cache.playlist
    if (playlist && playlist.id === id - 0) {
      initScroll(playlist, playlist.scrollY)
      return
    }
    home.getPlayListDetail({ id }).then(res => {
      initScroll(res.playlist)
    })
  }
  render() {
    let detail = this.state.detail
    return (
      <div className="content" styleName="content">
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
              style={{
                display: "-webkit-box",
                WebkitBoxOrient: "vertical"
              }}
            >
              {detail.description}
            </div>
          </div>
        </div>
        <div className="song-list" styleName="song-list" ref="songList">
          <ul>
            {this.state.detail.tracks.map((item, index) => (
              <li
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
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
export default withRouter(Playlist)
