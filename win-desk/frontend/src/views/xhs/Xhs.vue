<script setup>
import { ref,reactive, watch } from 'vue'
import { ElMessage, ElMessageBox  } from 'element-plus'
import { useLoading, useInstance } from "@/hooks";
import {Get} from '@/utils/xhs'
import {GetXhsBackgroundPicture,SelectPath,SaveAllPicture} from "../../../wailsjs/go/service/App"
import axios from 'axios';

const { show, hide } = useLoading();
// Get('www.baidu.com')

const pictures=ref([])
const noteUrl=ref('')
const picturesData=ref([])
const hasPicturesData=ref(true)//设置为true时按钮不可用，fasle时按钮可用


const outPutPath=ref('')
const handleSaveAllPicture=async()=>{
    
    await SelectPath("").then((path)=>{
        outPutPath.value=path
    })

    show("正在保存文件");
    await SaveAllPicture(outPutPath.value,picturesData.value).then((resp)=>{
        if (resp.code!=200){
            ElMessage.error({
                message: resp.msg,
                center: true,
            })
            return
        }else{
            ElMessage.success({
                message: '成功',
                center: true,
            })
        }
    })
    hide();
}

const getBackgroundPictures=async ()=>{
    // http://xhslink.com/TyziNx
    // https://www.xiaohongshu.com/explore/65892a54000000003802fdc8?app_platform=ios&app_version=8.18&share_from_user_hidden=true&type=normal&xhsshare=WeixinSession&appuid=5d477c6d0000000012025c94&apptime=1703515251
    show("正在获取图片");
    await GetXhsBackgroundPicture(noteUrl.value).then((resp)=>{
        if (resp.code!=200){
            ElMessage.error({
                message: resp.msg,
                center: true,
            })
            return
        }else{
            ElMessage.success({
                message: '成功',
                center: true,
            })
        }

        pictures.value=resp.images
        picturesData.value=resp.imagesData
        hasPicturesData.value=false
    })
    hide();
}






</script>
<template>
    <page-view>
        <div class="xhs-card">
            <div style="">
                <span style="margin:10px">从小红书点击分享按钮，选择复制分享链接，将链接粘贴到此处</span>
                <div style="margin:10px">
                    <span>文章链接：</span>
                    <el-input  v-model="noteUrl" placeholder="请输入链接" clearable style="width:40%"  />
                </div>
                <!-- <div style="margin:10px">
                    <span>小红书cookie: </span>
                    <el-input  v-model="noteUrl" placeholder="请输入小红书登录信息" clearable style="width:40%"/>
                </div> -->
                <el-button :disabled="noteUrl.length===0" type="primary" @click="getBackgroundPictures" > 获取背景图片 </el-button>
                <el-button :disabled="hasPicturesData" type="primary" @click="handleSaveAllPicture" style="margin-right:20px" > 一键保存 </el-button>
            </div>
            <div class="image-container">
                <div v-for="(imageData, index) in picturesData" :key="index" style="margin-top:10px" class="image-item">
                    <img :src="'data:image/png;base64,'+imageData" alt="无法显示" />
                </div>
            </div>
            <!-- <img :src="" alt="Base64 Image" /> -->
        </div>
    </page-view>
</template>
  
  


<style>
.xhs-card{
    background-color: white;
    /* height:85vh; */
    position: relative;
}

.image-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
  gap: 10px; /* 图片之间的间隔 */
}

.image-item {
  width: calc(20% - 5px); /* 每行5张图片，减去间隔的宽度 */
  margin: 10px;
}

.image-item img {
  width: 100%; /* 图片宽度占满容器 */
  height: auto; /* 自适应高度 */
}
</style>