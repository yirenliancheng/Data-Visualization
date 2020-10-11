import React from 'react';
import echarts from 'echarts';
import 'echarts-liquidfill';
import './index.less';
import { BorderBox11, Decoration9 } from '@jiaminghi/data-view-react';

const rateData = {
    "total": 89,
    "3": 58,
    "5": 73,
    "7": 91,
    "11": 18,
    "15": 88
}

export default class Water extends React.Component{
    
    render(){
        return (
            <BorderBox11 className='pie-border'
              title={this.props.mode === 'total' ? '总进度' : `总进度 VS ${this.props.mode}号车间进度`}
              titleWidth={250} >
                <div className='water'>
                    <div className='water-content' key='total'>
                        <Decoration9 className='water-decor'>
                            <WaterCircle data={rateData.total} idkey='total'/>
                        </Decoration9>
                        <div className='water-name'>总进度</div>
                    </div>
                    {
                        this.props.mode !== 'total' && 
                        <div className='water-content' key='single'>
                            <Decoration9 className='water-decor'>
                              <WaterCircle data={rateData[this.props.mode]} idkey='single'/>
                            </Decoration9>
                           <div  className='water-name'>{this.props.mode}号车间进度</div>
                        </div>
                    } 
                </div>
            </BorderBox11>
        );
    }
}

class WaterCircle extends React.Component{

    rateCheck = (rate) =>{
        if( rate>=0 && rate <=20){
            return 'rgb(253,3,30)'; 
        }
        if( rate>20 && rate <=60){
            return '#03cdf8';
        }
        if( rate>60 && rate <=80){
            return '#f0ff00';
        }
        if( rate>80 && rate <=100){
            return '#06f41a';
        }
    }

    initChart(data){
        let myChart = echarts.init(document.getElementById(this.props.idkey));
        let option = {
            title: {
                text: '',
                textStyle: {
                    fontWeight: 'normal',
                    fontSize: 25,
                    color: 'rgb(97, 142, 205)'
                }
            },
            series: [{
                    type: 'liquidFill',
                    radius: '45%',
                    center: ['50%', '50%'],
                    data: [0.5, 0.5, 0.5], // data个数代表波浪数
                    backgroundStyle: {
                        borderWidth: 1,
                        color: 'rgb(255,0,255,0.1)'
                    },
                    label: {
                        normal: {
                            formatter: (data).toFixed(2) + '%',
                            textStyle: {
                                fontSize: 18,
                                color: this.rateCheck(data)
                            }
                        }
                    },
                    outline: {
                        show: false,
                    }
                },
                {
                    type: "pie",
                    center: ["50%", "50%"],
                    radius: ["50%", "52%"],
                    hoverAnimation: false,
                    data: [{
                            name: "",
                            value: data,
                            labelLine: {
                                show: false
                            },
                            itemStyle: {
                                color: '#5886f0'
                            },
                            emphasis: {
                                labelLine: {
                                    show: false
                                },
                                itemStyle: {
                                    color: '#5886f0'
                                },
                            }
                        },
                        {
                            name: "",
                            value: 2,
                            labelLine: {
                                show: false
                            },
                            itemStyle: {
                                color: '#ffffff',
                                normal: {
                                    color: "#5886f0",
                                    borderColor: "#5886f0",
                                    borderWidth: 10,
                                },
                            },
                            label: {
                                borderRadius: '100%'
                            },
                            emphasis: {
                                labelLine: {
                                    show: false
                                },
                                itemStyle: {
                                    color: '#5886f0'
                                },
                            }
        
                        },
                        { 
                            name: "",
                            value: 2,
                            labelLine: {
                                show: false
                            },
                            itemStyle: {
                                color: '#5886f0'
                            },
                            emphasis: {
                                labelLine: {
                                    show: false
                                },
                                itemStyle: {
                                    color: '#5886f0'
                                },
                            }
                        },
                        { 
                            name: "",
                            value: (100-data),
                            itemStyle: {
                                color: 'transparent'
                            },
                            label: {
                                show: false
                            },
                            labelLine: {
                                show: false
                            },
                            emphasis: {
                                labelLine: {
                                    show: false
                                },
                                itemStyle: {
                                    color: 'rgba(255,255,255,0)'
                                },
                            }
                        }
                    ]
                }
        
            ]
        }
        myChart.setOption(option,true);
        window.addEventListener("resize", function () {
            myChart.resize();
        });
    }

    componentDidMount(){
        this.initChart(this.props.data);
    }

    shouldComponentUpdate(nextProps){
        if(this.props.data !== nextProps.data){
            this.initChart(nextProps.data);
            return true;
        }
        return false;
    }

    render(){
        return (
            <div id={this.props.idkey} className='waterCicle'></div>
        );
    }
}