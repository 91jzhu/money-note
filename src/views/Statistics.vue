<template>
  <LayOut>
    <div class="test">
      <Tabs :content=str
            class-pre-fix="type"
            :data-source="typeList"
            :value.sync="type"/>
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

      <div v-else class="no-result">
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
import clone from '@/lib/clone';

const oneDay = 864000;

@Component({
  components: {Tabs}
})
export default class Statistics extends Vue {
  str: string = '看账本啦';

  beautify(string: string) {
    const now = new Date();
    if (dayjs(string).isSame(now, 'day')) {
      return '今天';
    } else if (dayjs(string).isSame(now.valueOf() - oneDay, 'day')) {
      return '昨天';
    } else if (dayjs(string).isSame(now.valueOf() - oneDay * 2, 'day')) {
      return '前天';
    } else {
      if (dayjs(string).isSame(now, 'year')) {
        return dayjs(string).format('M月D日');
      }
      return dayjs(string).format('YYYY年M月D日');
    }
  }

  tagString(tags: Tag[]) {
    return tags.length === 0 ? '无' : tags.map(i => i.name).join('、');
  }

  get recordList() {
    return (this.$store.state as RootState).recordList;
  }

  get groupedList() {
    const {recordList} = this;
    type Result = {
      title: string,
      total?: number,
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
.text {
  margin-top: 16px;
}

.no-result {
  display: flex;
  flex-wrap: wrap;
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
  max-height: 80vh;
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

