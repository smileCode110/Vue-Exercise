<template>
  <div class="goods">
      <!-- 1、搜索区域 -->
      <div class="header">
        <el-input @change='serchInp' v-model="input" placeholder="请输入内容"></el-input>
        <el-button type="primary">查询</el-button>
        <el-button type="primary">
          <router-link to='/addgoods' style="color:#fff">页面添加</router-link>
        </el-button>
        <el-button type="primary" @click="addGoods">添加</el-button>
      </div>   
      <!-- 2、表格区域展示数据 -->
      <div class="wrapper">      
        <el-table :data="tableData"  border style="text-align:center">
          <el-table-column type="selection"  width="40"></el-table-column>
          <el-table-column prop="id" label="商品ID" width="80"></el-table-column>
          <el-table-column prop="title" label="商品名称" width="80" show-overflow-tooltip></el-table-column>
          <el-table-column prop="price" label="商品价格" width="80"></el-table-column>
          <el-table-column prop="num" label="商品数量" width="80"></el-table-column>
          <el-table-column prop="category" label="规格类目" width="80"></el-table-column>
          <el-table-column prop="image" label="商品图片" show-overflow-tooltip></el-table-column>
          <el-table-column prop="sellPoint" label="商品卖点" show-overflow-tooltip></el-table-column>
          <el-table-column prop="descs" label="商品描述" show-overflow-tooltip></el-table-column>
          <el-table-column label="操作" width="250">
            <template slot-scope="scope">
              <el-button size="mini">查看</el-button>
              <el-button size="mini" 
                @click="handleEdit(scope.$index, scope.row)" 
                icon="el-icon-edit">编辑
              </el-button>
              <el-button size="mini" type="danger" 
                @click="handleDelete(scope.$index, scope.row)" 
                icon="el-icon-delete">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 3、分页 -->
      <MyPage :total='total' :pageSize='pageSize' :currentPage="currentPage" @changePage="changePage"/>

      <!-- 4、弹窗 -->
      <!-- <GoodDialog :dialogVisible='dialogVisible' :title="title" @change='close'/> -->
      <GoodDialog ref="dialog" :title="title" :rowData="rowData" />


  </div>
</template>

<script>
import MyPage from '../../components/Mypagination.vue'
import GoodDialog from '../Goods/GoodDialog.vue'
export default {
  components:{
    MyPage,
    GoodDialog
  },
  data(){
    return{
        input:'',
        total:10,
        pageSize:1,
        tableData: [],
        type:true,
        // dialogVisible:false,
        currentPage:1,
        title:'添加商品',
        rowData:{}


    }
  },
  methods:{
    //弹窗添加商品
    addGoods(){
      // this.dialogVisible=true;
      this.$refs.dialog.dialogVisible = true;
    },
    //关闭弹窗
    close(){
      // this.dialogVisible=false;
      this.$refs.dialog.dialogVisible = false;
    },
    // 编辑
    handleEdit(index,row){
      //1、点击编辑按钮，显示弹框 2、弹框上面的名字改为编辑商品
      //用监听器方法传值——生命周期重点
      this.$refs.dialog.dialogVisible = true;
      this.title="编辑商品";
      // console.log("编辑--",index,row)
      // this.$refs.dialog.goodsForm = row;//方法1
      this.rowData = { ...row};//每次都是新地址




    },
    //删除
    handleDelete(index,row){
      // console.log(index,row)
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => {
          //请求接口
          this.$api.getDeleteGoods({
            id: row.id,
          })
          .then((res)=>{
            console.log('删除',res.data)
            if(res.data.status === 200){
               this.$message({
              type: 'success',
              message: '删除成功!'
          });
          //更新视图
          this.http(1);
            }
          })
         
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    //分页
    changePage(num){
      //如果是搜索的分页
      this.currentPage=num;
      if(this.type){
        this.http(num)
      }
      else{
        this.tableData = this.list.slice((num-1)*3,num*3)
      }
    },
    //搜索查询数据
    serchInp(val){
      this.currentPage=1;
      if(!val){
        this.http(1);
        this.type=true;
        return;
      }
      this.$api.getSearch({
        search:val
      })
      .then(res=>{
        // console.log('搜索----',res.data);
        if(res.data.status===200){
          this.list = res.data.result;//获取搜索的总数据条数--数据条目
          //假设需要分页---我们处理分页
          this.total = res.data.result.length;
          this.pageSize = 3;
          this.tableData = res.data.result.slice(0,3);
          this.type = false;
          
        }
        else{
          this.tableData = [];
          this.total = 1;
          this.pageSize = 1;
          this.type = true;
        }
      })
    },

    //商品列表获取
    http(page){
       this.$api.getGoodsList({
       page
    })
    .then(res=>{
      // console.log(res.data);
      if(res.data.status===200){
        this.tableData = res.data.data;
        this.total = res.data.total;
        this.pageSize = res.data.pageSize;
      }
    })
    }
  },
  //生命周期函数
  created(){
    this.http(1);
  }

}
</script>

<style lang='less' scoped>
  .goods{ 
    margin: 20px;
    .header{
    display: flex;
    button{
      margin-left: 20px;
    }
  }
  .wrapper{
    margin-top: 20px;
  }
}



</style>