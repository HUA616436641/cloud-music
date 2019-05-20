import React from 'react';
import { NavBar, Icon, Flex, Carousel } from 'antd-mobile';
import './playlist.scss';
import { home } from './api'
export default class Home extends React.Component {
    constructor() {
        super()
        this.state = {
            tracks: []
        }
    }
    componentWillMount () {
        let id = this.props.match.params.id
        if (!id) return
        home.getPlayListDetail({ id }).then(res => {
            this.setState({
                tracks: res.playlist.tracks
            })
        })
    }
    init () {
        // console.log(this.props.match.params)

    }
    render () {
        return (
            <div className="playlist-p">
                <div className="content">
                    {this.state.tracks.map((item,index) => (
                        <div className="track-item">
                           
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}