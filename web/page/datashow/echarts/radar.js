import React from 'react';
import echarts from 'echarts';
import './index.less';
import { BorderBox8 } from '@jiaminghi/data-view-react';

const data = {
    name: 179,
    value: [90,68,59.2,48.69,80.95,68.5],
    speed: {
        xAxis: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
        setSpeed: [400,400,400,380,390,400,400,400,400,400,400,400,400,400,400,400,400,400,400,400,400,400,400,400],
        rateSpeed: [380,390,380,370,380,390,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        actualSpeed: [334,360,348,356,343,385,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    }
}

export default class Radar extends React.PureComponent {

    initChart(data) {
        let myChart = echarts.init(document.getElementById('myRadar'));
        console.log(data)
        let option = {
            title: {
                text: `${data.name}号机台表现:`,
                textStyle: {
                    align: 'center',
                    color: '#00ca95',
                    fontSize: 20,
                },
                top: '5%',
                left: '5%',
            },
            textStyle: {
                fontSize: 16,
                fontWeight: 500,
            },
            radar: {
                name: {
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
                        color: ['rgba(48,229,202,0.6)', 'rgba(27,196,244,0.6)', 'rgba(127,70,179,0.6)',
                                'rgba(16,215,133,0.6)', 'rgba(250,152,56,0.6)', 'rgba(255,91,91,0.6)'],
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
                        label: {
                            normal: {
                                show: true,
                                formatter: (params) => {
                                    return `${params.value.toFixed(2)}%`
                                }
                            }
                        }
                    }
                ]
            }]
        };
        myChart.setOption(option);
        window.addEventListener("resize", function () {
            myChart.resize();
        });
    }

    componentDidMount() {
        this.initChart(data);
    }

    // shouldComponentUpdate(nextProps){
    //     if(JSON.stringify(this.props.data) !== JSON.stringify(nextProps.data)){
    //         this.initChart(nextProps.data);
    //         return true;
    //     }
    //     return false;
    // }

    render() {
        return (
            <div className='car-radar'>
                <BorderBox8 reverse={true}>
                    <div id='myRadar' className='radar'></div>
                    <Lines />
                </BorderBox8>
            </div>
        );
    }
}

class Lines extends React.Component {

    initChart(data) {
        let myChart = echarts.init(document.getElementById('myLines'));
        let option = {
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
        myChart.setOption(option);
        window.addEventListener("resize", function () {
            myChart.resize();
        });
    }

    componentDidMount() {
        this.initChart(data);
    }

    // shouldComponentUpdate(nextProps){
    //     if(JSON.stringify(this.props.data) !== JSON.stringify(nextProps.data)){
    //         this.initChart(nextProps.data);
    //         return true;
    //     }
    //     return false;
    // }

    render() {
        return (
            <div id='myLines' className='lines'></div>
        )
    }
}