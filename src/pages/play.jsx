import React from 'react';
import { NavBar, Icon, Slider } from 'antd-mobile';
import css from './play.module.scss';
import { home } from '@/api'
import BScroll from 'better-scroll'
let lrcScroll
export default class Play extends React.Component {
    constructor() {
        super()
        this.state = {
            songUrl: '',
            picUrl: '',
            lrcArr: [],
            curTimeStamp: 0,
            duration: 0,
            // 是否拖动状态
            draging: false,
            // 是否播放状态
            playing: true

        }
    }
    componentWillMount () {
        let id = this.props.match.params.id
        if (!id) return
        home.getSongDetail({ ids: id }).then(res => {
            this.setState({
                duration: res.songs[0].dt,
                picUrl: res.songs[0].al.picUrl
            })
        })
        home.getSongUrl({ id }).then(res => {
            this.setState({
                songUrl: res.data[0].url
            })
        })
        home.getLyric({ id }).then(res => {
            if (res.lrc && res.lrc.lyric) {
                let lrcArr = this.parseLrc(res.lrc.lyric)
                this.setState({
                    lrcArr
                })
            }
        })

    }
    componentDidMount () {
        let wrapper = document.querySelector('.lrc-wrap')
        lrcScroll = new BScroll(wrapper, {})
    }
    formatToTime (timeStamp) {
        // let time = parseInt(timeStamp) / 1000
        let m = Math.floor(timeStamp / 60)
        m < 10 && (m = '0' + m)
        let s = Math.floor(timeStamp % 60)
        s < 10 && (s = '0' + s)
        return `${m}:${s}`
    }
    formatToNum (time) {
        let m = parseInt(time.split(':')[0])
        let s = parseInt(time.split(':')[1])
        return 60 * m + s
    }
    parseLrc (text) {
        let res = text.split('\n')
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
    onTimeUpdate () {
        let curTimeStamp = document.querySelector('.player').currentTime
        let idx = this.state.lrcArr.findIndex(line => line.timeStamp === this.formatToTime(curTimeStamp))
        if (idx >= 0) {
            // 滚动歌词
            let el = document.querySelector('.lrc-list')
            let lrcEl = el.querySelectorAll('.lrc-item')[idx]
            lrcScroll.scrollToElement(lrcEl, 300, 0, -150)

            // 歌词高亮
            let lrcArr = this.state.lrcArr.map(line => ({
                ...line,
                active: line.timeStamp === this.formatToTime(curTimeStamp)
            }))
            this.setState({
                lrcArr
            })
        }
        if (!this.state.draging) {
            this.setState({
                curTimeStamp
            })
        }
    }
    onTimeChange (val) {
        // 设置播放时间
        this.setState({
            draging: true,
            curTimeStamp: val
        })
    }
    onAfterTimeChange (val) {
        let state = this.state
        document.querySelector('.player').currentTime = val
        this.setState({
            curTimeStamp: val
        })
        this.setState({
            draging: false
        })
        // 滚动歌词
        let idx = state.lrcArr.findIndex(line => line.timeStamp === this.formatToTime(val))
        if (idx) {
            let el = document.querySelector('.lrc-list')
            let lrcEl = el.querySelectorAll('.lrc-item')[idx]
            lrcScroll.scrollToElement(lrcEl, 300, 0, -150)
        }
    }
    togglePlay () {
        let player = document.querySelector('.player')
        if (player.paused) {
            player.play()
            this.setState({
                playing: true
            })
        } else {
            player.pause()
            this.setState({
                playing: false
            })
        }
    }
    render () {
        let state = this.state
        // let detail = this.state.detail
        let lrcList
        if (this.state.lrcArr.length) {
            lrcList = (
                this.state.lrcArr.map((item, index) => (
                    <div className={`lrc-item ${item.active ? 'active' : ''}`} key={index}>
                        {item.content}
                    </div>
                )))
        } else {
            lrcList = (<div>加载中。。。</div>)
        }
        return (
            <div className="play-p common-page">
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => console.log('onLeftClick')}
                    rightContent={[
                        <Icon key="0" type="search" />,
                    ]}
                >
                </NavBar>
                <audio src={state.songUrl} onTimeUpdate={this.onTimeUpdate.bind(this)} controls autoPlay={true} className="player"> </audio>
                <div className="content">
                    <div className="lrc-wrap">
                        <div className="lrc-list">
                            {lrcList}
                        </div>
                    </div>
                    <div className="control">
                        <div className="slider">
                            <span className="cur-time">{this.formatToTime(state.curTimeStamp)}</span>
                            <Slider
                                defaultValue={0}
                                value={state.curTimeStamp}
                                min={0}
                                max={Math.floor(state.duration / 1000)}
                                onChange={this.onTimeChange.bind(this)}
                                onAfterChange={this.onAfterTimeChange.bind(this)}
                                onClick={() => { console.log(555) }}
                                aa={123}
                            />
                            <span className="total-time">{this.formatToTime(state.duration / 1000)}</span>
                        </div>
                        <div className="play-btns">
                            <span className="iconfont icon-danqu"></span>
                            <span className="iconfont icon-prev"></span>
                            <span className={`iconfont ${state.playing ? 'icon-pause' : 'icon-play1'}`} onClick={this.togglePlay.bind(this)}></span>
                            <span className="iconfont icon-next"></span>
                            <span className="iconfont icon-play-list"></span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}