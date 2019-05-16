import React from 'react';
import { NavBar, InputItem, Button, Icon, Flex, Carousel } from 'antd-mobile';
import { createForm } from 'rc-form';
import './home.scss';
import { home } from './api'
export default class Home extends React.Component {
    constructor() {
        super()
        this.init()
        this.state = {
            banners: [],
            recommendList: []
        }
    }
    init () {
        let params = { type: 2 }
        home.getBanner(params).then(res => {
            this.setState({
                banners: res.banners
            })
        })
        home.getRecommendResource().then(res => {
            this.setState({
                recommendList: res.recommend
            })
        })
        // home.getRecommendSongs().then(res => {

        // })
    }
    render () {
        return (
            <div className="home-p">
                <div className="content">
                    <NavBar
                        mode="light"
                        icon={<Icon type="ellipsis" />}
                        onLeftClick={() => console.log('onLeftClick')}
                        rightContent={[
                            <Icon key="0" type="search" />,
                        ]}
                    // rightContent={[
                    //     <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
                    //     <Icon key="1" type="ellipsis" />,
                    // ]}
                    >
                        <Flex>
                            <Flex.Item>我的</Flex.Item>
                            <Flex.Item className="active">发现</Flex.Item>
                            <Flex.Item>朋友</Flex.Item>
                            <Flex.Item>视频</Flex.Item>
                        </Flex>
                    </NavBar>
                    <Carousel className="banner-carousel"
                        // frameOverflow="hidden"
                        cellSpacing={10}
                        slideWidth={0.8}
                        autoplay={false}
                        infinite
                        dotStyle={{ width: '0.2rem', height: '0.2rem', marginRight: '0.15rem' }}
                        dotActiveStyle={{ width: '0.2rem', height: '0.2rem', marginRight: '0.15rem', backgroundColor: 'red' }}
                        beforeChange={(from, to) => { }}
                        afterChange={index => { }}
                    >
                        {this.state.banners.map(val => (
                            <a
                                key={val}
                                href="http://www.alipay.com"
                                style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                            >
                                <img
                                    src={val.imageUrl}
                                    alt=""
                                    style={{ width: '100%', verticalAlign: 'top' }}
                                    onLoad={() => {
                                        // fire window resize event to change height
                                        window.dispatchEvent(new Event('resize'));
                                        this.setState({ imgHeight: 'auto' });
                                    }}
                                />
                            </a>
                        ))}
                    </Carousel>
                    <Flex className="menus">
                        <Flex.Item>
                            <div className="inner">
                                <span className="iconfont icon-rili"></span>
                            </div>
                            每日推荐
                        </Flex.Item>
                        <Flex.Item>
                            <div className="inner">
                                <span className="iconfont icon-gedan"></span>
                            </div>
                            歌单
                        </Flex.Item>
                        <Flex.Item>
                            <div className="inner">
                                <span className="iconfont icon-paihang"></span>
                            </div>
                            排行榜
                        </Flex.Item>
                        <Flex.Item>
                            <div className="inner">
                                <span className="iconfont icon-diantai"></span>
                            </div>
                            电台
                        </Flex.Item>
                        <Flex.Item>
                            <div className="inner">
                                <span className="iconfont icon-zhibo"></span>
                            </div>
                            直播
                        </Flex.Item>
                    </Flex>
                    <div className="recommend-wrap">
                        <div className="title">推荐歌单</div>
                        <Flex className="recommends">
                            {this.state.recommendList.map(item => (
                                <Flex.Item className="recommend-item">
                                    <div className="inner">
                                        <img className="cover" alt={item.name} src={item.picUrl}/>
                                    </div>
                                    <div className="name">{ item.name }</div>
                                </Flex.Item>
                            ))}
                        </Flex>
                    </div>
                </div>
            </div>
        )
    }
}