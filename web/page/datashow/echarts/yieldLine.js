import React from 'react';
import echarts from 'echarts';
import './index.less';
import { BorderBox9 } from '@jiaminghi/data-view-react';
import Yielddata from '../../../data/performance';

export default class YieldLine extends React.Component {

    shouldComponentUpdate(nextProps){
        if(this.props.mode !== nextProps.mode){
            this.initChart(nextProps.mode);
            return true;
        }
        return false;
    }

    initChart(mode) {
        let myChart = echarts.init(document.getElementById('myYieldLine'));
        function modeChange(mode){
            var data = [];
            if (mode === 'total') {
               for(let item in Yielddata) {
                   data = data.concat(Yielddata[item]);
               }
             } else {
               data = Yielddata[mode];
             };
             return data;
        }

        let viewData = modeChange(mode);
        function dataDeal(sourceArray){
            var xAxisData = sourceArray.map(item => item.name);
            var data = {};
            var timeLineData = [];
            for(let i = 13; i >= 0; i--){
               var nowTime = new Date();
               nowTime.setDate(nowTime.getDate()-i);
               var endTime = `${nowTime.getMonth() + 1}月${nowTime.getDate()}日`;
               timeLineData.push(endTime);
               var shiftTotalPlan = []; 
               var shiftAPlan = [];
               var shiftBPlan = [];
               var shiftTotal = [];
               var shiftA = [];
               var shiftB = [];
               var ratioTotal = [];
               for(let item of sourceArray){
                 shiftTotalPlan.push(item.yieldInfo[`day${14-i}`].shiftTotalPlan);
                 shiftAPlan.push(item.yieldInfo[`day${14-i}`].shiftAPlan);
                 shiftBPlan.push(item.yieldInfo[`day${14-i}`].shiftBPlan);
                 shiftTotal.push(item.yieldInfo[`day${14-i}`].shiftTotal);
                 shiftA.push(item.yieldInfo[`day${14-i}`].shiftA);
                 shiftB.push(item.yieldInfo[`day${14-i}`].shiftB);
                 ratioTotal.push(item.yieldInfo[`day${14-i}`].ratioTotal);
               }
               data[endTime] = {
                shiftTotalPlan: shiftTotalPlan,
                shiftAPlan: shiftAPlan,
                shiftBPlan: shiftBPlan,
                shiftTotal: shiftTotal,
                shiftA: shiftA,
                shiftB: shiftB,
                ratioTotal: ratioTotal
               }
            }
            return { timeLineData, xAxisData, data };
        }

        const { timeLineData,xAxisData,data} = dataDeal(viewData);
    
        let options = timeLineData.map(item => {
            return {
                title: {text: `${item}${mode === 'total' ? '总' : `${mode}号`}车间产量情况图：`},
                series:[
                    // {data: data[item].shiftTotalPlan},
                    {data: data[item].shiftAPlan},
                    {data: data[item].shiftBPlan},
                    // {data: data[item].shiftTotal},
                    {data: data[item].shiftA},
                    {data: data[item].shiftB},
                    {data: data[item].ratioTotal}
                ]
            }
        })

        let option = {
            baseOption: {
                timeline: {
                    axisType: 'category',
                    autoPlay: true,
                    playInterval: 3000,
                    orient: 'vertical',
                    right: 60,
                    top: 'center',
                    height: '80%',
                    width: 20,
                    data: timeLineData,
                    label: {
                        color:'white',
                        position: 15
                    },
                    lineStyle: {
                        color: 'white'
                    },
                    controlStyle: {
                        color: 'white',
                        borderColor: 'white'
                    }
                },
                title: {
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
                        start: 30,
                        end: 80
                    },
                    {
                        type: 'slider',
                        show: true,
                        height: 30,
                        xAxisIndex: [0],
                        bottom: 30,
                        start: 30,
                        end: 80,
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
                    }]
                },
                calculable: true,
                grid: {
                    top: 80,
                    bottom: 100,
                    left: 50,
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
                            formatter: '{value}号机台',
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
                        }
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
                        }
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
                         }
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
                        }
                    }
                ]
            },
            options: options
        }

        myChart.setOption(option);
        window.addEventListener("resize", function () {
            myChart.resize();
        });
    }

    componentDidMount() {
        this.initChart(this.props.mode);
    }

    render() {
        return (
            <BorderBox9>
                <div id='myYieldLine' className='yieldLine'></div>
            </BorderBox9>
        );
    }
}