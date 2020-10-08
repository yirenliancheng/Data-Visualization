import React from 'react';
import echarts from 'echarts';
import './index.less';

export default class Pie extends React.PureComponent{

    initChart(){
        let myChart = echarts.init(document.getElementById('myPie'));
        let option = {
    
        }
        myChart.setOption(option);
        window.addEventListener("resize", function () {
            myChart.resize();
        });
    }

    componentDidMount(){
        this.initChart();
    }

    render(){
        return (
            <div id='myPie' className='pie'></div>
        );
    }
}