<template>
  <div class="params">
      <!-- 1、目录位置 -->
      <div class="nav">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/params' }">规格参数</el-breadcrumb-item>
          <el-breadcrumb-item>规格包装</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 2、搜索框 -->
      <div class="header">
        <el-input  @change='serchInp'  v-model="input" placeholder="请输入内容"></el-input>
        <el-button type="primary">查询</el-button>
        <el-button type="primary" @click="addParams">添加</el-button>
      </div> 
      <!-- 3、表格 -->
       <div class="wrapper">      
            <el-table :data="tableData"  border style="text-align:center">
              <el-table-column prop="id" label="规格参数D" width="100"></el-table-column>
              <el-table-column prop="itemCatId" label="类目ID" width="100"></el-table-column>
              <el-table-column prop="paramData" label="规格名称" show-overflow-tooltip></el-table-column>
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
        <!-- 4、分页 -->
      <MyPage :total='total' :pageSize='pageSize' :currentPage="currentPage" @changePage="changePage"/>
      <!-- 5、弹框 -->
    <ParamsDialog ref="params"/>


  </div>
</template>

<script>
import MyPage from '../../../components/Mypagination.vue'
import ParamsDialog from '../Paramsinfo/ParamsDialog.vue'
export default {
    components:{
        MyPage,
        ParamsDialog
    },
    data(){
        return{
            input:'',
            total:10,
            pageSize:1,
            tableData: [],
            currentPage:1,
            type:true,//搜索分页
            
        }
    },
    methods:{
        // 搜索规格参数
        serchInp(val){
            this.currentPage = 1;
            if(!val){
                this.http(1);
                this.type = true;
                return;
            }
            this.$api.getSearchParams({
                search:val
            })
            .then(res=>{
                //console.log('----规格搜索---',res.data)
                if(res.data.status === 200){
                    this.list = res.data.result;//获取搜素数据的总数
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
        //添加规格参数
        addParams(){
            this.$refs.params.dialogVisible = true;
        },
        //获取规格参数列表
        http(page){
            this.$api.getParams({
                page
            })
            .then(res=>{
                if(res.data.status === 200){
                    // console.log('---规格参数---',res.data)
                    this.tableData = res.data.data;
                    this.total = res.data.total;
                    this.pageSize = res.data.pageSize;
                }
                
            })
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
          this.$api.getDeleteParams({
              id:row.id
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
        // 分页
        changePage(num){
            this.currentPage = num;
            if(this.type){
                this.http(num);
            }
            else{
                this.tableData = this.list.slice((num-1)*3,num*3)
            }
        }

    },
     //生命周期函数
    created(){
        this.http(1);
    }

}
</script>

<style lang='less' scoped>
.nav{
    margin: 10px;
}
.header{
    display: flex;
    margin: auto 10px;
    button{
        margin-left: 20px;
    }
}
.wrapper{
    margin: 10px;
}

</style>