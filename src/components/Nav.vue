<template>
  <nav>
      <router-link to="/labels" class="item" active-class="actived">
        <Icon name="label"/>
        标签
      </router-link>
      <router-link to="/money" class="item" active-class="actived">
        <Icon name="money"/>
        记账
      </router-link>
      <router-link to="/statistics" class="item" active-class="actived">
        <Icon name="chart"/>
        数据
      </router-link>
  </nav>
</template>

<script lang="ts">

export default {
  name: 'Nav',
  // eslint-disable-next-line no-undef

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types

};
</script>

<style lang="scss" scoped>
nav {
  height:60px;
  box-shadow: 0 -3px 3px -3px #5E5E5E;
  font-weight: bold;
  font-size: 14px;
  display: flex;
  flex-direction: row;

  > .item {
    padding: 0.5em 0;
    width: 33.33333%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .icon {
      width: 32px;
      height: 32px;
    }
  }

  > .item.actived {
    background: turquoise;
  }
}
</style>