import React from "react"
import { NavBar, Icon } from "antd-mobile"
import { home } from "../api"
import MiniPlayerCtr from "@/containers/MiniPlay"
import PlaylistCtr from "@/containers/Playlist"
import { goBack } from "@/utils"
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
    this.props.history.push(`/play/${song.id}`)
  }
  render() {
    return (
      <div className="common-page">
        <NavBar
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={goBack}
          rightContent={[<Icon key="0" type="search" />]}
          // rightContent={[
          //     <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
          //     <Icon key="1" type="ellipsis" />,
          // ]}
        />
        <PlaylistCtr> </PlaylistCtr>
        <MiniPlayerCtr />
      </div>
    )
  }
}
