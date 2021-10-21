<template>
  <div id="main">
  </div>
</template>

<script lang="ts">
// import {Vue} from 'vue-property-decorator';
import * as echarts from 'echarts';
import EChartOption from 'echarts';
import {Component, Prop, Vue,Watch} from 'vue-property-decorator';

@Component({})
export default class Chart extends Vue {
  @Prop() options?: EChartOption;
  // eslint-disable-next-line no-undef
  chart?:Echarts
  mounted() {
    if (!this.$options) {return;}
    this.$nextTick(()=>{
      const div=document.getElementById('main') as HTMLDivElement
      if(div){
        this.chart = echarts.init(div);
        this.chart.setOption(this.options);
      }
    })
  }
  @Watch('options',{immediate:true})
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  onOptionsChange(newVal){
    this.chart?.setOption(newVal)
  }
}
</script>

<style lang="scss" scoped>

</style>