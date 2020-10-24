import React from 'react';
import './index.less';
import CenterFilter from './CenterFilter';
import { FullScreenContainer, BorderBox1, Decoration5, Decoration8 } from '@jiaminghi/data-view-react';
import { ClockCircleOutlined } from '@ant-design/icons';
import Pie from './echarts/pie';
import MachineInfo from './MachineInfo';
import Radar from './echarts/radar';
import YieldLine from './echarts/yieldLine';
import SingleMachine from './echarts/singleMachine';
import performanceData from '../../data/performance';
import moment from 'moment';

class Datashow extends React.PureComponent{
  constructor(props){
    super(props);
    this.state={
      time: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      mode: 'total',
      data: performanceData[3][0],
      chooseMachineID: null,
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
    this.setState({ mode: mode, chooseMachineID: null },this.dealperformanceData);
  } 

  dealperformanceData = () => {
    var data = [];
    for(let item in performanceData) { 
        data = data.concat(performanceData[item]);
      }
    if(this.state.chooseMachineID){
      data = [data.find(item => item.name === this.state.chooseMachineID)];
    }else if (this.state.mode !== 'total') {
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
    },5000)
  }

  componentWillUnmount(){
    clearInterval(this.timer);
    clearInterval(this.timeout);
  }

  chooseMachine = (id) => {
    this.setState({
      chooseMachineID : id 
    },this.dealperformanceData)
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
          <CenterFilter
            mode={this.state.mode}
            modeChange={this.modeChange}
            chooseMachineID={this.state.chooseMachineID}
            chooseMachine={this.chooseMachine}
            gbinformation={this.state.data.gbinformation}
          />
          <Pie machineId={this.state.data.name} pieJson={this.state.data.productData}/>
          {this.state.data && <Radar data={this.state.data}  mode={this.state.mode} />}
          { this.state.chooseMachineID ?
           <SingleMachine chooseMachineID={this.state.chooseMachineID} yieldInfo={this.state.data.yieldInfo} /> :
           <YieldLine mode={this.state.mode}/>
          }
        </div>
       </BorderBox1>
      </FullScreenContainer>
    )
  }
}

Datashow.getInitialProps = async (ctx) => {
  return __isBrowser__ ? (await window.fetch('/api/getIndexData')).json() : ctx.service.api.index()
}

export default Datashow