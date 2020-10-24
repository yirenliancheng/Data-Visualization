import React from 'react';
import { BorderBox8 } from '@jiaminghi/data-view-react';
import { Button } from 'antd';
import machineJson from '../../data/machine.json';
import { DigitalFlop } from '@jiaminghi/data-view-react';

export default class CenterFilter extends React.PureComponent {
    constructor(props){
        super(props);
        this.facs = [
            { name: '总览', key: 'total' },
            { name: '3号车间', key: '3' },
            { name: '5号车间', key: '5' },
            { name: '7号车间', key: '7' },
            { name: '11号车间', key: '11' },
            { name: '15号车间', key: '15' }
        ]
    }

    render(){
        return(
            <BorderBox8 className='centerfilter' >
                <div className='cen-content'>
                    <div className='cen-button'>
                        {
                            this.facs && this.facs.length > 0 && 
                            this.facs.map(item => {
                            return (
                                <Button key={item.key}
                                 type={this.props.mode === item.key ? 'primary' : null}
                                 onClick={()=>{this.props.modeChange(item.key)}}
                                >
                                   {item.name}
                                </Button>
                            )
                            })
                        }
                    </div>
                    {
                        this.props.chooseMachineID ? 
                        <div className='machine-gb'>
                            <div className='gb-title'>
                                <span>剩余圈数</span>
                                <span>送经量</span>
                                <span>当前外周</span>
                                <span>最小外周</span>
                                <span>剩余时间/min</span>
                            </div>
                            {
                                this.props.gbinformation.map(item => {
                                  return <GBInfo data={item} key={item.name}/>
                                })
                            }
                        </div>  
                        : this.props.mode === 'total' ? <div className='cen-total'></div>
                        : <Fac mode={this.props.mode}  chooseMachine={this.props.chooseMachine}/>
                    }
                </div>
            </BorderBox8>
        );
    }
}

class Fac extends React.PureComponent {
    render(){
        return(
           <div className='cen-fac'>
                {
                    machineJson[this.props.mode] && machineJson[this.props.mode].length > 0 &&
                    machineJson[this.props.mode].map( item => {
                        return (
                            <div className='single-machine' key={item.name} onClick={()=>{this.props.chooseMachine(item.name)}}>
                                <div className='fac-machine'></div>
                                <div className='machine-info'>
                                    <div className='machine-name'>
                                        <span className='name-span'>{this.props.mode}#</span>
                                        <span>{item.name}号</span>
                                    </div>
                                    <div className='machine-status' style={{
                                        'backgroundColor' : machinestatus(item.status)
                                    }}></div>
                                </div>
                            </div>
                        );
                    })
                }
                
           </div>
        );
    }
}

const gbinformation = [
    {
        name:'GB1',
        resNum: 2232,
        sjNum: 1780,
        cirNow: 1264,
        minCir: 945,
        resTime: 19.56
    },
    {
        name:'GB2',
        resNum: 2232,
        sjNum: 1780,
        cirNow: 1264,
        minCir: 945,
        resTime: 19.56
    },
    {
        name:'GB3',
        resNum: 2232,
        sjNum: 1780,
        cirNow: 1264,
        minCir: 945,
        resTime: 19.56
    },
    {
        name:'GB4',
        resNum: 2232,
        sjNum: 1780,
        cirNow: 1264,
        minCir: 945,
        resTime: 19.56
    },
    {
        name:'GB5',
        resNum: 2232,
        sjNum: 1780,
        cirNow: 1264,
        minCir: 945,
        resTime: 19.56
    },
    {
        name:'GB6',
        resNum: 2232,
        sjNum: 1780,
        cirNow: 1264,
        minCir: 945,
        resTime: 19.56
    },
    {
        name:'GB7',
        resNum: 2232,
        sjNum: 1780,
        cirNow: 1264,
        minCir: 945,
        resTime: 19.56
    }
]

class GBInfo extends React.PureComponent {
    constructor(props){
        super(props);
        this.state = {
            type: true,
            resconfig: {
                number: [this.props.data.resNum],
                content: '{nt}',
                formatter: this.formatter,
                style: {
                    fill: 'yellow',
                    fontSize: 20
                }
            },
            sjconfig: {
                number: [this.props.data.sjNum],
                content: '{nt}',
                formatter: this.formatter,
                style: {
                    fontSize: 20
                }
            },
            circonfig: {
                number: [this.props.data.cirNow],
                content: '{nt}',
                formatter: this.formatter,
                style: {
                    fontSize: 20
                }
            },
            minCirconfig: {
                number: [this.props.data.minCir],
                content: '{nt}',
                formatter: this.formatter,
                style: {
                    fontSize: 20
                }
            },
            resTimeconfig: {
                number: [this.props.data.resTime],
                content: '{nt}',
                toFixed: 2,
                style: {
                    fill: 'yellow',
                    fontSize: 20
                }
            }
        }
    }

    formatter (number) {
        const numbers = number.toString().split('').reverse()
        const segs = []
      
        while (numbers.length) segs.push(numbers.splice(0, 3).join(''))
      
        return segs.join(',').split('').reverse().join('')
    }

    render(){
        return (
            <div className='gb-btn-list'>
                <Button key={this.props.data.name}
                  type={this.state.type && 'primary'}
                  onClick={()=>{this.setState({type: !this.state.type})}}
                  style={{margin: '0px 50px 0px 50px'}}
                >
                   {this.props.data.name}
                </Button>
                {
                this.state.type && 
                  <div className='gb-list'>
                    <DigitalFlop config={this.state.resconfig} style={{width: '100px', height: '30px', fontSize: '10px'}}/>
                    <DigitalFlop config={this.state.sjconfig} style={{width: '100px', height: '30px', fontSize: '10px'}}/>
                    <DigitalFlop config={this.state.circonfig} style={{width: '100px', height: '30px', fontSize: '10px'}}/>
                    <DigitalFlop config={this.state.minCirconfig} style={{width: '100px', height: '30px', fontSize: '10px'}}/>
                    <DigitalFlop config={this.state.resTimeconfig} style={{width: '100px', height: '30px', fontSize: '10px'}}/>
                  </div>
                }
           </div>
        )
    }
}

function machinestatus(status) {
    switch (status) {
        case "断开" :
           return 'black';
        case "停机" :
            return 'rgb(253,3,30)';
        case "计划" :
            return '#f0ff00';
        case "超前" :
            return "#06f41a";
        case "滞后" :
            return "#03cdf8";
        default :
            return '#06f41a';
    }
}