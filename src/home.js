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
            data: []
        }
    }
    init () {
        let params = { type: 2 }
        home.getBanner(params).then(res => {
            this.setState({
                data: res.banners
            })
        })
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

                    {/* <Carousel className="banner-carousel"
                        frameOverflow="visible"
                        cellSpacing={10}
                        slideWidth={0.8}
                        // autoplay
                        infinite
                        beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                        afterChange={index => this.setState({ slideIndex: index })}
                    >
                        {this.state.data.map((val, index) => (
                            <a
                                key={val}
                                href="http://www.alipay.com"
                                style={{
                                    display: 'block',
                                    position: 'relative',
                                    top: this.state.slideIndex === index ? -10 : 0,
                                    height: this.state.imgHeight,
                                    boxShadow: '2px 1px 1px rgba(0, 0, 0, 0.2)',
                                }}
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
                    </Carousel> */}
                    <Carousel className="banner-carousel"
                        // frameOverflow="hidden"
                        cellSpacing={10}
                        slideWidth={0.8}
                        autoplay={false}
                        infinite
                        dotStyle={{ width: '0.2rem', height: '0.2rem', marginRight: '0.15rem' }}
                        dotActiveStyle={{ width: '0.2rem', height: '0.2rem',backgroundColor:'red'}}
                        beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                        afterChange={index => console.log('slide to', index)}
                    >
                        {this.state.data.map(val => (
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
                </div>
            </div>
        )
    }
}