import Vue from 'vue'
import {Component} from 'vue-property-decorator';

@Component
export default class TagHelper extends Vue{
    createTag() {
        this.$store.state.createTagError=null
        const name = window.prompt('请输入标签名');
        if (name === '' || name!.indexOf(' ') >= 0) {
            window.alert('标签名不能为空或含有空格');
            return;
        }this.$store.commit('createTag',name)
        if(this.$store.state.createTagError){
            window.alert(this.$store.state.createTagError.message)
        }
    }
}

