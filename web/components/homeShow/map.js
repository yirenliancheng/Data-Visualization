import React from 'react';
import echarts from 'echarts';
import world from 'echarts/map/js/world';
import mapJson from '../../data/map.json';

export default class Map extends React.PureComponent {

    convertData = function(data) {
		var res = [];
		for(var i = 0; i < data.length; i++) {
			var dataItem = data[i];
			var fromCoord = mapJson.geoCoordMap[dataItem[0].name];
			var toCoord = mapJson.geoCoordMap[dataItem[1].name];
			if(fromCoord && toCoord) {
				res.push([{
					coord: fromCoord
				}, {
					coord: toCoord,
				}]);
			}
		}
		return res;
	};

    initChart(){
        var myChart = echarts.init(document.getElementById('myMap'));
        var color = [
            "rgb(255,255,0,.8)",
            "rgb(0,255,0)",
            "rgb(122,255,255)", 
            "rgb(255,128,0)", 
            "rgb(255,0,0)"
        ];
        var seriesData = [];
        [
            ["莆田", mapJson.PTData],
            ["上海", mapJson.SHData],
            ["广州", mapJson.GZData],
            ["柏林", mapJson.BLData],
            ["华盛顿", mapJson.WSDData]
        ].forEach((item,i) => {
            seriesData.push(
                {
                    name: item[0],
                    type: "lines",
                    zlevel: 1,
                    effect: {
                      show: true,
                      period: 6,
                      trailLength: 0.7,
                      color: "#fff",
                      symbolSize: 3
                    },
                    lineStyle: {
                      normal: {
                        color: "#3ed4ff",
                        width: 0,
                        curveness: 0.2
                      }
                    },
                    data: this.convertData(item[1])
                  },
                  {
                    name: item[0],
                    type: "lines",
                    zlevel: 2,
                    effect: {
                      show: true,
                      period: 6,
                      trailLength: 0,
                      symbol: mapJson.planePath,
                      symbolSize: 15
                    },
                    lineStyle: {
                      normal: {
                        color: color[i],
                        width: 4,
                        opacity: 0.4,
                        curveness: 0.2
                      }
                    },
                    data: this.convertData(item[1])
                  },
                  {
                    name: item[0],
                    type: "effectScatter",
                    coordinateSystem: "geo",
                    zlevel: 2,
                    rippleEffect: {
                      brushType: "stroke"
                    },
                    label: {
                      normal: {
                        show: true,
                        position: "right",
                        formatter: "{b}",
                        fontSize: 18,
                        fontWeight:800,
                        fontFamily:"Arial, Helvetica, sans-serif",
                      }
                    },
                    symbolSize: function(val) {
                      return val[2] / 8;
                    },
                    itemStyle: {
                      normal: {
                        color: color[i]
                      }
                    },
                    data: item[1].map(function(dataItem) {
                      return {
                        name: dataItem[1].name,
                        value:mapJson.geoCoordMap[dataItem[1].name] != undefined
                            ? mapJson.geoCoordMap[dataItem[1].name].concat([dataItem[1].value])
                            : 0
                      };
                    })
                  }
            )
        });
        var option = {
            geo: {
                map: "world",
                label: {
                  emphasis: {
                    show: false
                  }
                },
                roam: false,
                itemStyle: {
                  normal: {
                    areaColor: "rgba(0,255,255,.02)", 
                    color: 'rgba(51, 69, 89, .5)',
                    borderColor: "#00ffff", 
                    borderWidth: 1.5,
                    shadowColor: "#00ffff",
                    shadowOffsetX: 0,
                    shadowOffsetY: 2,
                    shadowBlur: 20
                  },
                  emphasis: {
                    color: 'rgba(255,10,10,0.8)'
                  }
                },
                aspectScale: 1, //长宽比
                left: 0,
                top: 0,
                right: 0,
                bottom: 0,
                boundingCoords: [
                  //画布设置，左上角经纬度和右下角经纬度
                   [-100, 60],
                   [180, -40]
                ],
                regions: [{
                    name:'China',
                    selected: true
                }]
            },
            series: seriesData
        }
        myChart.setOption(option,true);
        window.addEventListener("resize", function () {
            myChart.resize();
        });
    }

    componentDidMount(){
        this.initChart();
    }

    render(){
        return(
            <div id='myMap' className='map'></div>
        );
    }
}