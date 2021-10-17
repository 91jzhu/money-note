<template>
  <LayOut :style="{height:h+'px'}">
      <div class="navBar">
        <Icon class="leftIcon"
              name="left"
              @click.native="goBack"/>
        <span class="title">
        <Icon name="edit"/>编辑标签</span>
        <div class="rightIcon">
          <Icon/>
        </div>
      </div>

      <div class="form-wrapper">
        <FormItem @update:value="update"
                  :value="tag.name"
                  field-name="标签名"
                  class="labelName"
                  placeholder="请输入标签名"/>
      </div>


      <div class="button-wrapper">
        <Button class="delete" @click="remove">删除标签</Button>
      </div>
  </LayOut>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import FormItem from '@/components/Money/FormItem.vue';
import Button from '@/components/Button.vue';



@Component({
  components: {Button, FormItem, Notes: FormItem},
  computed: {
    tag() {
      return this.$store.state.currentTag;
    }
  }
})
export default class EditLabel extends Vue {
  tag?: Tag = undefined;
  h = document.body.clientHeight;
  created() {
    const id = this.$route.params.id;
    this.$store.commit('fetchTags');
    this.$store.commit('setCurrentTag', id);
    if (!this.tag) {
      this.$router.replace('/404');
    }
  }

  update(name: string) {
    if (this.tag) {
      this.$store.commit('updateTag', {id: this.tag.id, name});
    }
  }

  remove() {
    if (this.tag) {
      this.$store.commit('removeTag', this.tag.id);
    }
  }

  goBack() {
    this.$router.back();
  }
}
</script>

<style lang="scss" scoped>
.delete {
  background: #FFD2D2;
  border: none;
  border-radius: 20px;
  height: 60px;
  width: 180px;
  padding: 0 16px;
}

.labelName {
  font-size: 20px;
  ::v-deep input{
    border-radius: 10px;
  }
}

.button-wrapper {
  text-align: center;
  padding: 16px;
  margin-top: 44-16px;
}

.form-wrapper {
  padding: 0 16px;
  background: white;
}

.navBar {
  min-height: 40px;
  font-size: 24px;
  text-align: center;
  padding: 12px 16px;
  background: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;

  .title {
    font-size: 24px;
  }
;
}
</style>