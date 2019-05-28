import React from 'react';
import { NavBar, Icon } from 'antd-mobile';
import './playlist.module.scss';
import { home } from '../api'
export default class Playlist extends React.Component {
    constructor() {
        super()
        this.state = {
            detail: {
                creator: {},
                tracks: []
            }
        }
    }
    componentWillMount () {
        let id = this.props.match.params.id
        if (!id) return
        home.getPlayListDetail({ id }).then(res => {
            this.setState({
                detail: res.playlist
            })
        })
    }
    onSongClick (song) {
        this.props.history.push(`/play/${song.id}`)
    }
    render () {
        let detail = this.state.detail
        return (
            <div className="playlist-p common-page">
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => console.log('onLeftClick')}
                    rightContent={[
                        <Icon key="0" type="search" />,
                    ]}
                // rightContent={[
                //     <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
                //     <Icon key="1" type="ellipsis" />,
                // ]}
                >
                </NavBar>
                <div className="content">
                    <div className="detail">
                        <img src={detail.coverImgUrl} className="cover" alt="" />
                        <div className="info">
                            <div className="playlist-name">{detail.name}</div>
                            <div className="creator">
                                <img src={detail.creator.avatarUrl} className="avatar" alt="" />
                                <span className="name">{detail.creator.nickname}></span>
                            </div>
                            <div className="desc" style={{ display: '-webkit-box', 'WebkitBoxOrient': 'vertical' }}>{detail.description}</div>
                        </div>
                    </div>
                    <div className="song-list">
                        {this.state.detail.tracks.map((item, index) => (
                            <div className="song" key={index} onClick={() => this.onSongClick(item)}>
                                <div className="lt">{index + 1}</div>
                                <div className="ct">
                                    <div className="name">{item.name}</div>
                                    <div className="author">{item.ar[0].name}-{item.al.name}</div>
                                </div>
                                <div className="rt">
                                    <span className="iconfont icon-play1" style={{ fontSize: '0.6rem' }}></span>
                                    <span className="iconfont icon-more"></span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}