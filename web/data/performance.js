import machineJson from './machine.json';

function randomPerformance(data){
   for(let item in data){
       data[item].forEach(element => {
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
            element.value = value;
            element.speed = speed;
       })
   }
   return data;
}

function randomYield(data){
    for(let item in data){
        data[item].forEach(element => {
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
            element.yieldInfo = yieldInfo;
        })
    }
    return data;
}

var performanceData = randomPerformance(machineJson);
var Yielddata = randomYield(performanceData);

export default Yielddata;

