import React from 'react';
import echarts from 'echarts';
import Water from './water';
import './index.less';
import { BorderBox8 } from '@jiaminghi/data-view-react';

export default class Radar extends React.Component {
    constructor(props){
        super(props);
        this.state={
            data: this.props.data[0],
            k : this.props.data.length
        };
        this.timer;
    }

    initChart(data) {
        let myChart = echarts.init(document.getElementById('myRadar'));
        var i = -1;
        let option = {
            title: {
                text: `${data.name}号机台表现:`,
                textStyle: {
                    align: 'center',
                    color: '#00ca95',
                    fontSize: 20,
                },
                top: '5%',
                left: '20%'
            },
            textStyle: {
                fontSize: 16,
                fontWeight: 500,
            },
            radar: {
                radius: '50%',
                center: ['65%','50%'],
                name: {
                    show: true,
                    rich: {
                        a: {
                           color: 'rgba(255,255,0,0.8)',
                           align: 'center',
                           lineHeight: 20,
                        },
                        b: {
                            color: '#fff',
                            align: 'center',
                            backgroundColor: 'rgba(0,102,255,0.8)',
                            padding: 2,
                            borderRadius: 4
                        }
                    },
                    formatter: (a) => {
                        i++;
                        return `{a|${a}}\n{b|${data.value[i]}%}`
                    },
                    textStyle: {
                        color: 'rgb(22, 138, 214)',
                        fontWeight: 600,
                        borderRadius: 3,
                        padding: [3, 5]
                    }
                },
                indicator: [
                    { name: '开机效率', max: 100 },
                    { name: '当前进度', max: 100 },
                    { name: '故障率', max: 100 },
                    { name: '合格率', max: 100 },
                    { name: 'OEE', max: 100 },
                    { name: '产能满载率', max: 100 }
                ],
                splitArea: {
                    show: true,
                    areaStyle: {
                        color: ['rgba(125, 119, 241,1)', 'rgba(125, 119, 241,0.8)', 'rgba(125, 119, 241,0.6)',
                                'rgba(125, 119, 241,0.4)', 'rgba(125, 119, 241,0.2)', 'rgba(125, 119, 241,0.1)'],
                    }
                }
            },
            series: [{
                name: '机台表现',
                type: 'radar',
                data: [
                    {
                        value: data.value,
                        name: '机台表现',
                        itemStyle: {
                            normal: {
                                color: 'rgb(69, 233, 19)',
                                borderWidth: 4,
                                lineStyle: {
                                    color: 'rgb(69, 233, 19)',
                                    width: 2
                                },
                            },
                        },
                        areaStyle: {
                            color: 'rgba(69, 233, 19, .4)'
                        },
                        symbolSize: 4
                    }
                ]
            }]
        };
        let myLineChart = echarts.init(document.getElementById('myLines'));
        let Lineoption = {
            title: {
                text: `${data.name}号机台主轴转速:`,
                textStyle: {
                    align: 'center',
                    color: 'rgb(255,0,255)',
                    fontSize: 20,
                },
                top: '0%',
                left: '5%',
            },
            legend:{
                show: true,
                right:'5%',
                data: [
                    {name:'设定转速',icon:'roundRect',textStyle:{color:'white'}},
                    {name:'额定转速',icon:'roundRect',textStyle:{color:'white'}},
                    {name:'实际转速',icon:'roundRect',textStyle:{color:'white'}}
                ]
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    lineStyle: {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0,
                                color: 'rgba(0, 255, 233,0)'
                            }, {
                                offset: 0.5,
                                color: 'rgba(255, 255, 255,1)',
                            }, {
                                offset: 1,
                                color: 'rgba(0, 255, 233,0)'
                            }],
                            global: false
                        }
                    },
                },
            },
            grid: {
                top: '15%',
                left: '10%',
                right: '5%',
                bottom: '15%',
            },
            xAxis: [{
                type: 'category',
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: 'white'
                    }
                },
                splitArea: {
                    color: '#f00',
                    lineStyle: {
                        color: '#f00'
                    },
                },
                axisLabel: {
                    color: '#fff'
                },
                splitLine: {
                    show: false
                },
                boundaryGap: false,
                data: data.speed.xAxis,
            }],
            yAxis: [{
                type: 'value',
                min: 0,
                splitNumber: 4,
                splitLine: {
                    show: false,
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: 'white'
                    }
                },
                axisLabel: {
                    show: true,
                    margin: 10,
                    textStyle: {
                        color: '#d1e6eb',
                    },
                },
                axisTick: {
                    show: false,
                },
            }],
            series: [{
                name: '设定转速',
                type: 'line',
                smooth: true, 
                showAllSymbol: true,
                symbol: 'circle',
                symbolSize: 10,
                lineStyle: {
                    normal: {
                        color: "#00b3f4",
                        shadowColor: 'rgba(0, 0, 0, .3)',
                        shadowBlur: 0,
                        shadowOffsetY: 5,
                        shadowOffsetX: 5,
                    },
                },
                label: {
                    show: false,
                    position: 'top',
                    textStyle: {
                        color: '#00b3f4',
                    }
                },
                itemStyle: {
                    color: "#00b3f4",
                    borderColor: "#fff",
                    borderWidth: 2,
                    shadowColor: 'rgba(0, 0, 0, .3)',
                    shadowBlur: 0,
                    shadowOffsetY: 2,
                    shadowOffsetX: 2,
                },
                tooltip: {
                    show: false
                },
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(0,179,244,0.3)'
                        },
                        {
                            offset: 1,
                            color: 'rgba(0,179,244,0)'
                        }
                        ], false),
                        shadowColor: 'rgba(0,179,244, 0.9)',
                        shadowBlur: 20
                    }
                },
                data: data.speed.setSpeed
            },
            {
                name: '额定转速',
                type: 'line',
                smooth: true,
                showAllSymbol: true,
                symbol: 'circle',
                symbolSize: 10,
                lineStyle: {
                    normal: {
                        color: "#00ca95",
                        shadowColor: 'rgba(0, 0, 0, .3)',
                        shadowBlur: 0,
                        shadowOffsetY: 5,
                        shadowOffsetX: 5,
                    },
                },
                label: {
                    show: false,
                    position: 'top',
                    textStyle: {
                        color: '#00ca95',
                    }
                },

                itemStyle: {
                    color: "#00ca95",
                    borderColor: "#fff",
                    borderWidth: 2,
                    shadowColor: 'rgba(0, 0, 0, .3)',
                    shadowBlur: 0,
                    shadowOffsetY: 2,
                    shadowOffsetX: 2,
                },
                tooltip: {
                    show: false
                },
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(0,202,149,0.3)'
                        },
                        {
                            offset: 1,
                            color: 'rgba(0,202,149,0)'
                        }
                        ], false),
                        shadowColor: 'rgba(0,202,149, 0.9)',
                        shadowBlur: 20
                    }
                },
                data: data.speed.rateSpeed
            },
            {
                name: '实际转速',
                type: 'line',
                smooth: true,
                showAllSymbol: true,
                symbol: 'circle',
                symbolSize: 10,
                lineStyle: {
                    normal: {
                        color: "#ff00ff",
                        shadowColor: 'rgba(0, 0, 0, .3)',
                        shadowBlur: 0,
                        shadowOffsetY: 5,
                        shadowOffsetX: 5,
                    },
                },
                label: {
                    show: false,
                    position: 'top',
                    textStyle: {
                        color: '#ff00ff',
                    }
                },

                itemStyle: {
                    color: "#ff00ff",
                    borderColor: "#fff",
                    borderWidth: 2,
                    shadowColor: 'rgba(0, 0, 0, .3)',
                    shadowBlur: 0,
                    shadowOffsetY: 2,
                    shadowOffsetX: 2,
                },
                tooltip: {
                    show: false
                },
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(255,0,255,0.3)'
                        },
                        {
                            offset: 1,
                            color: 'rgba(255,0,255,0)'
                        }
                        ], false),
                        shadowColor: 'rgba(255,0,255, 0.9)',
                        shadowBlur: 20
                    }
                },
                data: data.speed.actualSpeed,
            }
            ]
        }
        myChart.setOption(option,true);
        window.addEventListener("resize", function () {
            myChart.resize();
        });
        myLineChart.setOption(Lineoption,true);
        window.addEventListener("resize", function () {
            myLineChart.resize();
        });
    }

    componentDidMount() {
        this.initChart(this.state.data);
        var i = 1;
        this.timer = setInterval(() => {
            i = i < this.state.k ? i : 0;
            this.setState({
                data: this.props.data[i],
            },()=>{
                this.initChart(this.state.data) 
             })
            i++;
        },3000)
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    shouldComponentUpdate(nextProps,nextState){
        if((JSON.stringify(this.state.data)) !== (JSON.stringify(nextState.data)) ){
            this.initChart(nextState.data);
            return true;
        }
        if((JSON.stringify(this.props.data)) !== (JSON.stringify(nextProps.data))){
            this.setState({k: nextProps.data.length})
            this.initChart(nextProps.data[0]);
            return true;
        }
        return false;
    }

    render() {
        return (
            <div className='car-radar'>
                <BorderBox8 reverse={true}>
                    { 
                       this.state.data && 
                        <>
                          <div className='water-radar'>
                              <Water mode={this.props.mode}/>
                              <div id='myRadar' className='radar'></div>
                          </div>
                          <div id='myLines' className='lines'></div>
                        </>
                    }
                </BorderBox8>
            </div>
        );
    }
}
