import React from "react"
import { NavBar, Icon, Flex, Carousel } from "antd-mobile"
import BScroll from "better-scroll"
import "./home.module.scss"
import { home } from "../api"

let scroller
export default class Home extends React.Component {
  state = {
    banners: [],
    recommendList: []
  }
  init() {
    let params = { type: 2 }
    home.getBanner(params).then(res => {
      if (res.code !== 200) return
      this.setState({
        banners: res.banners
      })
    })
    home.getRecommendResource().then(res => {
      if (res.code !== 200) return
      this.setState({
        recommendList: res.recommend
      })
      let wrapper = this.refs["content"]
      scroller = new BScroll(wrapper, { click: true })
    })
  }
  formatNum(num) {
    return num < 10000 ? num : (num / 10000).toFixed(1) + "万"
  }
  onPlaylistClick(id) {
    this.props.history.push(`/playlist/${id}`)
  }
  componentDidMount() {
    this.init()
  }
  render() {
    return (
      <div className="common-page">
        <NavBar
          styleName="am-navbar"
          mode="light"
          icon={<Icon type="ellipsis" />}
          onLeftClick={() => console.log("onLeftClick")}
          rightContent={[<Icon key="0" type="search" />]}
          // rightContent={[
          //     <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
          //     <Icon key="1" type="ellipsis" />,
          // ]}
        >
          <Flex>
            <Flex.Item>我的</Flex.Item>
            <Flex.Item styleName="active">发现</Flex.Item>
            <Flex.Item>朋友</Flex.Item>
            <Flex.Item>视频</Flex.Item>
          </Flex>
        </NavBar>
        <div className="content" styleName="content" ref="content">
          <div>
            <Carousel
              styleName="banner-carousel"
              // frameOverflow="hidden"
              cellSpacing={10}
              slideWidth={0.8}
              autoplay={false}
              infinite
              dotStyle={{
                width: "0.2rem",
                height: "0.2rem",
                marginRight: "0.15rem"
              }}
              dotActiveStyle={{
                width: "0.2rem",
                height: "0.2rem",
                marginRight: "0.15rem",
                backgroundColor: "red"
              }}
              beforeChange={(from, to) => {}}
              afterChange={index => {}}
            >
              {this.state.banners.map(val => (
                <a
                  key={val}
                  href="http://www.alipay.com"
                  style={{
                    display: "inline-block",
                    width: "100%",
                    height: this.state.imgHeight
                  }}
                >
                  <img
                    src={val.imageUrl || val.pic}
                    alt=""
                    style={{
                      width: "100%",
                      verticalAlign: "top"
                    }}
                    onLoad={() => {
                      // fire window resize event to change height
                      window.dispatchEvent(new Event("resize"))
                      this.setState({
                        imgHeight: "auto"
                      })
                    }}
                  />
                </a>
              ))}
            </Carousel>
            <Flex styleName="menus">
              <Flex.Item>
                <div styleName="inner">
                  <span className="iconfont icon-rili" />
                </div>
                每日推荐
              </Flex.Item>
              <Flex.Item>
                <div styleName="inner">
                  <span className="iconfont icon-gedan" />
                </div>
                歌单
              </Flex.Item>
              <Flex.Item>
                <div styleName="inner">
                  <span className="iconfont icon-paihang" />
                </div>
                排行榜
              </Flex.Item>
              <Flex.Item>
                <div styleName="inner">
                  <span className="iconfont icon-diantai" />
                </div>
                电台
              </Flex.Item>
              <Flex.Item>
                <div styleName="inner">
                  <span className="iconfont icon-zhibo" />
                </div>
                直播
              </Flex.Item>
            </Flex>
            <div styleName="recommend-wrap">
              <div styleName="title">推荐歌单</div>
              <Flex styleName="recommends">
                {this.state.recommendList.slice(0).map(item => (
                  <Flex.Item
                    styleName="recommend-item"
                    onClick={() => this.onPlaylistClick(item.id)}
                    key={item.name}
                  >
                    <div styleName="inner">
                      <span styleName="play-num">
                        <span className="iconfont icon-play" />
                        {this.formatNum(item.playcount)}
                      </span>
                      <img
                        styleName="cover"
                        alt={item.name}
                        src={item.picUrl}
                      />
                    </div>
                    <p
                      styleName="name"
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical"
                      }}
                    >
                      {item.name}
                    </p>
                  </Flex.Item>
                ))}
              </Flex>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
