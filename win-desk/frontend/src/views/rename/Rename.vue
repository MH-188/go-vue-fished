<script setup>
import { ref,reactive, watch } from 'vue'
import XRenameIndex from "@/components/XRenameIndex/XRenameIndex.vue"
import {Type_ArabicNumeral,Type_LowerLetter,Type_CapitalLetter,getIndexStr} from '@/components/XRenameIndex/indexCalculator.js'
import { def } from '@vue/shared';
import {SelectFiles,SelectFile,SelectPath,FilesRename} from "../../../wailsjs/go/service/App"
import {getPathInfo} from '@/utils/path'
import Sortable from "sortablejs";
import { ElMessage, ElMessageBox  } from 'element-plus'
import { useLoading, useInstance } from "@/hooks";
// import { useDraggable } from 'vue-draggable-plus'
// import { VueDraggable } from 'vue-draggable-plus'

const { show, hide } = useLoading();

/* ========== tab切换 ========== */
const nowFuncTab=ref('0')//功能页标签组所在位置：0为增加字符，1为序号格式化
const nowStrTab=ref('0')//增加字符标签页中的文本和序号选择器：0为文本，1为序号



/* ========== 增加字符页面相关变量定义 ========== */
const beforeName='beforeName'
const afterName='afterName'
const specifiedPosition='specifiedPosition'
const radioPosition = ref(beforeName)
const insertText=ref('')//插入的文本


const showPositionInput=ref(false)
const nPosition=ref('')

// 位置选择发生变化回调函数
const radioPositionChange=(val)=>{
    console.log(radioPosition.value)
    if (radioPosition.value===specifiedPosition){
        showPositionInput.value=true
    }else{
        showPositionInput.value=false
    }
    flushTableRename()
}


// 增加字符页面表单变化回调函数
const addStrIndexRef= ref(null)//子组件对象
const addStrIndexData = ref({})//增加字符页面数据
//插入的序号设置数据，需要根据该数据转换为文本
const addIndexChange = (data)=>{
    addStrIndexData.value=data
    console.log('[增加]父组件监听变化:', data);

    flushTableRename()
}




/* ========== 序号格式化页面相关变量定义 ========== */
const formatIndexRef= ref({})//子组件对象
const formatIndexPageData=ref({})//序号格式化页面表单数据
const formatIndexChange=(data)=>{
    console.log('[格式化]父组件监听变化:', data);
    formatIndexPageData.value = data

    flushTableRename()
}




/* ========== 选择文件 ========== */
const listData=reactive({
    list:[
        // {
        //     filePath:'D:\\abc\\1arbgow.pdf',
        //     rename:"",
        //     directoryPath:""
        // },
        // {
        //     filePath:'D:\\abc\\2avjeon.pdf',
        //     rename:"",
        //     directoryPath:""
        // },
        // {
        //     filePath:'D:\\abc\\3fwjebfj.pdf',
        //     rename:"",
        // },
        // {
        //     filePath:'D:\\abc\\4fwbeub.pdf',
        //     rename:"",
        //     directoryPath:""
        // }
    ],
    listKey:0,
})

const deleteRow = (index) => {
    listData.list.splice(index, 1)
}
// 点击选择文件按钮回调函数
const handleSelectFile = () => {
  SelectFiles("").then((path) => {
    console.log(`选择的文件路径为：${path}`,typeof(path));
    let list = []
    console.log('原来的list:',list)
    for (let i=0;i<path.length;i++){
        const pathInfo=getPathInfo(path[i])
        // const  directoryPath=pathInfo.directoryPath
        // const fileName=pathInfo.fileName
        // const fileType=pathInfo.fileType
        list.push({
            filePath:path[i],
            rename:pathInfo.fileName+'.'+pathInfo.fileType,
            directoryPath:pathInfo.directoryPath,
        })
    }
    
    listData.list.push(...list)
  })
  flushTableRename()
};

// 点击选择输出路径按钮回调函数
const outPutPath=ref('')
const handleSelectPath=()=>{
    SelectPath("").then((path)=>{
        outPutPath.value=path
    })
}


/* ========== 执行重命名按钮回调函数 ========== */
const handleRenameOperation=async ()=>{
    if (listData.list.length<1){
        ElMessage.error({
            message: "没有导入文件，不能操作重命名",
            center: true,
        })
        return
    }
    flushTableRename()
    //生成重命名数组
    let renameList=[]
    for (let i=0;i<listData.list.length;i++){
        renameList.push({
            filePath:listData.list[i].filePath,
            rename:listData.list[i].rename,
            outPutDirectoryPath:outPutPath.value?outPutPath.value:listData.list[i].directoryPath,
        })
    }
    console.log(renameList)

    show("正在处理任务");
    await new Promise(resolve => setTimeout(resolve, 500))
    await FilesRename(renameList).then((resp)=>{
        if (resp.code!=200){
            ElMessage.error({
                message: resp.msg,
                center: true,
            })
        }else{
            ElMessage.success({
                message: '成功',
                center: true,
            })
        }
    })

    hide();
}


/* ========== 清空表格 ========== */
const handleClearTable=()=>{
    listData.list=[]
}



/* ========== 刷新列表 ========== */
//增加字符页面生成名字
const genAddStrPageNewName=(index)=>{
    let operationStr = ''
    if (nowStrTab.value==='0'){
        //增加字符
        operationStr=insertText.value
    }else if (nowStrTab.value==='1'){
        //增加序号
        // console.log(addStrIndexData.value)
        operationStr=addStrIndexRef.value.genIndex(addStrIndexData.value,index)
    }
    return operationStr
}

const  flushTableRename=()=>{
    for (let i=0;i<listData.list.length;i++){
        // let lastSlashIndex = listData.list[i].filePath.lastIndexOf('\\');// 获取最后一个斜杠的索引
        // // 分离目录路径和文件名
        // let directoryPath = listData.list[i].filePath.substring(0, lastSlashIndex + 1) // +1 是为了包含斜杠
        // listData.list[i].directoryPath=directoryPath
        // let fileInfo=listData.list[i].filePath.substring(lastSlashIndex + 1)//带有文件后缀的名字

        // let lastPoint=fileInfo.lastIndexOf('.')
        // let fileName = fileInfo.substring(0,lastPoint)//不带有后缀的名字
        // let fileType=fileInfo.substring(lastPoint+1)//文件后缀
        // listData.list[i].rename=fileName+'-'+fileType
        const pathInfo=getPathInfo(listData.list[i].filePath)
        const  directoryPath=pathInfo.directoryPath
        const fileName=pathInfo.fileName
        const fileType=pathInfo.fileType
        listData.list[i].directoryPath=directoryPath
        let newName=''

        //根据所在名字类型判断：增加字符、序号格式化
        if (nowFuncTab.value==='0'){
            //增加字符页面
            //插入位置
            if (radioPosition.value===beforeName){
                //名称前
                newName=genAddStrPageNewName(i)+fileName+'.'+fileType
            }else if (radioPosition.value===afterName){
                //名称后
                newName=fileName+genAddStrPageNewName(i)+'.'+fileType
            }else if (radioPosition.value===specifiedPosition){
                //指定位置后
                if (parseInt(nPosition.value)>fileName.length){
                    newName=fileName+'.'+fileType
                }else{
                    let beforeStr=fileName.substring(0,parseInt(nPosition.value))
                    let after=fileName.substring(parseInt(nPosition.value))
                    console.log(parseInt(nPosition.value),beforeStr,after)
                    newName=beforeStr+genAddStrPageNewName(i)+after+'.'+fileType
                }
            }
        }else if (nowFuncTab.value==='1'){
            //序号格式化页面
            newName=formatIndexRef.value.genIndex(formatIndexPageData.value,i)+'.'+fileType
            console.log("newname:",newName)
        }


        listData.list[i].rename = newName
    }
}



// 行拖拽
const dragSort =  () => {
    // 首先获取需要拖拽的dom节点
    const el1 = document.querySelectorAll('.el-table__body-wrapper')[0].querySelectorAll('table > tbody')[0];
    Sortable.create(el1, {
        sort: true,
        disabled: false, // 是否开启拖拽
        ghostClass: 'sortable-ghost', //拖拽样式
        animation: 150, // 拖拽延时，效果更好看
        group: { // 是否开启跨表拖拽
            pull: false,
            put: false
        },
        onEnd:async (evt) => { //进行数据的处理，拖拽实际并不会改变绑定数据的顺序
            console.log("排序前：",listData.list)
            const { newIndex, oldIndex } = evt
            console.log("oldindex,newindex:",oldIndex,newIndex)
            const currRow = listData.list?.splice(oldIndex, 1)[0]
            console.log("选择的行：",currRow)
            listData.list?.splice(newIndex, 0, currRow)
            
            console.log("变量类型：",listData)
            listData.listKey++
            await flushTableRename()

            console.log("排序后：",listData.list)
        }
    });
}


watch([nowFuncTab,nowStrTab,insertText,nPosition,listData.list],()=>{
    console.log('change:',nowFuncTab.value,nowStrTab.value)
    nextTick(() => {
      dragSort();
    });
    flushTableRename()
})

onMounted(()=>{
    nextTick(() => {
        dragSort();
    });
})
</script>
<template>
    <page-view>
        <div class="rename-card">
            <div class="tabs">
                <el-tabs v-model="nowFuncTab" value="0" tab-position='top' class="page-tabs">
                    <el-tab-pane label="增加字符">
                        <!-- 增加字符页面 -->
                        <div class="add-str-layout">
                            <!-- 左右布局 -->
                            <div style="">
                                <el-radio-group v-model="radioPosition" class="radio-group" @change="radioPositionChange">
                                    <el-radio :label="beforeName" size="large">加到名称前</el-radio>
                                    <el-radio :label="afterName" size="large">加到名称后</el-radio>
                                    <el-radio :label="specifiedPosition" size="large">加到指定位置后</el-radio>
                                </el-radio-group>
                                <el-input v-show="showPositionInput" v-model="nPosition" placeholder="第几位后" clearable style="width:120px"  />
                            </div>
                            <div class="add-str-content-card">
                                <!-- 文本和序号选择器 -->
                                <el-tabs tab-position="top" v-model="nowStrTab"  type="card" class="add-str-content-tabs" >
                                    <el-tab-pane label="文本">
                                        <el-input v-model="insertText" placeholder="请输入文本" clearable  class="add-str-content-input-text"/>
                                    </el-tab-pane>
                                    <el-tab-pane label="序号">
                                        <XRenameIndex ref="addStrIndexRef" @change="addIndexChange"></XRenameIndex>
                                    </el-tab-pane>
                                </el-tabs>
                            </div>
                            
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="序号格式化">
                        <XRenameIndex ref="formatIndexRef" @change="formatIndexChange"></XRenameIndex>
                    </el-tab-pane>
                    <!-- <el-tab-pane label="手动编辑">Role</el-tab-pane> -->
                    <!-- <el-tab-pane label="Task">Task</el-tab-pane> -->
                </el-tabs>
            </div>
            <div class="file-list">
                <!-- <input type="file" @change="handleFileChange" id="fileInput" /> -->
                <div style="width:100%; height:100%">
                        <el-table
                            :data="listData.list"
                            stripe
                            border
                            empty-text="请选择文件"
                            class="draggable-table"
                            row-key="filePath"
                            style="width: 100%; min-height:35vh; user-select: none;">
                        
                            <el-table-column
                                prop="filePath"
                                label="源文件路径"
                                min-width="300">
                            </el-table-column>
                            <el-table-column
                                prop="rename"
                                label="重命名"
                                min-width="250">
                            </el-table-column>
                            <el-table-column
                                label="操作" min-width="90">
                                <template #default="scope">
                                    <el-button
                                    size="small"
                                    type="danger"
                                    @click.prevent="deleteRow(scope.$index)"
                                    >
                                    删除
                                    </el-button>
                                </template>
                            </el-table-column> 
                        </el-table>
                </div>
                <div class="select-file-button">
                    <el-button type="primary" @click="handleSelectPath" style="margin-right:20px" > 点击选择输出路径 </el-button>
                    <span class="show-output-path">{{outPutPath}}</span>
                    <span v-show="!outPutPath">不选默认重命名，输出路径与源文件路径相同也为重命名(建议选中空文件夹操作)</span>
                </div>
                <div class="select-file-button">
                    
                    <el-button type="primary" @click="handleSelectFile" > 点击选择文件 <el-icon><UploadFilled /></el-icon></el-button>
                    <el-button type="danger"  @click="handleClearTable"> 清空表格 </el-button>
                    <el-button type="success" @click="handleRenameOperation" > 执行重命名操作 </el-button>
                </div>
            </div>
        </div>
    </page-view>
</template>
  
  


<style>
.rename-card{
    background-color: white;
    /* height:85vh; */
    position: relative;
}

/* 标签页 */
.tabs{
    padding-left: 20px;
}
.page-tabs > .el-tabs__content {
  padding: 10px;
  /* color: #6b778c;
  font-size: 32px;
  font-weight: 600; */
}

.el-tabs--right .el-tabs__content,
.el-tabs--left .el-tabs__content {
  height: 100%;
}



/* 增加字符页面 */
.add-str-layout{
    display: flex;
}
.radio-group{ 
    display: flex;
    flex-direction: column; /* 设置主轴方向为垂直 */
}

.add-str-content-tabs{
    padding-left: 30px;
}

.add-str-content-tabs > .el-tabs__content {
  padding: 10px;
  /* color: #6b778c; */
  /* font-size: 32px; */
  /* font-weight: 600; */
}
.add-str-content-card{
    width: 100%;
    height: 100%;
}

.add-str-content-input-text{
    width:50%;
}


/* 文件列表 */
.file-list{
    height: 50%;
    width: 100%;
    /* background-color: aliceblue; */

    /* position: absolute;
    bottom: 0; */
}

.file-list::before{
    display:block;
    /* content: "请选择文件"; */
    position:absolute;
    font-family:sans-serif;
    font-size:3vw;
    color: hsl(0, 0%, 30%);
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}

.upload-dragger {
      font-size: 12px;
      background-color: #fff;
      border: 1px solid #d9dbde;
      border-radius: 8px;
      width: 200px;
      height: 200px;
      text-align: center;
      cursor: pointer;
      position: relative;
    }

.upload-dragger .upload-center {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
.select-file-button{
    margin-top: 15px;
    /* position: absolute;
    bottom: 0; */
}
</style>