import React from 'react';
import echarts from 'echarts';
import './index.less';
import { BorderBox11 } from '@jiaminghi/data-view-react';

export default class Pie extends React.Component{
    dataPreDeal(mode){
        let data = this.props.pieJson[mode];
        let defect = data.defect;
        let detail = data.defect.detail;
        let legend = detail.map(item => item.name);
        let innerpie = [ data.good, defect ];
        return { detail, legend, innerpie };
    }

    initChart(mode){
        let myChart = echarts.init(document.getElementById('myPie'));
        const { detail, legend, innerpie } = this.dataPreDeal(mode);
        this.dataPreDeal(mode);
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
        this.initChart(this.props.mode);
    }

    machinestatus(mode) {
        switch (mode) {
            case "total" :
               return '汇总车间';
            case "3" :
                return '3号车间';
            case "5" :
                return '5号车间';
            case "7" :
                return "7号车间";
            case "11" :
                return "11号车间";
            case "15" :
                return "15号车间";
            default :
                return '汇总车间';
        }
    }

    shouldComponentUpdate(nextProps){
        if(this.props.mode !== nextProps.mode){
            this.initChart(nextProps.mode);
            return true;
        }
        return false;
    }
 
    render(){
        return (
            <BorderBox11 className='pie-border' title={`${this.machinestatus(this.props.mode)}产品质量`} titleWidth={250} >
                <div id='myPie' className='pie'></div>
            </BorderBox11>
        );
    }
}