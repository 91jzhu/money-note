<template>
  <LayOut>
    <div class="test">
      <Tabs :content=str
            class-pre-fix="type"
            :data-source="typeList"
            :value.sync="type"/>
      <div class="chart-wrapper" ref="chartWrapper">
        <Chart class="chart" :options="chartOptions"></Chart>
      </div>
      <ol class="ol-class" v-if="groupedList.length>0">
        <li v-for="(group,index) in groupedList" :key="index">
          <h3 class="title">{{ beautify(group.title) }}<span>￥ {{ group.total }}</span></h3>
          <ol>
            <li v-for="item in group.items" :key="item.id"
                class="record">
              <span>{{ tagString(item.tags) }}</span>
              <div class="notess">{{ item.notes }}</div>
              <span>￥ {{ item.amount }} </span>
            </li>
          </ol>
        </li>
      </ol>

      <div v-else class="no-result" style="display: none">
        <Icon name="replace" style="font-size: 192px"/>
        <span class="text">还没有记录，快来记一🖊吧</span>
      </div>
    </div>
  </LayOut>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Tabs from '@/components/Tabs.vue';
import typeList from '@/constants/typeList';
import dayjs from 'dayjs';
import day from 'dayjs'
import clone from '@/lib/clone';
import Chart from '@/components/Chart.vue';
import * as echarts from 'echarts';
import _ from 'lodash'

@Component({
  components: {Tabs,Chart}
})
export default class Statistics extends Vue {
  str = '看账本啦';

  mounted(){
    const div=this.$refs.chartWrapper as HTMLDivElement
    div.scrollLeft=div.scrollWidth
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  get keyValueList() {
    const today = new Date();
    const array = [];
    for (let i = 0; i <= 29; i++) {
      // this.recordList = [{date:7.3, value:100}, {date:7.2, value:200}]
      const dateString = day(today)
          .subtract(i, 'day').format('YYYY-MM-DD');
      const found = _.find(this.groupedList, {
        title: dateString
      });
      array.push({
        key: dateString, value: found ? found.total : 0
      });
    }
    array.sort((a, b) => {
      if (a.key > b.key) {
        return 1;
      } else if (a.key === b.key) {
        return 0;
      } else {
        return -1;
      }
    });
    return array;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  get chartOptions(){
    const keys=this.keyValueList.map(item=>item.key)
    const values=this.keyValueList.map(item=>item.value)
    return{
      grid:{
        // width:'',
        left:'1%',
        right:'1%',
        bottom:'5%'
      },
      color: ['#80FFA5'],
      // title: {
      //   text: 'Gradient Stacked Area Chart'
      // },
      tooltip: {
        formatter:'{c}',
        position:'top',
        extraCssText: 'box-shadow: 0 0 10px grey;'
        // trigger: 'axis',
        // axisPointer: {
        //   type: 'cross',
        //   label: {
        //     backgroundColor: '#6a7985'
        //   }
        // }
      },
      // legend: {
      //   data: ['Line 1', 'Line 2', 'Line 3', 'Line 4', 'Line 5']
      // },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      xAxis: [
        {
          axisLabel:{
            // interval:2,
            formatter: function (value:string) {
              return value.substr(5);
            }
          },
          axisLine:{
            symbol:['none','arrow'],
            lineStyle:{color:'#ff7500'}
          },
          axisTick:{show:true, alignWithLabel:true},
          type: 'category',
          boundaryGap: false,
          data: keys
        }
      ],
      yAxis: [
        {
          show:false,
          type: 'value'
        }
      ],
      series: [{
          itemStyle:{
            color:'rgb(255, 70, 131)',
            opacity: 1,
          },
          name: 'Line 1',
          type: 'line',
          stack: 'Total',
          smooth: true,
          lineStyle: {
            width: 0
          },
          symbol: 'pin',
          symbolSize: 48,
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgba(128, 255, 165)'
              },
              {
                offset: 1,
                color: 'rgba(1, 191, 236)'
              }
            ])
          },
          emphasis: {
            focus: 'self',
            scale:true
          },
          data: values
        },
      ]
    }
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  beautify(string: string) {
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
  }

  // eslint-disable-next-line no-undef,@typescript-eslint/explicit-module-boundary-types
  tagString(tags: Tag[]) {
    return tags.length === 0 ? '无' : tags.map(i => i.name).join('、');
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  get recordList() {
    // eslint-disable-next-line no-undef
    return (this.$store.state as RootState).recordList;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  get groupedList() {
    const {recordList} = this;
    type Result = {
      title: string,
      total?: number,
      // eslint-disable-next-line no-undef
      items: RecordItem[]
    }[]
    const newList = clone(recordList).filter(r => r.type === this.type).sort((a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf());
    if (newList.length === 0) {
      return [];
    }
    const result: Result = [{title: dayjs(newList[0].createdAt).format('YYYY-MM-DD'), total: 0, items: [newList[0]]}];
    for (let i = 1; i < newList.length; i++) {
      const current = newList[i];
      const last = result[result.length - 1];
      if (dayjs(last.title).isSame(dayjs(current.createdAt), 'day')) {
        last.items.push(current);
      } else {
        result.push({title: dayjs(current.createdAt).format('YYYY-MM-DD'), total: 0, items: [current]});
      }
    }
    result.map(group => {
      group.total =
          group.items.reduce((sum, item) => sum + item.amount, 0);
    });
    return result;
  }

  beforeCreate() {
    this.$store.commit('fetchRecords');
  }

  type = '-';
  interval = 'day';
  typeList = typeList;
}
</script>

<style lang="scss" scoped>
.chart-wrapper{
  overflow: auto;
  &::-webkit-scrollbar{
    display: none;
  }
}
.chart{
  width:600%;
  height: 400px;
}
.text {
  margin-top: 16px;
  white-space: nowrap;
  overflow-y: auto;
}

.no-result {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
}

.test2 {
  min-height: 10vh;
}

.ol-class {
  max-height: 40vh;
  white-space: nowrap;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 0 !important
  }
}

h3 {
  display: flex;
  justify-content: space-between;
}

.notess {
  width: 60vw;
  margin-right: auto;
  margin-left: 20px;
  color: #999;
  overflow-x: auto;

  &::-webkit-scrollbar {
    display: none;
  }
}

.div-button {
  border: 1px solid red;
}

%item {
  padding: 10px 18px;
  min-height: 40px;
  line-height: 24px;
}

.title {
  @extend %item;
}

.record {
  @extend %item;
  display: flex;
  justify-content: space-between;
  font-weight: 500;
  background: white;
}
</style>

