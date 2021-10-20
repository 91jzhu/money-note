<template>
  <div class="top">
    <Icon name="one"/>
    <span>{{content}}</span>
    <ul class="tabs" :class="{[classPreFix+'-tabs']: classPreFix}">
      <li v-for="item in dataSource" :key="item.value"
          class="tabs-item"
          :class='{[classPreFix+"-tabs-item"]:classPreFix,
                selected:item.value===value}'
          @click="select(item)">
        {{ item.text }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';

@Component
export default class Tabs extends Vue {
  @Prop(String) content?:string|"";
  @Prop({required: true}) dataSource!: [{ text: string, value: string }];
  @Prop(String) readonly value!: string;
  @Prop(String) classPreFix?: string;


  select(item: { text: string, value: string }) {
    this.$emit('update:value', item.value);
  }
}
</script>

<style lang="scss" scoped>
.top{
  box-shadow: 0 3px 3px -3px #5E5E5E;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: nowrap;
  min-height: 60px;
  background: rgb(255, 255, 255);
}
.tabs {
  top:10px;
  right:10px;
  width: 160px;
  background-color: #eaeaea;
  display: flex;
  text-align: center;
  border-radius: 30px;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;

  &-item {
    cursor: grab;
    white-space: nowrap;
    width: 80px;
    line-height: 48px;
    font-weight: bolder;
    &.selected{
      border-radius: 30px;
      background: white;
      border:1px solid darkblue;
    }
  }
}
</style>