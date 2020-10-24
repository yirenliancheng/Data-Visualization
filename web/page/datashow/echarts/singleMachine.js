import React from 'react';
import echarts from 'echarts';
import './index.less';
import { BorderBox9 } from '@jiaminghi/data-view-react';

export default class SingleMachine extends React.Component {

    shouldComponentUpdate(nextProps){
        if(JSON.stringify(this.props) !== JSON.stringify(nextProps)){
            this.initChart(nextProps.chooseMachineID,nextProps.yieldInfo);
            return true;
        }
        return false;
    }

    initChart(chooseMachineID,yieldInfo) {
        let myChart = echarts.init(document.getElementById('mySingleYieldLine'));
        function dataDeal(sourceArray){
            var xAxisData = [];
            var shiftAPlan = [];
            var shiftBPlan = [];
            var shiftA = [];
            var shiftB = [];
            var ratioTotal = [];
            var data = {};
            for(let i = 29; i >= 0; i--){
               var nowTime = new Date();
               nowTime.setDate(nowTime.getDate()-i);
               var endTime = `${nowTime.getMonth() + 1}月${nowTime.getDate()}日`;
               xAxisData.push(endTime);
               shiftAPlan.push(sourceArray[`day${30-i}`].shiftAPlan);
               shiftBPlan.push(sourceArray[`day${30-i}`].shiftBPlan);
               shiftA.push(sourceArray[`day${30-i}`].shiftA);
               shiftB.push(sourceArray[`day${30-i}`].shiftB);
               ratioTotal.push(sourceArray[`day${30-i}`].ratioTotal);
            }
            data = {
                shiftAPlan: shiftAPlan,
                shiftBPlan: shiftBPlan,
                shiftA: shiftA,
                shiftB: shiftB,
                ratioTotal: ratioTotal
            }
            return { xAxisData, data };
        }

        const { xAxisData,data} = dataDeal(yieldInfo);

        let option = {
                title: {
                    text: `${chooseMachineID}号机台产量情况图：`,
                    textStyle:{
                        color: 'rgb(21,149,233)',
                        fontSize: 20
                    }
                },
                legend: {
                    left: 'right',
                    data: ['日总产量', 'A班产量', 'B班产量', '日产量环比变化'],
                    textStyle: {
                        color: 'white'
                    }
                },
                dataZoom: [
                    {
                        type: 'inside',
                        start: 0,
                        end: 100
                    },
                    {
                        type: 'slider',
                        show: true,
                        height: 30,
                        xAxisIndex: [0],
                        bottom: 30,
                        start: 0,
                        end: 100,
                        handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
                        handleSize: '110%',
                        dataBackground: {
                            lineStyle:{
                                color:'white'
                            },
                            areaStyle: {
                                color: 'white'
                            }
                        },
                        handleStyle: {
                            color: "#5B3AAE",
                        },
                        textStyle:{
                            color:"white",
                        },
                        fillerColor:"rgba(67,55,160,0.6)",
                        borderColor: "rgba(204,187,225,0.5)",
                    }
                ],
                visualMap: {
                    top: 25,
                    right: 0,
                    orient: 'horizontal',
                    seriesIndex: 4,
                    textStyle:{
                        color: 'white'
                    },
                    pieces: [
                      {
                        lte: -100,
                        color: 'blue'
                      },
                      {
                        gt: -100,
                        lte: 0,
                        color: '#096'
                      },
                      {
                        gt: 0,
                        lte: 100,
                        color: '#ffde33'
                      },
                      {
                        gt: 100,
                        color: '#cc0033'
                    }],
                    formatter: (value,value2) => {
                        var left = value === -Infinity ? '' : `${value}%`;
                        var right = value2 === Infinity ? '' : `${value2}%`;
                        if (left === '') return '≤' + right;
                        if (right === '') return '≥' + left;
                        return left + '-' + right;
                    }
                },
                calculable: true,
                grid: {
                    top: 80,
                    bottom: 100,
                    left: 100,
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow',
                            label: {
                                show: true,
                                formatter: function (params) {
                                    return params.value.replace('\n', '');
                                }
                            }
                        }
                    }
                },
                xAxis: [
                    {
                        type: 'category',
                        axisLabel: {
                            interval: 'auto',
                            formatter: '{value}',
                            margin: '10'
                        },
                        data: xAxisData,
                        splitLine: { show: false },
                        axisLine: {
                            onZero: true,
                            lineStyle: {
                                color: 'white'
                            }
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        name: '产量',
                        position: 'left',
                        axisLine: {
                            lineStyle: {
                                color: 'white'
                            }
                        },
                        axisLabel: {
                            formatter:(value) => {
                                return `${Math.abs(value)}m`
                            }
                        },
                        splitLine: {
                            show: false
                        }
                    },
                    {
                        type: 'value',
                        name: '环比',
                        position: 'right',
                        min: (value) => -Math.ceil(Math.max(Math.abs(value.min),Math.abs(value.max))),
                        max: (value) => Math.ceil(Math.max(Math.abs(value.min),Math.abs(value.max))),
                        axisLine: {
                            lineStyle: {
                                color: 'white'
                            }
                        },
                        axisLabel: {
                            formatter:'{value}%'
                        },
                        splitLine: {
                            show: false
                        }
                    }
                ],
                series: [
                    {
                        name: 'A班计划产量',
                        type: 'bar',
                        zlevel: 1,
                        barWidth: '50%',
                        barMaxWidth: '20',
                        itemStyle: {
                          normal: {
                            barBorderRadius: 30,
                            color: 'rgba(22, 231, 56, 0.2)',
                            borderWidth: 0,
                            shadowBlur: {
                              shadowColor: 'rgba(22, 231, 56, 0.1)' ,
                              shadowBlur: 10,
                              shadowOffsetX: 0,
                              shadowOffsetY: 2,
                            },
                          }
                        },
                        data: data.shiftAPlan
                    },
                    {
                        name: 'B班计划产量',
                        type: 'bar',
                        zlevel: 1,
                        barWidth: '50%',
                        barMaxWidth: '20',
                        itemStyle: {
                          normal: {
                            barBorderRadius: 30,
                            color: 'rgba(57, 92, 254, 0.2)',
                            borderWidth: 0,
                            shadowBlur: {
                              shadowColor: 'rgba(253, 191, 25, 0.1)',
                              shadowBlur: 10,
                              shadowOffsetX: 0,
                              shadowOffsetY: 2,
                            },
                          }
                        },
                        data: data.shiftBPlan
                    },
                    { 
                        name: 'A班产量',
                        type: 'bar',
                        zlevel: 2,
                        barWidth: '50%',
                        barMaxWidth: '20',
                        label: {
                            normal: {
                                position: 'top',
                                show: true,
                                color: 'rgb(22, 231, 56)'
                            }
                        },
                        itemStyle: {
                          normal: {
                            barBorderRadius: 30,
                            color: {
                              type: 'linear',
                              x: 0,
                              y: 0,
                              x2: 0,
                              y2: 1,
                              colorStops: [{
                                offset: 0,
                                color: 'rgba(22, 231, 56, 0.2)' 
                              }, {
                                offset: 1,
                                color: 'rgba(22, 231, 56, 1)' 
                              }]
                            }
                          }
                        },
                        data: data.shiftA
                    },
                    {
                         name: 'B班产量',
                         type: 'bar',
                         zlevel: 2,
                         barWidth: '50%',
                         barGap: '-100%',
                         barMaxWidth: '20',
                         label: {
                            normal: {
                                position: 'bottom',
                                color: 'rgb(253, 191, 25)',
                                show: true,
                                formatter: (value) => String(Math.abs(value.data))
                            }
                        },
                         itemStyle: {
                           normal: {
                            barBorderRadius: 30,
                             color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                  offset: 0,
                                  color: 'rgba(57, 92, 254, 0.2)' 
                                }, {
                                  offset: 1,
                                  color: 'rgba(57, 92, 254, 1)' 
                                }]
                              }
                           }
                         },
                        data: data.shiftB,
                    },
                    {
                        name: '日产量环比变化',
                        type: 'line',
                        zlevel: 3,
                        smooth: true,
                        yAxisIndex: 1,
                        symbolSize: 8,
                        lineStyle: {
                            width: 2
                        },
                        data: data.ratioTotal
                    }
                ]
        }
        myChart.setOption(option);
        window.addEventListener("resize", function () {
            myChart.resize();
        });
    }

    componentDidMount() {
        this.initChart(this.props.chooseMachineID,this.props.yieldInfo);
    }

    render() {
        return (
            <BorderBox9>
                <div id='mySingleYieldLine' className='yieldLine'></div>
            </BorderBox9>
        );
    }
}