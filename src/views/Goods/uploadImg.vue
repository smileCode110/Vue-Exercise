<template>
<!-- 
    ref="upload"   获取dom元素---upload
    on-success	文件上传成功时的钩子	function(response, file, fileList)	
 -->
  <el-upload
  class="upload-demo"
  ref="upload"
  :action="url"
  :on-preview="handlePreview"
  :on-remove="handleRemove"
  :on-success='successUpload'
  :file-list="fileList"
  :auto-upload="false">
  <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
  <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
</el-upload>
</template>

<script>
import base from '../../api/base'
export default {
    data() {
      return {
        url:base.UploadUrl,//图片上传服务器
        fileList: []
      };
    },
    methods: {
      submitUpload() {
        this.$refs.upload.submit();
      },
      /***
       * 上传成功函数
       */
      successUpload(response, file, fileList){
          console.log('上传成功函数',response, file, fileList);
          this.$message({
          message: '恭喜你，图片上传成功！',
          type: 'success'
        });
        // 把图片上传成功的接口response传递给父组件
        //http://localhost:8989/1647078599096-微信图片_20220312174246.jpg
        let imgUrl = base.host +'/'+ response.url.slice(7)
        this.$emit('sendImg',imgUrl);
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      }
    }
  
}
</script>

<style>

</style>