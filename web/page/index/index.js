import React from 'react';
import './index.less';
import Movie from '../../components/movie';
import { Carousel } from 'antd';
import { OpcUA, DataVisual,Algorithm } from '../../components/homeShow';

class Page extends React.Component{
  render() {
    return (
      <>
        <Carousel
          dotPosition='right'
          className='carousel'
          effect="fade"
        >
          <Movie />
          <OpcUA />
          <DataVisual />
          <Algorithm />
        </Carousel>
      </>
    )
  }
}

Page.getInitialProps = async (ctx) => {
  // ssr渲染模式只在服务端通过Node获取数据，csr渲染模式只在客户端通过http请求获取数据，getInitialProps方法在整个页面生命周期只会执行一次
  return __isBrowser__ ? (await window.fetch('/api/getIndexData')).json() : ctx.service.api.index()
}

export default Page
