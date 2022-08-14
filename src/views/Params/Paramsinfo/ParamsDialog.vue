<template>
  <div>
    <el-dialog
      title="商品规格参数类目选择"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <!-- 规格添加类目 -->
      <Treegoods @sendTreedata="sendTreedata" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="indialogVisible = true"
          :disabled="isDisabled"
          >确定并添加分组</el-button
        >
      </span>
      <!-- 内弹框 -->
      <el-dialog
        width="50%"
        title="商品规格参数配置"
        :visible.sync="indialogVisible"
        append-to-body
      >
        <div class="title" style="margin: 5px auto">
          当前选择商品：{{ treeData.name }}
        </div>
        <el-button type="primary" style="margin:5px auto" @click="addDomain"
          >新增规格列表</el-button
        >
        <hr />
        <el-form
          :model="dynamicValidateForm"
          ref="dynamicValidateForm"
          label-width="20px"
          class="demo-dynamic"
        >
          <el-form-item
            v-for="(item, index) in dynamicValidateForm.domains"
            :key="index"
            :prop="item.title"
            :rules="{
              required: true,
              message: '域名不能为空',
              trigger: 'blur',
            }"
          >
            <div class="inform">
                <el-input v-model="item.title"></el-input>
                <el-button @click.prevent="removeDomain(index)">删除</el-button>
                <el-button @click.prevent="addChildDomain(index)">添加子组</el-button>
            </div>
             <!-- 子组 -->
            <el-form-item
             label-width="40px"
             v-for="(ele, i) in item.children"
             :key="i"
             :prop="ele.title"
             :rules="{
               required: true,
               message: '域名不能为空',
               trigger: 'blur',
             }"
            >
            <div class="inform">
                <el-input v-model="ele.title"></el-input>
                <el-button @click.prevent="removeChileDomain(index,i)">删除</el-button>
            </div>
           </el-form-item>
          </el-form-item>
         
        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitForm('dynamicValidateForm')">确定</el-button>
          <el-button @click="resetForm('dynamicValidateForm')">重置</el-button>
        </span>
      </el-dialog>
    </el-dialog>
  </div>
</template>

<script>
import Treegoods from "../../Goods/Treegoods.vue";
export default {
  components: {
    Treegoods,
  },
  data() {
    return {
      dialogVisible: false, //外弹框
      indialogVisible: false, //内弹框
      isDisabled: true, //默认是灰色
      treeData: [],
      dynamicValidateForm: {//动态表单
          domains: [],
        }
    };
  },
  methods: {
    // 提交表单
     submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            //console.log('提交规格参数----',this.dynamicValidateForm.domains)
            //参数：itemCatId,content,specsName
            this.$api.getAddParams({
              itemCatId:this.treeData.cid,
              specsNamez:this.treeData.name,
              content:JSON.stringify(this.dynamicValidateForm.domains)

            })
            .then(res=>{
              console.log('=====',res.data)
              if(res.data.status === 200){
                //添加成功  隐藏弹框  更新规格列表
                this.indialogVisible = false;
                this.dialogVisible = false;
                //清空数据
                this.dynamicValidateForm.domains = [];
                //确定添加按钮调制禁用状态
                this.isDisabled = true;
                // 更新列表
                this.$parent.http(1);
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      // 重置表单
      resetForm(formName) {
        this.$refs[formName].resetFields();
        //清空数据
        this.dynamicValidateForm.domains = [];
      },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    //接收数据
    sendTreedata(val) {
      this.isDisabled = false;
      this.treeData = val;
    },

    // 删除规格列表
    removeDomain(index) {
        this.dynamicValidateForm.domains.splice(index, 1)
      },
      //删除子组
      removeChileDomain(index,i){
          this.dynamicValidateForm.domains[index].children.splice(i, 1)
      },
      // 添加规格列表
      addDomain() {
        this.dynamicValidateForm.domains.push({
          value: '',
          title:'',
          children:[],
        });
      },
      //添加子组
      addChildDomain(index){
          this.dynamicValidateForm.domains[index].children.push({
              value:'',
              title:'',
              children:[]
          })
      }
  },
};
</script>

<style lang='less' scoped>
.inform{
    display: flex;
    margin-bottom: 10px;
    button{
        margin-left: 10px;
    }

}
</style>