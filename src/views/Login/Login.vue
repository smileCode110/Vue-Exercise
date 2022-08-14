<template>
  <div class="login">
    <div class="header">登录界面</div>
    <div class="content">
      <el-form
        :model="loginForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="50px"
        class="demo-ruleForm"
      >
        <el-form-item label="账号" prop="username">
          <el-input
            type="text"
            v-model="loginForm.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="loginForm.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >登录</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import jwt from 'jwt-decode'//解析密钥
import { mapMutations } from 'vuex'
export default {
  data() {
    var validateUser = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("请输入账号"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        password: "",
        username: "",
      },
      rules: {
        password: [{ validator: validatePass, trigger: "blur" }],
        username: [{ validator: validateUser, trigger: "blur" }],
      },
    };
  },
  methods: {
    ...mapMutations('loginModule',['setUser']),
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log("校验通过",this.loginForm);
          //请求登陆接口
          let {username,password} = this.loginForm;
          this.$api.getLogin({
            username,password
          }).then((res)=>{
            console.log('密码----',res.data)
            if(res.data.status===200){
              console.log('解析密码---',jwt(res.data.data))
              // 1、存储登录信息   2、跳转页面   3、顶部区域显示用户信息   4、数据持久化
              let obj = {
                user:jwt(res.data.data).username,
                token:res.data.data
              }
              this.setUser(obj)
              //存储本地
              localStorage.setItem('user',JSON.stringify(obj))
              //跳转
              this.$router.push('/')
}
            else{
              alert('账号密码错误！')
            }
          })

        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang='less' scoped>
.login{
   width: 400px;
  height:250px;
  margin: 150px auto;
  border: 1px solid #eee;
  background-color: #fff;
  padding-top: 10px;
}
.header{
   //height: 20px;
  font-size: 15px;
  margin-bottom: 10px;
  text-align: center;
}
.content {
 
  display: flex;
  align-items: center;
  justify-content: center;
    
}

</style>