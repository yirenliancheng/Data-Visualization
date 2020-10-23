import React from 'react';
import { BorderBox13, ScrollBoard, Decoration2 } from '@jiaminghi/data-view-react';

export default class MachineInfo extends React.Component {
    constructor(props){
        super(props);
        this.state={
            config: {
                header: [ '停机类型', '停机时间', '停机时长', '告警类型', '告警时间'],
                data: this.props.stopInformation,
                index: true,
                headerBGC: 'rgba(224, 42, 42, 0.8)',
                oddRowBGC: 'rgba(22, 231, 56, 0.2)',
                evenRowBGC: 'rgba(57, 92, 254, 0.2)',
                columnWidth: [50],
                align: ['center']
            }
        };
    }

    render(){
        return(
            <BorderBox13>
                <div className='mac-info'>
                   {
                       this.props.machineInformation.map((item,index)=>{
                           return (
                               <div key={index} className='info'>
                                   <span className='info-name'>{item.name}：</span>
                                   <span className='info-value' style={{'color': (index === 6) && 'gold'}}>{item.value}</span>
                               </div>
                           )
                       })
                   }
                </div>
                <div className='stop-title'>{this.props.machineInformation[0].value}号机台停机/告警信息：</div>
                <Decoration2  className='decor2' style={{width: '250px', height: '5px'}} />
                <ScrollBoard config={this.state.config} className='mac-scrollBoard'/>
            </BorderBox13>
        );
    }
}

