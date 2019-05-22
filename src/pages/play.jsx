import React from 'react';
import { NavBar, Icon, Slider } from 'antd-mobile';
import './play.scss';
import { home } from '@/api'
import BScroll from 'better-scroll'
let lrcScroll
export default class Play extends React.Component {
    constructor() {
        super()
        this.state = {
            songUrl: '',
            lrcArray: [],
            curTimeStamp: '00:00',
            length: 0
        }
    }
    componentWillMount () {
        let id = this.props.match.params.id
        if (!id) return
        home.getSongDetail({ ids: id }).then(res => {
            this.setState({
                length: res.songs[0].dt
            })
        })
        home.getSongUrl({ id }).then(res => {
            this.setState({
                songUrl: res.data[0].url
            })
        })
        home.getLyric({ id }).then(res => {
            let lrcArray = this.parseLrc(res.lrc.lyric)
            this.setState({
                lrcArray
            })
        })

    }
    componentDidMount () {
        let wrapper = document.querySelector('.lrc-wrap')
        lrcScroll = new BScroll(wrapper, {})
        setTimeout(() => {
            document.querySelector('.player').currentTime = 10
        }, 1000)
    }
    formatToTime (timeStamp) {
        let time = parseInt(timeStamp) / 1000
        let m = Math.floor(time / 60)
        m < 10 && (m = '0' + m)
        let s = Math.floor(time % 60)
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
        let timeReg = /^\[(\d{2}):(\d{2})\.(\d{2})\]/
        res = res.map(line => {
            let obj = {}
            let result = line.match(timeReg)
            if (result) {
                obj.timeStamp = `${result[1]}:${result[2]}`
                obj.content = line.substring(result[0].length)
            }
            return obj
        })
        return res.filter(line => line.content !== '')
    }
    onTimeUpdate (e) {
        let curTimeStamp = this.formatToTime(e.timeStamp)
        let idx = this.state.lrcArray.findIndex(line => line.timeStamp === curTimeStamp)
        if (idx >= 0) {
            let el = document.querySelector('.lrc-list')
            let lrcEl = el.querySelectorAll('.lrc-item')[idx]
            lrcScroll.scrollToElement(lrcEl, 300, 0, -150)
        }
        this.setState({
            curTimeStamp
        })
    }
    render () {
        let state = this.state
        // let detail = this.state.detail
        let lrcList
        if (this.state.lrcArray.length) {
            lrcList = (
                this.state.lrcArray.map((item, index) => (
                    <div className={`lrc-item ${item.timeStamp === this.state.curTimeStamp ? 'active' : ''}`} key={index}>
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
                <div className="content">
                    <audio src={this.state.songUrl} onTimeUpdate={this.onTimeUpdate.bind(this)} controls autoPlay={true} className="player"> </audio>
                    <div className="lrc-wrap" style={{ transform: `translateY(${this.state.lrcTop}px)` }}>
                        <div className="lrc-list">
                            {lrcList}
                        </div>
                    </div>
                    <div className="control">
                        <div className="slider">
                            <span className="cur-time">{state.curTimeStamp}</span>
                            <Slider
                                style={{ marginLeft: 10, marginRight: 10 }}
                                defaultValue={0}
                                value={this.formatToNum(state.curTimeStamp)}
                                min={0}
                                max={30}
                                onChange={() => { }}
                                onAfterChange={() => { }}
                            />
                            <span className="total-time">{this.formatToTime(state.length)}</span>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}