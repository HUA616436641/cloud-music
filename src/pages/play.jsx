import React from 'react';
import { NavBar, Icon } from 'antd-mobile';
import Player from '@/containers/Play'
import MiniPlayer from '@/containers/MiniPlayer'
import './play.module.scss'
export default class Play extends React.Component {
  state = {
    picUrl: ''
  }
  render () {
    return (
      <div className="common-page" styleName="common-page">
        <div styleName="background" style={{ backgroundImage: 'url(' + this.state.picUrl + ')' }}></div>
        <NavBar
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={() => console.log('onLeftClick')}
          rightContent={[
            <Icon key="0" type="search" />,
          ]}
        >
        </NavBar>
        <Player></Player>
        <MiniPlayer></MiniPlayer>
      </div>
    )
  }
}