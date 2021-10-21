<template>
  <div id="main">
  </div>
</template>

<script lang="ts">
// import {Vue} from 'vue-property-decorator';
import * as echarts from 'echarts';
import EChartOption from 'echarts';
import {Component, Prop, Vue} from 'vue-property-decorator';

@Component({})
export default class Chart extends Vue {
  @Prop() options?: EChartOption;

  mounted() {
    if (!this.$options) {return;}
    this.$nextTick(()=>{
      const div=document.getElementById('main') as HTMLDivElement
      if(div){
        let chart = echarts.init(div);
        chart.setOption(this.options);
      }
    })
  }
}
</script>

<style lang="scss" scoped>

</style>