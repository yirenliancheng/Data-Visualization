import React from 'react';
import { BorderBox13, ScrollBoard, Decoration2 } from '@jiaminghi/data-view-react';

const machineInformation = [
    {
        name:'机台编号',
        value: 179
    },
    {
        name:'牵拉密度',
        value: 14.5
    },
    {
        name:'卷布密度',
        value: 15.3
    },
    {
        name:'胚布型号',
        value: 'BJS0635P'
    },
    {
        name:'操作工人',
        value: '费有银'
    },
    {
        name:'生产交期',
        value: '2020-11-23'
    },
    {
        name:'停机次数',
        value: 5
    },
    {
        name:'机台型号',
        value: '屹立普通7梳SP03F'
    }
]

const config = {
    header: [ '停机类型', '停机时间', '停机时长', '告警类型', '告警时间'],
    data: [
      ['断纱', '16:23:18', '18min', '盘头纱线耗尽', '16:23:18'],
      ['断纱', '16:23:18', '18min', '盘头纱线耗尽', '16:23:18'],
      ['断纱', '16:23:18', '18min', '盘头纱线耗尽', '16:23:18'],
      ['断纱', '16:23:18', '18min', '盘头纱线耗尽', '16:23:18'],
      ['断纱', '16:23:18', '18min', '盘头纱线耗尽', '16:23:18'],
      ['断纱', '16:23:18', '18min', '盘头纱线耗尽', '16:23:18'],
      ['断纱', '16:23:18', '18min', '盘头纱线耗尽', '16:23:18'],
      ['断纱', '16:23:18', '18min', '盘头纱线耗尽', '16:23:18'],
      ['断纱', '16:23:18', '18min', '盘头纱线耗尽', '16:23:18'],
      ['断纱', '16:23:18', '18min', '盘头纱线耗尽', '16:23:18'],
    ],
    index: true,
    headerBGC: 'rgba(224, 42, 42, 0.8)',
    oddRowBGC: 'rgba(22, 231, 56, 0.2)',
    evenRowBGC: 'rgba(57, 92, 254, 0.2)',
    columnWidth: [50],
    align: ['center']
}

export default class MachineInfo extends React.Component {
    constructor(props){
        super(props);
        this.state={};
        this.timer;
    }

    render(){
        return(
            <BorderBox13>
                <div className='mac-info'>
                   {
                       machineInformation.map((item,index)=>{
                           return (
                               <div key={index} className='info'>
                                   <span className='info-name'>{item.name}：</span>
                                   <span className='info-value' style={{'color': (index === 6) && 'gold'}}>{item.value}</span>
                               </div>
                           )
                       })
                   }
                </div>
                <div className='stop-title'>{machineInformation[0].value}号机台停机/告警信息：</div>
                <Decoration2  className='decor2' style={{width: '250px', height: '5px'}} />
                <ScrollBoard config={config} className='mac-scrollBoard'/>
            </BorderBox13>
        );
    }
}

