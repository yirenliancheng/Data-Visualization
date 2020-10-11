import React from 'react';
import './index.less';
import CenterFilter from './CenterFilter';
import { FullScreenContainer, BorderBox1, Decoration5, Decoration8 } from '@jiaminghi/data-view-react';
import { ClockCircleOutlined } from '@ant-design/icons';
import Pie from './echarts/pie';
import Water from './echarts/water';
import Radar from './echarts/radar';
import YieldLine from './echarts/yieldLine';
import pieJson from '../../data/pie.json';

class Datashow extends React.PureComponent{
  constructor(props){
    super(props);
    this.state={
      time: null,
      mode: 'total'
    }
    this.timer;
  }
  
  tick = () => {
    let time = new Date();
    let year = time.getFullYear();
    let month = (time.getMonth() + 1) >= 10 ? (time.getMonth() + 1) : `0${(time.getMonth() + 1)}`;
    let day =  time.getDate() >= 10 ? time.getDate() : `0${time.getDate()}`;
    let hours = time.getHours() >= 10 ? time.getHours() : `0${time.getHours()}`;
    let minutes = time.getMinutes() >= 10 ? time.getMinutes() : `0${time.getMinutes()}`;
    let seconds = time.getSeconds() >= 10 ? time.getSeconds() : `0${time.getSeconds()}`;
    let nowtime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
    this.setState({
      time:nowtime
    }) 
  }

  modeChange = (mode) => {
    this.setState({ mode: mode });
  } 

  componentDidMount(){
    this.timer = setInterval(this.tick,1000);
  }

  componentWillUnmount(){
    clearInterval(this.timer);
  }

  render(){
    return (
      <FullScreenContainer className='datashow'>
        <BorderBox1 className='border-1'>
        <div className='data-title'>
          <div className='title-style'>
            <Decoration5 className='title-decor'></Decoration5>
            <div className='title-flex'>
              <Decoration8 className='title-decoration'/>
                 <div className='title-font'>经编数字化车间远程运维界面</div>
              <Decoration8 reverse={true} className='title-decoration'/>
            </div>
              {
                this.state.time &&
                <div className='title-time'>
                  <ClockCircleOutlined style={{ 'fontSize': '22px', 'marginRight': '20px' }} />
                  <span>当前时间：{this.state.time}</span>
                </div>
              }
          </div>
        </div>
        <div className='data-content'>
          { pieJson && <Pie mode={this.state.mode} pieJson={pieJson}/>}
          <CenterFilter mode={this.state.mode} modeChange={this.modeChange}/>
          <Water mode={this.state.mode}/>
          <Radar/>
          <YieldLine/>
        </div>
       </BorderBox1>
      </FullScreenContainer>
    )
  }
}

Datashow.getInitialProps = async (ctx) => {
  // ssr渲染模式只在服务端通过Node获取数据，csr渲染模式只在客户端通过http请求获取数据，getInitialProps方法在整个页面生命周期只会执行一次
  return __isBrowser__ ? (await window.fetch('/api/getIndexData')).json() : ctx.service.api.index()
}

export default Datashow