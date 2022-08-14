<template>
  <div>
     <el-menu
      default-active="/"
      class="el-menu-vertical-demo"  
      text-color="#fff"
      background-color="#112f50"
      active-text-color="#409EFF"
      router
      :collapse="isCollapse"
      >
      <!-- :collapse="isCollapse" 表示是否折叠 -->
      <el-menu-item>
        <span slot="title">易购后台管理系统</span>
      </el-menu-item>
      <el-menu-item index="/">
          <i class="el-icon-menu"></i>
          <!-- <span to='/'>{{ $t("menu.home") }}</span> -->
          <span to='/'>数据统计</span>

      </el-menu-item>

       <el-menu-item index="/goods">
        <slot name="title">
          <i class="el-icon-document"></i>
          <!-- <span to='/goods'>{{ $t("menu.goods") }}</span> -->
          <span to='/'>商品管理</span>
        </slot>
      </el-menu-item>

      <el-submenu index="/params">
        <template slot="title">
          <i class="el-icon-setting"></i>
          <!-- <span>{{ $t("menu.order") }}</span> -->
          <span to='/'>规格管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/params/specifications">
            <span>规格包装</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu> 


       <el-menu-item index="/advent">
        <slot name="title">
          <i class="el-icon-location"></i>
          <!-- <span to='/advent'>{{ $t("menu.advent") }}</span> -->
          <span to='/'>广告管理</span>
        </slot>
      </el-menu-item>

       <el-submenu index="/order">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <!-- <span>{{ $t("menu.order") }}</span> -->
          <span to='/'>订单管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/order/orderlist">
            <span>订单列表</span>
          </el-menu-item>
          <el-menu-item index="/order/orderback">
            <span>退货订单</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu> 


    </el-menu>
  
      
  </div>
</template>

<script>
export default {
  props:['isCollapse'],
  data(){
    return{

    }
  }

}
</script>

<style>
.el-menu {
  border-right: 0;

}
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
</style>