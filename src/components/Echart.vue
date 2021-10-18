<template>
  <div id="main">
  </div>
</template>

<script>
// import {Vue} from 'vue-property-decorator';
import * as echarts from 'echarts';
import recordStore from "@/store/recordStore";
// 基于准备好的dom，初始化echarts实例

let chartData=Object.values(recordStore.fetchRecords())
console.log(chartData);
export default {
  data(){
    return{
      myChart:undefined,
      length:chartData.length,
      isNew:false
    }
  },
  methods:{
    createKey(){
      let arr=[]
      for(let i=0;i<this.length;i++){
        arr.push(Object.values(chartData[i].tags)[0].name)
      }



      return arr
    },
    createValue(){
      let arr=[]
      for(let i=0;i<this.length;i++){
        arr.push(chartData[i].amount)
      }
      return arr
    }
  },
  mounted(){
    this.myChart = echarts.init(document.getElementById('main'));
    this.myChart.setOption({
      title: {
        text: 'ECharts 入门示例'
      },
      tooltip: {},
      xAxis: {
        data: this.createKey()
      },
      yAxis: {},
      series: [
        {
          name: '销量',
          type: 'bar',
          data: this.createValue()
        }
      ]
    });
  }
}
</script>

<style lang="scss" scoped>
#main {
  max-width: 100%;
  height: 300px;
}
</style>