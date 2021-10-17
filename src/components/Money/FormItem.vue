<template>
    <label class="notes">
      <span class="name">{{this.fieldName}}</span>
      <input type="text"
             :value="value"
             @input="onValueChange($event.target.value)"
             :placeholder="placeholder">
    </label>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component, Prop} from 'vue-property-decorator';

@Component
export default class FormItem extends Vue{
  @Prop({default:""})readonly value!:string;
  @Prop({required:true})fieldName!:string;
  @Prop()placeholder?:string

  onValueChange(value:string){
    this.$emit('update:value',value)
  }
}
</script>

<style lang="scss" scoped>
.notes{
  width: 100%;
  font-size:14px;
  color:#333333;
  display: flex;
  align-items: center;
  .name{
    font-weight: bold;
    padding-right: 16px;
    white-space: nowrap;
  }
  input{
    display: block;
    outline: none;
    max-width: 210px;
    height:20px;
    flex-grow: 1;
    background: transparent;
    border:lightyellow;
    padding:4px 8px;
    &:focus{
      outline:1px solid lightcoral;
      box-shadow: 0 0 3px cyan inset;
    }
  }
}
</style>