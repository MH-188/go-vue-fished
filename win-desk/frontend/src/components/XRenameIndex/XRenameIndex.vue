<script setup>
import {Type_ArabicNumeral,Type_LowerLetter,Type_CapitalLetter,getIndexStr} from './indexCalculator'
const options = [
  {
    value: Type_ArabicNumeral,
    label: '阿拉伯数字',
  },
  {
    value: Type_LowerLetter,
    label: '英文小写字母',
  },
  {
    value: Type_CapitalLetter,
    label: '英文大写字母',
  },
]

const formData=ref({
    beforeStr:"",
    afterStr:"",
    beginIndex:"",
    indexType:"",
    digit:"",
})


const emit = defineEmits(['change'])
watch(formData.value, (newValue, oldValue) => {
    console.log('子组件监听变化:', newValue, 'from', oldValue);
    emit('change', formData.value);
});


const indexTypeChange=(val)=>{
    console.log(formData.value.indexType)
    if (formData.value.indexType===Type_ArabicNumeral){
        formData.value.beginIndex='1'
    }else if (formData.value.indexType===Type_LowerLetter){
        formData.value.beginIndex='a'
    }else if (formData.value.indexType===Type_CapitalLetter){
        formData.value.beginIndex='A'
    }
}


// 生成序号字串
const genIndex=(data,offset)=>{
    if (!data.indexType){
        return ''
    }
    let result=''
    result=result+data.beforeStr
    
    // 根据固定位数修改序号字符串
    let index=getIndexStr(data.indexType,data.beginIndex,offset)
    let digit=parseInt(data.digit)
    if (digit>index.length){
        let tmp=digit-index.length//需要补位的个数
        for (let i=0;i<tmp;i++){
            result=result+'0'
        }
    }
    result=result+index
    result=result+data.afterStr
    return result
}




// 将变量暴露，这一步必须
defineExpose({
    formData,
    genIndex
})

</script>

<template>
    <div class="box-layout">
        <div class="input-box">
            <el-input v-model="formData.beforeStr" placeholder="前缀字符" clearable  class="input-text"/>
        </div>
        <div class="input-box">
            <el-input v-model="formData.beginIndex" placeholder="开始序号" clearable  class="input-text"/>
            <el-select v-model="formData.indexType" class="m-2" placeholder="选择序号类型" size="large" @change="indexTypeChange">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                />
            </el-select>
            <el-input v-model="formData.digit" placeholder="固定位数" clearable  class="input-text"/>
        </div>
        <div class="input-box">
            <el-input v-model="formData.afterStr" placeholder="后缀字符" clearable  class="input-text"/>
        </div>
    </div>
  </template>
  


<style>
.box-layout{
    display: flex;
    width: 100%;
    height: auto;
}

.input-box{
    display: flex;
    flex-direction: column; /* 设置主轴方向为垂直 */
    width: 100%;
    padding:10px;
    justify-content: center;
}

.input-text{
    padding-bottom: 10px;
    padding-top: 10px;
}

</style>