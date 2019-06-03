import React from "react"
import BScroll from "better-scroll"
import { withRouter } from "react-router"
import { Slider } from "antd-mobile"
import { home } from "@/api"
import "./play.module.scss"

let lrcScroll
class Play extends React.Component {
  state = {
    // songUrl: "",
    // cover: "",
    lrcArr: undefined,
    // curTimeStamp: 0,
    // duration: 0,
    // 是否拖动状态
    // draging: false,
    // 是否播放状态
    // playing: false,
    showCover: true,
    curLrc: undefined,
  }
  componentWillMount () {
    let { getSongDetail } = this.props
    let id = this.props.match.params.id
    if (!id) return
    // home.getSongDetail({ ids: id }).then(res => {
    //   // this.setState({
    //   //   duration: res.songs[0].dt,
    //   //   cover: res.songs[0].al.cover
    //   // })
    //   let params = {
    //     duration: res.songs[0].dt,
    //     cover: res.songs[0].al.picUrl
    //   }
    getSongDetail(id)
    // })
  }
  componentDidMount () {
    let { startPlay } = this.props
    let id = this.props.match.params.id
    // home.getLyric({ id }).then(res => {
    //   let obj = {}
    //   if (res.lrc && res.lrc.lyric) {
    //     let lrcArr = this.parseLrc(res.lrc.lyric)
    //     obj.lrcArr = lrcArr
    //   } else {
    //     obj.lrcArr = []
    //   }
    //   this.setState(obj)
    // })
    // home.getSongUrl({ id }).then(res => {
    //   // this.setState({
    //   //   songUrl: res.data[0].url
    //   // })
    //   startPlay({songUrl: res.data[0].url})
    // })
    let wrapper = document.querySelector(".lrc-wrap")
    lrcScroll = new BScroll(wrapper, {})
  }
  // onCanPlayThrough = () => {
  //   setTimeout(() => {
  //     document.querySelector(".player").play()
  //     this.setState({
  //       playing: true
  //     })
  //   }, 500)
  // }
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
  onTimeUpdate = () => {
    let { lrcArr, draging } = this.state
    let curTimeStamp = document.querySelector(".player").currentTime
    let obj = {}
    if (lrcArr) {
      let idx = lrcArr.findIndex(
        line => line.timeStamp === this.formatToTime(curTimeStamp)
      )
      if (idx >= 0) {
        // 滚动歌词
        this.scrollLrc(idx)
        // 歌词高亮
        let tempArr = lrcArr.map(line => ({
          ...line,
          active: line.timeStamp === this.formatToTime(curTimeStamp)
        }))
        obj.lrcArr = tempArr
        obj.curLrc = lrcArr[idx]
      }
    }
    if (!draging) {
      obj.curTimeStamp = curTimeStamp
    }
    this.setState(obj)
  }
  onTimeChange (val) {
    // 设置播放时间
    this.setState({
      draging: true,
      curTimeStamp: val
    })
  }
  onAfterTimeChange (val) {
    let { lrcArr } = this.state
    this.setState({
      curTimeStamp: val
    })
    document.querySelector(".player").currentTime = val
    this.setState({
      draging: false
    })
    // 滚动歌词
    if (lrcArr) {
      let idx = lrcArr.findIndex(
        line => line.timeStamp === this.formatToTime(val)
      )
      idx >= 0 && this.scrollLrc(idx)
    }
  }
  scrollLrc (idx) {
    let el = document.querySelector(".lrc-list")
    let lrcEl = el.querySelectorAll(".lrc-item")[idx]
    lrcScroll.scrollToElement(lrcEl, 300, 0, -150)
  }
  togglePlay () {
    let player = document.querySelector(".player")
    let obj = {}
    // console.log(player)
    if (player.paused) {
      player.play()
      obj.playing = true
    } else {
      player.pause()
      obj.playing = false
    }
    this.setState(obj)
  }
  toggleCover = () => {
    this.setState({
      showCover: !this.state.showCover
    })
  }
  render () {
    let {
      lrcArr,
      showCover,
      curLrc,
    } = this.state
    let {
      cover,
      playing,
      duration,
      curTimeStamp
    } = this.props.playDetail
    // let detail = this.state.detail
    let lrcList
    if (lrcArr && lrcArr.length > 0) {
      lrcList = lrcArr.map((item, index) => (
        <div
          className="lrc-item"
          styleName={`lrc-item ${item.active ? "active" : ""}`}
          key={index}
        >
          {item.content}
        </div>
      ))
    } else {
      lrcList = (
        <div styleName="loading">
          {" "}
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
              onChange={this.onTimeChange.bind(this)}
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
            <span className="iconfont icon-danqu" />
            <span className="iconfont icon-prev" />
            <span
              className={`iconfont ${playing ? "icon-pause" : "icon-play1"}`}
              onClick={this.togglePlay.bind(this)}
            />
            <span className="iconfont icon-next" />
            <span className="iconfont icon-play-list" />
          </div>
        </div>
      </div>
    )
  }
}
export default withRouter(Play)
