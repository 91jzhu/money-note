<template>
  <div>
    <LayOut content-class="xxx"
            ref="layout"
            :style="{height:h+'px'}">
      <Keyboard :value.sync="record.amount"
                :value2.sync="record.notes"
                @submit="saveRecord"/>
      <Tags @update:value="record.tags=$event"/>
      <Tabs :content=str
            :data-source="typeList"
            :value.sync="record.type"
            class="tab-style"/>
    </LayOut>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Keyboard from '@/components/Money/Keyboard.vue';
import Tags from '@/components/Money/Tags.vue';
import FormItem from '@/components/Money/FormItem.vue';
import {Component} from 'vue-property-decorator';
import Tabs from '@/components/Tabs.vue';
import typeList from '@/constants/typeList';

@Component({
  components: {Tabs, FormItem, Tags, Keyboard},
  computed: {
    recordList() {
      return this.$store.state.recordList;
    }
  }
})
export default class Money extends Vue {
  str = '记一笔帐';
  h = document.body.clientHeight;
  record: RecordItem = {tags: [], notes: '', type: '-', amount: 0};
  typeList = typeList;

  created() {
    this.$store.commit('fetchRecords');
  }

  saveRecord() {
    if (!this.record.tags || this.record.tags.length === 0) {
      window.alert('请至少选择一个标签');
      return;
    }
    this.$store.commit('createRecord', this.record);
    this.record.notes = '';
  }

}
</script>



