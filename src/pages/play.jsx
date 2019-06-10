import React from 'react';
import { NavBar, Icon } from 'antd-mobile';
import Player from '@/containers/Play'
import MiniPlay from '@/containers/MiniPlay'
import './play.module.scss'
export default class Play extends React.Component {
  state = {
    picUrl: ''
  }
  render () {
    return (
      <div className="common-page">
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
        <MiniPlay></MiniPlay>
      </div>
    )
  }
}