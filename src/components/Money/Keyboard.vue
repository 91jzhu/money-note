<template>
  <div class="keyboard">
    <div class="output-wrapper">
      <div class="output">
        <label class="notes">
          <input type="text"
                 :value="value2"
                 @input="onValueChange($event.target.value)"
                 placeholder="点击写备注...">
        </label>
        <div class="number">{{ output }}</div>
      </div>
    </div>
      <div class="buttons">
        <button @click="inputContent">1</button>
        <button @click="inputContent">2</button>
        <button @click="inputContent">3</button>
        <button @click="remove">删除</button>
        <button @click="inputContent">4</button>
        <button @click="inputContent">5</button>
        <button @click="inputContent">6</button>
        <button @click="clear">清空</button>
        <button @click="inputContent">7</button>
        <button @click="inputContent">8</button>
        <button @click="inputContent">9</button>
        <button @click="xxx">今日</button>
        <button @click="inputContent" style="width:49%">0</button>
        <button @click="inputContent">.</button>
        <button @click="ok" class="ok">OK</button>
      </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';

@Component
export default class Keyboard extends Vue {
  @Prop({default: ''}) readonly value2!: string;
  @Prop() placeholder?: string;
  @Prop(Number) readonly value!: number;
  output = this.value.toString();

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  xxx(){
    let now=new Date()
    let year=now.getFullYear()
    let month=now.getMonth()+1
    let day=now.getDate()
    window.alert(`今天是${year}年${month}月${day}日`);
  }
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  onValueChange(value2: string) {
    this.$emit('update:value2', value2);
  }
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  remove() {

    if (this.output.length === 1) {
      this.output = '0';
    } else {
      this.output = this.output.slice(0, -1);
    }
  }
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  clear() {
    this.output = '0';
  }
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  ok() {
    const number = parseFloat(this.output);
    this.$emit('update:value', number);
    this.$emit('submit', number);
    this.output = '0';
  }
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  inputContent(event: MouseEvent) {
    const button = (event.target as HTMLButtonElement);
    const text = button.textContent as string;
    if (this.output.length === 16) {
      return;
    }
    if (this.output === '0') {
      if ('0123456789'.indexOf(text) >= 0) {
        this.output = text;
      } else {
        this.output += text;
      }
      return;
    }
    if (this.output.indexOf('.') >= 0 && text === '.') {
      return;
    }
    this.output += text;
  }
}
</script>

<style lang="scss" scoped>
.notes {
  font-size: 14px;
  color: #333333;
  padding: 0;
  display: flex;
  align-items: center;
  input {
    padding:4px 8px;
    outline: none;
    border:none;
    height: 30px;
    flex-grow: 1;
    background-color: transparent;
    &:focus{
      border-radius: 10px;
      box-shadow: 0 0 10px grey;
    }
  }
}

.keyboard {
  border-top: 2px solid black;
  background: #64c3bb;
  .output-wrapper {
    padding: 5px;
  }

  .output {
    margin-top: 5px;
    background: #fdfffe;
    border-radius: 30px;
    border: 2px solid black;
    display: flex;
    justify-content: space-between;
    align-items: center;
    line-height: 8px;
    font-size: 36px;
    font-family: Consolas, monospace;
    padding: 9px 4px;
    text-align: right;
  }
  .buttons {
    margin: 0 5px;
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
    min-height: 220px;
    &::after {
      content: "";
      display: block;
      clear: both;
    }

    font-size: 24px;

    > button {
      outline: none;
      cursor: grab;
      border: 2px solid black;
      border-radius: 30px;
      background: #fdfffe;
      width: 24%;
      height: 48px;
      &.ok{
        margin-left: 4px;
        background: #f1c313;
      }
    }
  }
}
</style>