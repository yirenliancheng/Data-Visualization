import React from 'react';
import echarts from 'echarts';
import './index.less';
import { BorderBox11 } from '@jiaminghi/data-view-react';

export default class Pie extends React.Component{
    dataPreDeal(){
        let data = this.props.pieJson;
        let defect = data.defect;
        let detail = data.defect.detail;
        let legend = detail.map(item => item.name);
        let innerpie = [ data.good, defect ];
        return { detail, legend, innerpie };
    }

    initChart(){
        let myChart = echarts.init(document.getElementById('myPie'));
        const { detail, legend, innerpie } = this.dataPreDeal();
        let option = {
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b}: {c} ({d}%)'
            },
            legend: {
                orient: 'vertical',
                left:'0%',
                top:'center',
                data: legend,
                textStyle: {
                    color: '#fff',
                    lineHeight:20
                }
            },
            series: [
                {
                    name: '产品质量',
                    type: 'pie',
                    selectedMode: 'single',
                    radius: [0, '30%'],
                    label: {
                        position: 'inner',
                        formatter: '{b}：{d}%'
                    },
                    labelLine: {
                        show: false
                    },
                    data: innerpie
                },
                {
                    name: '缺陷问题',
                    type: 'pie',
                    radius: ['40%', '55%'],
                    label: {
                        formatter: '{b|{b}：}\n{hr|}\n {c}  {per|{d}%}  ',
                        backgroundColor: '#eee',
                        borderColor: '#aaa',
                        borderWidth: 1,
                        borderRadius: 4,
                        rich: {
                            b: {
                                lineHeight: 22,
                                align: 'left',
                                padding: 2
                            },
                            hr: {
                                borderColor: '#aaa',
                                width: '100%',
                                borderWidth: 0.5,
                                height: 0
                            },
                            per: {
                                color: '#eee',
                                backgroundColor: '#334455',
                                padding: [2, 4],
                                borderRadius: 2
                            }
                        }
                    },
                    data: detail
                }
            ],
            color: [ 'rgb(22, 231, 56)', '#E60000',  '#0066FF', '#92368D', '#BF9926',"#F76F01", "#00FFFF",  "#FE2C8A"]
        }
        myChart.setOption(option,true);
        window.addEventListener("resize", function () {
            myChart.resize();
        });
    }

    componentDidMount(){
        this.initChart();
    }

    shouldComponentUpdate(nextProps){
        if(JSON.stringify(this.props) !== JSON.stringify(nextProps)){
            this.initChart();
            return true;
        }
        return false;
    }
 
    render(){
        return (
            <BorderBox11 className='pie-border' title={`${(this.props.machineId)}号机台产品质量`} titleWidth={250} >
                <div id='myPie' className='pie'></div>
            </BorderBox11>
        );
    }
}