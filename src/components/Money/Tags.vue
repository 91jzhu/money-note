<template>
  <div class="tags">
    <ul class="current">
        <li v-for="tag in tagList" :key="tag.id"
            :class="{selected:selectedTags.indexOf(tag)>=0}"
            @click="toggle(tag)">
          <Icon name="labels1"/>{{ tag.name }}
        </li>
    </ul>
  </div>
</template>

<script lang="ts">
import {Component} from 'vue-property-decorator';
import {mixins} from 'vue-class-component';
import TagHelper from '@/mixins/TagHelper';

@Component({
  computed: {
    tagList() {
      return this.$store.state.tagList;
    }
  }
})
export default class Tags extends mixins(TagHelper) {
  selectedTags: string[] = [];

  created() {
    this.$store.commit('fetchTags');
  }

  toggle(tag: string) {
    const index = this.selectedTags.indexOf(tag);
    if (index >= 0) {
      this.selectedTags.splice(index, 1);
    } else {
      this.selectedTags.push(tag);
    }
    this.$emit('update:value', this.selectedTags);
  }
}
</script>

<style lang="scss" scoped>
.tags {
  background: #f9faf5;
  flex-grow: 1;
  padding: 8px 20px;
  display: flex;
  flex-direction: column;
  overflow-x: auto;

  &::-webkit-scrollbar {
    width: 0 !important
  }

  > .current {
    display: flex;
    flex-wrap: wrap;
    white-space: nowrap;
    margin-right: -12px;

    > li {
      box-shadow: 5px 2.5px 2.5px pink;
      background-color: lightblue;
      height: 24px;
      line-height: 24px;
      border-radius: 12px;
      padding: 0 16px;
      margin-right: 12px;
      margin-top: 12px;

      &.selected {
        background: lightcoral;
      }
    }
  }

  > .new {
    padding-top: 16px;

    button {
      background: transparent;
      border: none;
      border-bottom: 1px solid;
      color: #999;
      padding: 0 3px;
    }
  }
}
</style>