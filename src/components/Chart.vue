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
    console.log(this.$options);
    let chart = echarts.init(document.getElementById('main'));
    chart.setOption(this.options);
  }
}
</script>

<style lang="scss" scoped>

</style>