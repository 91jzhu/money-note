import Vue from 'vue'
import {Component} from 'vue-property-decorator';

const map: { [key: string]: string } = {
    'tag name duplicated': '标签名重复了'
};

@Component
export class TagHelper extends Vue {
    createTag() {
        const name = window.prompt('请输入标签名');
        if(name){
            if(name.indexOf(" ")>=0){
                window.alert("标签名不能含有空格");
                return
            }
            this.$store.commit('createTag', name);
            if (this.$store.state.createTagError) {
                window.alert(map[this.$store.state.createTagError.message] || '未知错误');
            }
        }else if(name===" "||name===""){
            window.alert("标签名不能为空")
        }else{}
    }
}

export default TagHelper;