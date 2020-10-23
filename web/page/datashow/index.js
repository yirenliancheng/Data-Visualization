import React from 'react';
import './index.less';
import CenterFilter from './CenterFilter';
import { FullScreenContainer, BorderBox1, Decoration5, Decoration8 } from '@jiaminghi/data-view-react';
import { ClockCircleOutlined } from '@ant-design/icons';
import Pie from './echarts/pie';
import MachineInfo from './MachineInfo';
import Radar from './echarts/radar';
import YieldLine from './echarts/yieldLine';
import pieJson from '../../data/pie.json';
import performanceData from '../../data/performance';
import moment from 'moment';

class Datashow extends React.PureComponent{
  constructor(props){
    super(props);
    this.state={
      time: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      mode: 'total',
      data: performanceData[3][0]
    }
    this.timer;
    this.timeout;
  }
  
  tick = () => {
    this.setState({
      time: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
    }) 
  }

  modeChange = (mode) => {
    this.setState({ mode: mode },this.dealperformanceData);
  } 

  dealperformanceData = () => {
    var data = [];
    if (this.state.mode === 'total') {
       for(let item in performanceData) { 
         data = data.concat(performanceData[item]);
       }
     } else {
       data = performanceData[this.state.mode];
     };
    var k = data.length;
    this.setState({ performanceData: data, k: k, data: data[0] });
  }


  componentDidMount(){
    this.dealperformanceData();
    this.timer = setInterval(this.tick,1000);
    var i = 1;
    this.timeout = setInterval(() => {
      i = i < this.state.k ? i : 0;
      this.setState({ data: this.state.performanceData[i]})
      i++;
    },3000)
  }



  componentWillUnmount(){
    clearInterval(this.timer);
    clearInterval(this.timeout);
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
          <MachineInfo
            machineInformation={this.state.data.machineInformation}
            stopInformation={this.state.data.stopInformation}
          />
          <CenterFilter mode={this.state.mode} modeChange={this.modeChange}/>
          { pieJson && <Pie mode={this.state.mode} pieJson={pieJson}/>}
          {this.state.data && <Radar data={this.state.data}  mode={this.state.mode} />}
          <YieldLine mode={this.state.mode}/>
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