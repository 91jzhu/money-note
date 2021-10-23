<template>
  <div class="layout-wrapper">
    <div ref="content" class="content" :class="contentClass">
      <slot/>
    </div>
    <Nav/>
  </div>
</template>

<script lang="ts">
  export default {
    props:["contentClass"],
    name:"LayOut",
  }
</script>

<style lang="scss" scoped>
.xxx{
  display: flex;
  flex-direction: column-reverse;
}

.layout-wrapper{
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content{
  overflow: auto;
  flex-grow: 1;
}
</style>