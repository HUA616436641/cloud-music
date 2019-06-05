import React from "react"
import BScroll from "better-scroll"
import { withRouter } from "react-router"
import { Slider } from "antd-mobile"
import { home } from "@/api"
import "./play.module.scss"

let lrcScroll
class Play extends React.Component {
  state = {
    lrcArr: undefined,
    showCover: true,
    curLrc: undefined
  }
  componentWillMount() {
    let { getSongDetail } = this.props
    let id = this.props.match.params.id
    if (!id) return
    getSongDetail(id - 0)
  }
  componentDidMount() {
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
    lrcScroll = new BScroll(wrapper, {})
  }
  formatToTime(timeStamp) {
    let m = Math.floor(timeStamp / 60)
    m < 10 && (m = "0" + m)
    let s = Math.floor(timeStamp % 60)
    s < 10 && (s = "0" + s)
    return `${m}:${s}`
  }
  formatToNum(time) {
    let m = parseInt(time.split(":")[0])
    let s = parseInt(time.split(":")[1])
    return 60 * m + s
  }
  parseLrc(text) {
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
  onAfterTimeChange(val) {
    let { onAfterTimeChange } = this.props
    onAfterTimeChange(val)
    document.querySelector(".player").currentTime = val
  }
  scrollLrc(idx) {
    let el = document.querySelector(".lrc-list")
    let lrcEl = el.querySelectorAll(".lrc-item")[idx]
    lrcScroll.scrollToElement(lrcEl, 300, 0, -150)
  }
  togglePlay() {
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
  isLrcActive(index, curTimeStamp) {
    curTimeStamp = parseInt(curTimeStamp)
    let idx = this.state.lrcArr.findIndex((v, i, arr) => {
      return v.timeStamp && arr[i + 1].timeStamp
        ? this.formatToNum(v.timeStamp) <= curTimeStamp &&
            this.formatToNum(arr[i + 1].timeStamp) > curTimeStamp
        : false
    })
    return idx === index
  }
  componentWillReceiveProps(a,b) {
    console.log(a,b)
  }
  componentWillUpdate(nextProps) {
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
  render() {
    let { lrcArr, showCover, curLrc } = this.state
    let { cover, playing, duration, curTimeStamp, mode } = this.props.playDetail
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
              aa={123}
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

            <span
              className="iconfont icon-next"
              onClick={() => {
                this.props.history.push(`/play/30780431`)
              }}
            />
            <span className="iconfont icon-play-list" />
          </div>
        </div>
      </div>
    )
  }
}
export default withRouter(Play)
