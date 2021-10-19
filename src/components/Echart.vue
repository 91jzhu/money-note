<template>
  <div id="main">
  </div>
</template>

<script>
// import {Vue} from 'vue-property-decorator';
import * as echarts from 'echarts';
import recordStore from "@/store/recordStore";
import dayjs from "dayjs";

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
    beautify(string) {
      const day = dayjs(string);
      const now = dayjs();
      if (day.isSame(now, 'day')) {
        return '今天';
      } else if (day.isSame(now.subtract(1, 'day'), 'day')) {
        return '昨天';
      } else if (day.isSame(now.subtract(2, 'day'), 'day')) {
        return '前天';
      } else if (day.isSame(now, 'year')) {
        return day.format('M月D日');
      } else {
        return day.format('YYYY年M月D日');
      }
    },
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
        // this.beautify(chartData[i].createdAt)
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
  height: 300px;
}
</style>