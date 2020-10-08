import React from 'react';
import { Image, Tabs, List, Carousel, Timeline } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import './index.less';
import Map from './map';
import Footer from '../footer';
const { TabPane } = Tabs;

const tabPaneData = [
    {
        tab: '机台信息',
        content: [
            {
                name: 'id',
                desc: '机台序号'
            },
            {
                name: 'machineId',
                desc: '机台编号'
            },
            {
                name: 'IP',
                desc: '机台IP'
            },
            {
                name: 'spinnername',
                desc: '操作员工'
            },
            {
                name: 'machinemodel',
                desc: '机台型号'
            },
            {
                name: 'productmodel',
                desc: '胚布型号'
            },
            {
                name: 'deliverdate',
                desc: '生产交期'
            }
        ]
    },
    {
        tab: '实时生产参数',
        content: [
            {
                name: 'machineid',
                desc: '机台编号'
            },
            {
                name: 'GB1~GB8',
                desc: '剩余圈数'
            },
            {
                name: 'GB1SJ~GB8SJ',
                desc: '送经量'
            },
            {
                name: 'GB1CPm~GB8CPm',
                desc: '当前外周长'
            },
            {
                name: 'GB1MPm~GB8MPm',
                desc: '最小外周长'
            },
            {
                name: 'GB1Time~GB8Time',
                desc: '剩余时间'
            }
        ]
    },
    {
        tab: '实时机器状态',
        content: [
            {
                name: 'machineid',
                desc: '机台编号'
            },
            {
                name: 'curschedule',
                desc: '当前进度'
            },
            {
                name: 'curstate',
                desc: '运行状态'
            },
            {
                name: 'pulldensity',
                desc: '牵拉密度'
            },
            {
                name: 'rolldensity',
                desc: '卷布密度'
            },
            {
                name: 'curefficiency',
                desc: '当前效率'
            },
            {
                name: 'dayefficiency',
                desc: '开机效率'
            },
            {
                name: 'historyefficiency',
                desc: '历史效率'
            }
        ]
    },
    {
        tab: '机台转速',
        content: [
            {
                name: 'machineid',
                desc: '机台编号'
            },
            {
                name: 'curspeed',
                desc: '实际转速'
            },
            {
                name: 'setspeed',
                desc: '设定转速'
            },
            {
                name: 'ratespeed',
                desc: '运行速率'
            }
        ]
    },
    {
        tab: '机台停机事件',
        content: [
            {
                name: 'machineid',
                desc: '机台编号'
            },
            {
                name: 'eventtype',
                desc: '停机事件类型'
            },
            {
                name: 'stopeventtime',
                desc: '停机时间'
            },
            {
                name: 'curstopcount',
                desc: '当班停机次数'
            },
            {
                name: 'daystopcount',
                desc: '当天停机次数'
            },
            {
                name: 'historystopcount',
                desc: '历史停机次数'
            },
            {
                name: 'curruntime',
                desc: '当班运行时长'
            },
            {
                name: 'curstoptime',
                desc: '当班停机时长'
            },
            {
                name: 'dayruntime',
                desc: '当天开机时长'
            },
            {
                name: 'daystoptime',
                desc: '当天停机时长'
            },
            {
                name: 'historyruntime',
                desc: '历史开机时长'
            },
            {
                name: 'historystoptime',
                desc: '历史停机时长'
            }
        ]
    },
    {
        tab: '机台产量',
        content: [
            {
                name: 'machineid',
                desc: '机台编号'
            },
            {
                name: 'yeild1',
                desc: '实际产量'
            },
            {
                name: 'yeild2',
                desc: '计划产量'
            },
            {
                name: 'ttdate',
                desc: '生产时间'
            }
        ]
    },
    {
        tab: '产品质量',
        content: [
            {
                name: 'machineid',
                desc: '机台编号'
            },
            {
                name: 'flawtype',
                desc: '缺陷类型'
            },
            {
                name: 'flawvalue',
                desc: '缺陷占比'
            },
            {
                name: 'totalvalue',
                desc: '总缺陷占比'
            },
            {
                name: 'allength',
                desc: '总布匹长度'
            },
            {
                name: 'flawlength',
                desc: '次品布匹长度'
            },
            {
                name: 'passrate',
                desc: '合格率'
            }
        ]
    },
    {
        tab: '车间生产信息',
        content: [
            {
                name: 'id',
                desc: '车间编号'
            },
            {
                name: 'curallschedule',
                desc: '当前进度'
            },
            {
                name: 'planschedule',
                desc: '计划进度'
            },
            {
                name: 'curallstate',
                desc: '进度状态'
            },
            {
                name: 'state1count',
                desc: '“计划”机台数'
            },
            {
                name: 'state2count',
                desc: '“停机”机台数'
            },
            {
                name: 'state3count',
                desc: '“滞后”机台数'
            },
            {
                name: 'state4count',
                desc: '“超前”机台数'
            },
            {
                name: 'state5count',
                desc: '“断开”机台数'
            }
        ]
    }
];

const carPicture = [
    {
       name:'产能预测算法',
       src:'psorbf.jpg'
    },
    {
        name:'产能预测结果对比',
        src:'psorbfresult.jpg'
    },
    {
        name:'IG-TS调度算法',
        src:'igts.png'
    },
    {
        name:'IG-TS调度结果',
        src:'igtsresult.jpg'
    }
];

const timeline = [
    {
        name:'① 数据预处理',
        color:'yellow'
    },
    {
        name:'数据采集：',
        desc:'采集经编信息模型中的生产数据。'
    },
    {
        name:'数据清洗：',
        desc:'采集数据中存在一些大误差数据，需要进行数据清理，这是提高试验结果预测精度的必要措施。'
    },
    {
        name:'② 经编机产能预测',
        color:'green'
    },
    {
        name:'PSO-BP算法',
        desc:'PSO算法优化双隐层BP神经网络的权值和阈值以获得高性能BP神经网络模型。'
    },
    {
        name:'GA-RBF算法',
        desc:'GA通过选择、交叉、变异筛选个体，优化RBF神经网络的扩散速度参数和各神经元的最大隐含节点参数。'
    },
    {
        name:'PSO-RBF算法',
        desc:'PSO算法优化RBF神经网络的中心向量值c、基宽向量σ和连接权值w参数，以获得拟合能力强、收敛速度快和无局部极小值缺陷的预测算法。'
    },
    {
        name:'③ 经编机调度排程',
        color:'red'
    },
    {
        name:'IG迭代贪婪算法',
        desc:'IG算法基于贪婪思想持续在当前解的邻域中进行搜索，算法通用且易实现，但是容易陷入极小值而无法保证全局优化。'
    },
    {
        name:'TS禁忌搜索算法',
        desc:'禁忌搜索（TS）算法是一种局部搜索能力很强的全局迭代寻优算法，但是TS算法主要是基于邻域搜索的，对初始解的依赖性较强，有效合理的初始解有助于搜索快速达到最优解。'
    }
]

export class OpcUA extends React.PureComponent {
    render() {
        return (
            <div className='opcua'>
                <div className='opc-content'>
                    <div className='content-text'>
                        <div className='text-title'>经编数字化车间简介</div>
                        <div className='text-info'>
                            经编数字化车间信息系统依托物联网、云计算和大数据等新一代信息技术，
                            致力于为纺织行业打造集生产管理、故障诊断和远程运维等功能一体化
                            的数字化智能车间。数字化车间生产管理看板系统能够实时全面监控生
                            产数据，故障及时诊断，节省生产成本，提高生产效率，有效提高生产收益。
                        </div>
                        <div className='text-title'>经编信息模型</div>
                        <div className='text-tab'>
                            <Tabs tabPosition='left'>
                                {
                                    tabPaneData && tabPaneData.map((item) => {
                                        return (
                                            <TabPane tab={item.tab} key={item.tab}>
                                                {item.content &&
                                                    <List
                                                        size='small'
                                                        header={<div><SendOutlined style={{ 'marginRight': '10px' }} />{item.tab}</div>}
                                                        dataSource={item.content}
                                                        renderItem={itemChild => {
                                                            return (
                                                                <List.Item key={itemChild.name}>
                                                                    <span>{itemChild.name}</span>
                                                                    <span>{itemChild.desc}</span>
                                                                </List.Item>
                                                            )
                                                        }}
                                                    />
                                                }
                                            </TabPane>
                                        );
                                    })
                                }
                            </Tabs>
                        </div>
                    </div>
                    <div className='content-img'>
                        <Image
                            width={'50%'}
                            height={'50%'}
                            src='./static/img/router.jpg'
                            className='img-margin'
                        />
                        <Image
                            width={'50%'}
                            height={'50%'}
                            src='./static/img/kuanjia.jpg'
                            className='img-margin'
                        />
                        <Image
                            width={'50%'}
                            height={'50%'}
                            src='./static/img/opcua.jpg'
                            className='img-margin'
                        />
                        <Image
                            width={'50%'}
                            height={'50%'}
                            src='./static/img/warpknittingmachine.jpg'
                            className='img-margin'
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export class DataVisual extends React.PureComponent {
    render() {
        return (
            <div className='data-visual'>
                <div className='visual-content'>
                    <div className='content'>
                        <div className='content-title'>经编数字化车间数据可视化</div>
                        <div className='content-info'>
                            <div className='info-div'>
                               传统生产车间不具备数据信息的互联互通功能，车间内的每一台机器都是一个“信息孤岛”，生产现场的工况信息、设备状态和生产参数等都不能及时有效的上传给监控系统和生产管理系统。传统车间设备意外停机，造成大量损失，为了预防该类情况的发生，往往需要投入大量人力物力巡检，这种方式十分浪费人力成本，而且巡检的可靠性也不能被保证。
                            </div>
                            <div>
                               经编数字化车间生产管理系统大屏使得生产管理便捷智能化、远程运维实时全面化和故障诊断高效精准化，为管理人员管理生产车间提供了极大的便利性。
                            </div>
                        </div>
                    </div>
                </div>
                <Map />
            </div>
        );
    }
}

export class Algorithm extends React.PureComponent {
    render() {
        return (
            <div className='algorithm'>
                <div className='algorithm-content'>
                    <div className='content-text'>
                        <div className='content-title'>经编数字化车间调度算法</div>
                        <div className='content-time'>
                            <Timeline>
                                {
                                    timeline && timeline.length > 0 && timeline.map(item => {
                                        return (
                                            <Timeline.Item color={item.color ? item.color : 'blue'} key={item.name}>
                                                { item.name && <div className={item.color ? 'time-name1' : 'time-name2'}>{item.name}</div>}
                                                { item.desc && <div className='time-desc'>{item.desc}</div>}
                                            </Timeline.Item>
                                        );
                                    })
                                }
                            </Timeline>
                        </div>
                    </div>
                    <div className='con-car'>
                        <Carousel dotPosition='top' autoplay>
                            {
                                carPicture && carPicture.length > 0 && carPicture.map((item) => {
                                    return (
                                        <div className='img-div' key={item.name}>
                                            <Image
                                               width={'80%'}
                                               height={'70%'}
                                               src={`./static/img/${item.src}`}
                                            />
                                            <div className='div-name'>{item.name}</div>
                                        </div>
                                    )
                                })
                            }
                        </Carousel>
                        <div className='car-ai'>
                            <Image
                              src='./static/img/smallpic.gif'
                              width={'80%'}
                              height={'90%'}
                              className='car-pic'
                            />
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}