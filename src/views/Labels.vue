<template>
  <LayOut>
    <div class="tags">
      <div class="test">

      </div>
      <div class="top">
        <Icon name="tag"/>
        标签页
      </div>
      <router-link class="tag"
                   ref="www"
                   :to="`/labels/edit/${tag.id}`"
                   v-for="tag in tags" :key="tag.id">
        <span>
          <Icon name="tags"/>
          {{ tag.name }}
        </span>
        <Icon name="right"/>
      </router-link>
    </div>
    <div class="newTag-wrapper">
      <Button class="newTag" @click="createTag">新建标签</Button>
    </div>
  </LayOut>
</template>

<script lang="ts">
import {Component} from 'vue-property-decorator';
import {mixins} from 'vue-class-component';
import TagHelper from '@/mixins/TagHelper';

@Component({
  computed: {
    tags() {
      return this.$store.state.tagList;
    }
  }
})
export default class Labels extends mixins(TagHelper) {
  beforeCreate() {
    this.$store.commit('fetchTags');
  }
}

</script>

<style lang="scss" scoped>
.test{
  height: 60px;
}
.top {
  width: 100%;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  font-size: 24px;
  top:0;
  position: absolute;
  box-shadow: 0 3px 3px -3px #5E5E5E;
}

.newTag {
  background: #FFD2D2;
  border: none;
  border-radius: 20px;
  height: 60px;
  width: 180px;
  padding: 0 16px;

  &-wrapper {
    text-align: center;
    padding: 16px;
    margin-top: 4px;
  }
}

.tags {
  background: #f9faf5;
  font-size: 20px;
  height: 70vh;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 0 !important
  }

  > .tag {
    padding: 0 16px;
    background: #f9faf5;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 2px solid #e6e5e8;

    svg {
      width: 20px;
      height: 20px;
    }
  }
}

</style>

