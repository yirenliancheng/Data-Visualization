import React from 'react';
import { BorderBox8 } from '@jiaminghi/data-view-react';
import { Button } from 'antd';
import machineJson from '../../data/machine.json';

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
                    this.props.mode === 'total' ? 
                        <div className='cen-total'></div>
                    : <Fac mode={this.props.mode}/>
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
                            <div className='single-machine' key={item.name}>
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