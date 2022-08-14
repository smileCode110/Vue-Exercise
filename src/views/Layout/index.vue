<template>
  <div class="layout">
      <!-- 左侧导航栏 -->
      <MyMenu class="menu"  :isCollapse='isCollapse'/>
      <!-- 右侧内容区域 -->
      <Content class="content" :class="{isActive:isCollapse}"  @changeCollapse='changeCollapse'  :isCollapse='isCollapse'/>
  </div>
</template>

<script>
import MyMenu from './MyMenu.vue'
import Content from './Content.vue'
export default {
  components:{
    MyMenu,
    Content
  },
  data(){
    return{
      isCollapse:false,
    }
  },
  methods:{
    changeCollapse(){
      this.isCollapse = !this.isCollapse;
    }
  }

}
</script>

<style lang="less" scoped>
  .layout{
// 左侧固定，右侧可以随内容增多而滑动
    .menu{
      // width: 200px;
      position: fixed;
      top: 0;
      bottom: 0;
      background:rgb(17, 47, 80);
    }
    .content{
      margin-left: 200px;
      transition: all 0.1s;
    }
    .isActive{
      margin-left: 64px;

    }
  }

</style>