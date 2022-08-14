<template>
  <div class="back">
    <div class="add">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/goods' }">商品管理</el-breadcrumb-item>
          <el-breadcrumb-item>添加商品</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
      <div class="content">
          <el-form :model="goodsForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="商品类目" prop="title">
              <el-button type="primary">类目选择</el-button>
            </el-form-item>
            <el-form-item label="商品名称" prop="name">
              <el-input v-model="goodsForm.name"></el-input>
            </el-form-item>
            <el-form-item label="商品价格" prop="price">
              <el-input v-model="goodsForm.price"></el-input>
            </el-form-item>
            <el-form-item label="商品数量" prop="num">
              <el-input v-model="goodsForm.num"></el-input>
            </el-form-item>
            <el-form-item label="发布时间" prop="time">
              <el-col :span="11">
                <el-date-picker type="date" placeholder="选择日期" v-model="goodsForm.date1" style="width: 100%;"></el-date-picker>
              </el-col>
              <el-col class="line" :span="2" style="text-align:center">-</el-col>
              <el-col :span="11">
                <el-time-picker placeholder="选择时间" v-model="goodsForm.date2" style="width: 100%;"></el-time-picker>
              </el-col>
            </el-form-item>
             <el-form-item label="商品卖点" prop="sellPoint">
              <el-input v-model="goodsForm.sellPoint"></el-input>
            </el-form-item>
             <el-form-item label="商品图片" prop="image">
                <el-button type="primary">上传图片</el-button>
            </el-form-item>
            <el-form-item label="商品描述" prop="desc">
                <el-input type="textarea" v-model="goodsForm.desc" style="width:300px"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-form>
      </div>
  </div>
</template>

<script>
export default {
 data() {
      return {
        goodsForm: {
          title:'',
          name: '',
          price:'',
          num:'',
          time:'',
          sellPoint:'',
          image:'',
          decs:'',
          data1:'',
          data2:''
        },
        rules: {//规则
          name: [
            { required: true, message: '请输入商品名称', trigger: 'blur' },
            { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' }
          ],
          price: [
            { required: true, message: '请输入商品价格', trigger: 'change' }
          ],
          num: [
            { required: true, message: '请输入商品数量', trigger: 'change' },
            { min: 1,  message: '长度大于1', trigger: 'blur' }
          ],
           
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style lang='less' scoped>
.back{
    margin: 15px;
    .add{
      padding: 8px;
      background: white;
      height: 20px;
      
    }
    .content{
      margin-top:15px ;
      padding: 10px 20px;
      background: white;

    }
}

    

</style>