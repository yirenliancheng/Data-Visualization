import machineJson from './machine.json';
import moment from 'moment';

const stopType = ['断面纱','断连接纱','断底纱','换织针','修漏针','上轴','穿纱','挂布','了机','待盘头','设备检修','设备保养'];
const warnType = ['纱线不足','电力不足','润滑油不足','布匹错位'];
const stuff = ['费有银','郭数马','王远景','邢为华','王轩','韩多多','韩跳动','费有赞'];

function randomPerformance(data){
   let stopLength = stopType.length;
   let warnLength = warnType.length; 
   let stuffLength = stuff.length;
   for(let item in data){
       data[item].forEach(element => {
           //生成模拟机台表现和主轴转速
            var value = [];
            for (let i = 0; i < 6; i++) {
                value.push(Number((Math.random() * 100).toFixed(2)));
            }
            var xAxis = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23];
            var setSpeed = [];
            var rateSpeed = []
            var actualSpeed = [];
            for(let i = 0; i< 24; i++){
                var hours = new Date().getHours();
                if( i <= hours ){
                    setSpeed.push(Math.floor(Math.random()*50)+350);
                    rateSpeed.push(Math.floor(Math.random()*50)+300);
                    actualSpeed.push(Math.floor(Math.random()*100)+300)
                } else {
                 setSpeed.push(0);
                 rateSpeed.push(0);
                 actualSpeed.push(0);
                }
            }
            var speed = {
                xAxis: xAxis,
                setSpeed: setSpeed,
                rateSpeed: rateSpeed,
                actualSpeed: actualSpeed
            }

            //生成模拟产量
            var yieldInfo = {};
            for(let i = 1; i< 15; i++){
               var shiftAPlan = Math.floor(Math.random()*100+100);
               var shiftBPlan = -Math.floor(Math.random()*100+100);
               var shiftTotalPlan = shiftAPlan - shiftBPlan;
               var shiftA = Math.floor(Math.random()*shiftAPlan);
               var shiftB = Math.floor(Math.random()*shiftBPlan);
               var shiftTotal = shiftA - shiftB;
               var ratioTotal = i !== 1 ? Number((shiftTotal/(yieldInfo[`day${i-1}`].shiftTotal) - 1)*100).toFixed(2) : Number(((Math.random()-0.5)*20).toFixed(2));
               yieldInfo[`day${i}`] = {
                "shiftTotalPlan": shiftTotalPlan,
                "shiftAPlan": shiftAPlan,
                "shiftBPlan": shiftBPlan,
                "shiftTotal": shiftTotal,
                "shiftA": shiftA,
                "shiftB": shiftB,
                "ratioTotal": ratioTotal
               }
            }

            //生成机台模拟生产参数
            var machineInformation = [
                {
                    name:'机台编号',
                    value: element.name
                },
                {
                    name:'牵拉密度',
                    value: Number((Math.random()*5 + 12).toFixed(2))
                },
                {
                    name:'卷布密度',
                    value: Number((Math.random()*5 + 12).toFixed(2))
                },
                {
                    name:'胚布型号',
                    value: 'BJS0635P'
                },
                {
                    name:'操作工人',
                    value: stuff[Math.floor(Math.random()*stuffLength)]
                },
                {
                    name:'生产交期',
                    value: moment(new Date()).add(Math.floor(Math.random()*30),'days').format('YYYY-MM-DD')
                },
                {
                    name:'停机次数',
                    value: Number((Math.random()*10).toFixed(0))
                },
                {
                    name:'机台型号',
                    value: '屹立普通7梳SP03F'
                }
            ];

            //生成模拟停机告警信息
            var stopInformation = [];
            var stopNum = Math.floor(Math.random()*10);
            var warnNum = Math.floor(Math.random()*10);
            var maxNum = stopNum >= warnNum ? stopNum : warnNum;
            var startHour1 = 3;
            var startHour2 = 3;
            for(let i = 0;i < maxNum; i++){
                var data = [];
                if(i < stopNum){
                  data = [
                    stopType[Math.floor(Math.random()*stopLength)],
                    `${startHour1+Math.floor(Math.random()*(24-startHour1))}:${Math.floor(Math.random()*60)}:${Math.floor(Math.random()*60)}`,
                    `${Math.floor(Math.random()*100)}min`
                  ];
                  startHour1 = parseInt(data[1]);
                } else {
                  data = ['-','-','-']
                }
                if(i < warnNum){
                  data = data.concat([
                    warnType[Math.floor(Math.random()*warnLength)],
                    `${startHour2+Math.floor(Math.random()*(24-startHour2))}:${Math.floor(Math.random()*60)}:${Math.floor(Math.random()*60)}`
                  ]);
                  startHour2 = parseInt(data[4]);
                } else {
                  data = data.concat(['-','-'])
                }
                stopInformation.push(data);
            }

            //生成模拟产品质量
            var defectArray = new Array(6).fill(100).map(item => Math.floor(Math.random()*item));
            var defectValue = defectArray.reduce((prev,curr) => prev+curr);
            var productData = {
                good: {
                    value: Math.floor(Math.random()*1000+1000),
                    name: "合格品"
                },
                defect: {
                    value: defectValue,
                    name: "残次品",
                    selected:true,
                    detail: [
                     {value: defectArray[0], name: "停机痕"},
                     {value: defectArray[1], name: "断纱"},
                     {value: defectArray[2], name: "油污"},
                     {value: defectArray[3], name: "漏针"},
                     {value: defectArray[4], name: "磨损"},
                     {value: defectArray[5], name: "其它"}
                    ]
                }
            };
            
            element.yieldInfo = yieldInfo;
            element.value = value;
            element.speed = speed;
            element.machineInformation = machineInformation;
            element.stopInformation = stopInformation;
            element.productData=productData;
       })
   }
   return data;
}

var performanceData = randomPerformance(machineJson);
export default performanceData;

