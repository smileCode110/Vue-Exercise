<template>
  <div>
    <div class="header">
      <i v-if="!isCollapse" @click="changeMenu" class="iconfont icon-right-indent"></i>
      <i v-else @click="changeMenu" class="iconfont icon-left-indent"></i>
      <div class="header-right">
        <el-dropdown @command="changeLange">
          <span class="el-dropdown-link">
            多语言<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>中文</el-dropdown-item>
            <el-dropdown-item>English</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

        <div class="user">
          <span style="margin-right:8px">欢迎：{{userinfo.user}}</span>
          <span class="el-icon-switch-button" @click="loginout"></span>
        </div>
      </div>
    </div>
    <!-- 内容区域路由出口 -->
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex'

export default {
  props: ["isCollapse"],
  computed:{
    ...mapState('loginModule',['userinfo'])
  },
  methods: {
    ...mapMutations('loginModule',['clearUser']),
    changeMenu() {
      //修改父组件的数据
      this.$emit("changeCollapse");
    },
    changeLange(){
      console.log("改变语言")
    },
    loginout(){
      //退出登录
      //清空vuex数据
      this.clearUser();
      //清空本地存储
      localStorage.removeItem('user')
      //返回登录
      this.$router.push('/login')

    }
  },
};
</script>

<style lang='less' scoped>
.header {
  height: 30px;
  line-height:30px;
  background: skyblue;
  color: white;
  .iconfont {
    font-size: 24px;
  }
}
.header-right{
  float: right;
  display: flex;
  padding-right: 20px;
  .user{
    margin-left: 15px;
  }
}
</style>