import React from "react"
import BScroll from "better-scroll"
import { withRouter } from "react-router"
import { Slider, Modal } from "antd-mobile"
import {
  List,
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache
} from "react-virtualized"
import { home } from "@/api"
import "./play.module.scss"
const cache = new CellMeasurerCache({
  fixedWidth: true,
  defaultHeight: 50
})
let arr = new Array(500).fill(1)
let lrcScroll
class Play extends React.Component {
  state = {
    lrcArr: undefined,
    showCover: true,
    curLrc: undefined,
    playlistVisible: false
  }
  componentWillMount () {
    let { getSongDetail } = this.props
    let id = this.props.match.params.id
    if (!id) return
    getSongDetail(id - 0)
  }
  componentDidMount () {
    let id = this.props.match.params.id
    home.getLyric({ id }).then(res => {
      let obj = {}
      if (res.lrc && res.lrc.lyric) {
        let lrcArr = this.parseLrc(res.lrc.lyric)
        obj.lrcArr = lrcArr
      } else {
        obj.lrcArr = []
      }
      this.setState(obj)
    })
    let wrapper = document.querySelector(".lrc-wrap")
    lrcScroll = new BScroll(wrapper, { click: true })
  }
  formatToTime (timeStamp) {
    let m = Math.floor(timeStamp / 60)
    m < 10 && (m = "0" + m)
    let s = Math.floor(timeStamp % 60)
    s < 10 && (s = "0" + s)
    return `${m}:${s}`
  }
  formatToNum (time) {
    let m = parseInt(time.split(":")[0])
    let s = parseInt(time.split(":")[1])
    return 60 * m + s
  }
  parseLrc (text) {
    let res = text.split("\n")
    let timeReg = /^\[(\d{2}):(\d{2})\.(\d*)\]/
    res = res.map(line => {
      let obj = {}
      let result = line.match(timeReg)
      if (result) {
        obj.timeStamp = `${result[1]}:${result[2]}`
        obj.content = line.substring(result[0].length)
      }
      return obj
    })
    return res
  }
  onAfterTimeChange (val) {
    let { onAfterTimeChange } = this.props
    onAfterTimeChange(val)
    document.querySelector(".player").currentTime = val
  }
  scrollLrc (idx) {
    let el = document.querySelector(".lrc-list")
    let lrcEl = el.querySelectorAll(".lrc-item")[idx]
    lrcScroll.scrollToElement(lrcEl, 300, 0, -150)
  }
  togglePlay () {
    let { onTogglePlay } = this.props
    let player = document.querySelector(".player")
    let val
    if (player.paused) {
      player.play()
      val = true
    } else {
      player.pause()
      val = false
    }
    setTimeout(() => {
      onTogglePlay(val)
    })
  }
  toggleCover = () => {
    this.setState({
      showCover: !this.state.showCover
    })
  }
  isLrcActive (index, curTimeStamp) {
    curTimeStamp = parseInt(curTimeStamp)
    let idx = this.state.lrcArr.findIndex((v, i, arr) => {
      return v.timeStamp && arr[i + 1].timeStamp
        ? this.formatToNum(v.timeStamp) <= curTimeStamp &&
        this.formatToNum(arr[i + 1].timeStamp) > curTimeStamp
        : false
    })
    return idx === index
  }
  showPlaylist () {
    this.setState({ playlistVisible: true })
  }
  hidePlaylist () {
    this.setState({ playlistVisible: false })
  }
  cellRenderer ({ index, key, parent, style }) {
    let { getSongDetail, playDetail } = this.props
    let detail = this.props.playlist[index]
    return (
      <CellMeasurer
        cache={cache}
        columnIndex={0}
        key={key}
        parent={parent}
        rowIndex={index}
      >
        <div
          styleName={`song-item ${playDetail.id === detail.id ? 'active' : ''}`}
          style={style}
          onClick={() => getSongDetail(detail.id)}
        >
          <div styleName="lt">
            {
              playDetail.id === detail.id &&
              <span
                className="iconfont icon-guangbo"
              />
            }
            {detail.name}
            <span styleName="author">
              &nbsp;-&nbsp; {detail.ar.map(v => v.name).join("/")}
            </span>
          </div>
          <span
            className="iconfont icon-guanbi"
            styleName="rt"
            onClick={e => {
              e.stopPropagation()
              this.onDeletePlaylist(detail.id)
            }}
          />
        </div>
      </CellMeasurer>
    )
  }
  onClearPlaylist () {
    let { onClearPlaylist, stopPlay } = this.props
    this.props.history.push(`/home`)
    stopPlay()
    onClearPlaylist()
  }
  onDeletePlaylist (id) {
    let {
      onDeletePlaylist,
      playlist,
      playDetail,
      onPlayNext,
      stopPlay
    } = this.props
    if (playlist.length === 1) {
      stopPlay()
      this.props.history.push(`/home`)
    }
    if (id === playDetail.id) {
      onPlayNext()
    }
    onDeletePlaylist(id)
  }
  componentWillUpdate (nextProps) {
    let { lrcArr } = this.state
    let { curTimeStamp } = nextProps.playDetail
    if (lrcArr) {
      let idx = lrcArr.findIndex(
        line => line.timeStamp === this.formatToTime(parseInt(curTimeStamp))
      )
      if (idx >= 0) {
        // 滚动歌词
        this.scrollLrc(idx)
      }
    }
  }
  render () {
    let { lrcArr, showCover, curLrc } = this.state
    let { cover, playing, duration, curTimeStamp, mode } = this.props.playDetail
    let playlist = this.props.playlist
    let { onToggleMode, onTimeChange, onPlayNext, onPlayPrev } = this.props
    let lrcList
    if (lrcArr && lrcArr.length > 0) {
      // 歌词高亮
      lrcList = lrcArr.map((item, index) => (
        <div
          className="lrc-item"
          styleName={`lrc-item ${
            this.isLrcActive(index, curTimeStamp) ? "active" : ""
            }`}
          key={index}
        >
          {item.content}
        </div>
      ))
    } else {
      lrcList = (
        <div styleName="loading">
          {lrcArr === undefined ? "加载中。。。" : "暂无歌词"}
        </div>
      )
    }
    return (
      <div className="content" styleName="content">
        <div
          styleName="background"
          style={{ backgroundImage: "url(" + cover + ")" }}
        />
        <div
          styleName="cover-wrap"
          style={{ display: showCover ? "block" : "none" }}
          onClick={this.toggleCover}
        >
          <div
            styleName={`cover ${playing !== undefined ? "animate" : ""}`}
            style={{
              backgroundImage: "url(" + cover + ")",
              animationPlayState: playing ? "running" : "paused"
            }}
          />
          <div styleName="current-lrc">{curLrc && curLrc.content}</div>
        </div>
        <div
          className="lrc-wrap"
          styleName="lrc-wrap"
          style={{ display: !showCover ? "block" : "none" }}
          onClick={this.toggleCover}
        >
          <div className="lrc-list" styleName="lrc-list">
            {lrcList}
          </div>
        </div>
        <div styleName="control">
          <div styleName="slider">
            <span styleName="cur-time">{this.formatToTime(curTimeStamp)}</span>
            <Slider
              defaultValue={0}
              value={curTimeStamp}
              min={0}
              max={Math.floor(duration / 1000)}
              onChange={onTimeChange}
              onAfterChange={this.onAfterTimeChange.bind(this)}
              onClick={() => {
                console.log(555)
              }}
            />
            <span styleName="total-time">
              {this.formatToTime(duration / 1000)}
            </span>
          </div>
          <div styleName="play-btns">
            <span
              className={"iconfont icon-" + mode.icon}
              onClick={onToggleMode.bind(this)}
            />
            <span className="iconfont icon-prev" onClick={onPlayPrev} />
            <span
              className={`iconfont ${playing ? "icon-pause" : "icon-play1"}`}
              onClick={this.togglePlay.bind(this)}
            />

            <span className="iconfont icon-next" onClick={onPlayNext} />
            <span
              className="iconfont icon-play-list"
              onClick={this.showPlaylist.bind(this)}
            />
          </div>
        </div>
        <Modal
          popup
          title={
            <div id="app" key="key">
              播放列表({playlist.length})
              <span
                className="iconfont icon-shanchu fr"
                onClick={this.onClearPlaylist.bind(this)}
              />
            </div>
          }
          className="playlist-modal"
          styleName="playlist-modal"
          visible={this.state.playlistVisible}
          onClose={this.hidePlaylist.bind(this)}
          animationType="slide-up"
          afterClose={() => {
            // alert("afterClose")
          }}
        >
          {/* <List renderHeader={() => <div>委托买入</div>} className="popup-list">
            {playlist.map((i, index) => (
              // <div key={index}>{index}</div>
              <List.Item key={index}>{index}</List.Item>
            ))}
          </List> */}
          <AutoSizer>
            {({ height, width }) => (
              <List
                height={height}
                rowCount={playlist.length}
                rowHeight={cache.rowHeight}
                deferredMeasurementCache={cache}
                rowRenderer={this.cellRenderer.bind(this)}
                width={width}
              />
            )}
          </AutoSizer>
        </Modal>
      </div>
    )
  }
}
export default withRouter(Play)
