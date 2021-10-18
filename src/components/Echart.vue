<template>
  <div id="main">
  </div>
</template>

<script>
// import {Vue} from 'vue-property-decorator';
import * as echarts from 'echarts';
import recordStore from "@/store/recordStore";
// 基于准备好的dom，初始化echarts实例


export default {
  data(){
    return{
      myChart:undefined
    }
  },
  mounted(){
    let chartData=Object.values(recordStore.fetchRecords())
    // console.log(recordStore.fetchRecords());
    console.log(chartData[0].amount, Object.values(chartData[0].tags)[0].name);
    // console.log(chartData[1]);
    // console.log(chartData[2]);

    this.myChart = echarts.init(document.getElementById('main'));
// 绘制图表
    this.myChart.setOption({
      title: {
        text: 'ECharts 入门示例'
      },
      tooltip: {},
      xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
      },
      yAxis: {},
      series: [
        {
          name: '销量',
          type: 'bar',
          data: [ 20, 36, 10, 10, 20]
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