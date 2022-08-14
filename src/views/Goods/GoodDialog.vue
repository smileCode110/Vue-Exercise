<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      width="60%"
    >
      <el-form
        :model="goodsForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="商品类目" prop="category">
          <el-button
            type="primary"
            @click="innerVisible = true"
            style="margin-right: 10px"
            >类目选择</el-button
          >
          <span>{{ goodsForm.category }}</span>
        </el-form-item>
        <el-form-item label="商品名称" prop="title">
          <el-input v-model="goodsForm.title"></el-input>
        </el-form-item>
        <el-form-item label="商品价格" prop="price">
          <el-input v-model="goodsForm.price"></el-input>
        </el-form-item>
        <el-form-item label="商品数量" prop="num">
          <el-input v-model="goodsForm.num"></el-input>
        </el-form-item>
        <el-form-item label="发布时间" prop="time">
          <el-col :span="11">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="goodsForm.data1"
              style="width: 100%"
            ></el-date-picker>
          </el-col>
          <el-col class="line" :span="2" style="text-align: center">-</el-col>
          <el-col :span="11">
            <el-time-picker
              placeholder="选择时间"
              v-model="goodsForm.data2"
              style="width: 100%"
            ></el-time-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="商品卖点" prop="sellPoint">
          <el-input v-model="goodsForm.sellPoint"></el-input>
        </el-form-item>
        <el-form-item label="商品图片" prop="image">
          <el-button type="primary" @click="innerVisibleImg = true"
            >上传图片</el-button
          >
          <img
            :src="goodsForm.image"
            height="200px"
            style="margin-left: 10px"
            alt=""
          />
        </el-form-item>
        <el-form-item label="商品描述" prop="desc">
          <Wangeditor ref="myEditor" @sendEditor="sendEditor" />
        </el-form-item>
      </el-form>
      <!-- 底部按钮 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </span>

      <!-- 内弹框可以放在外弹框的任何区域，会自己定位 -->
      <!-- 1、内弹框----类目选择 -->
      <el-dialog
        width="50%"
        title="类目选择"
        :visible.sync="innerVisible"
        append-to-body
      >
        <!-- 树形菜单内容 -->
        <Treegoods @sendTreedata="sendTreedata" />
        <span slot="footer" class="dialog-footer">
          <el-button @click="innerVisible = false">取 消</el-button>
          <el-button type="primary" @click="showTree">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 2、内弹框----上传图片 -->
      <el-dialog
        width="50%"
        title="上传图片"
        :visible.sync="innerVisibleImg"
        append-to-body
      >
        <!-- 上传图片内容 -->
        <UploadImg @sendImg="sendImg" />
        <span slot="footer" class="dialog-footer">
          <el-button @click="close">取 消</el-button>
          <el-button type="primary" @click="showImage">确 定</el-button>
        </span>
      </el-dialog>
    </el-dialog>
  </div>
</template>

<script>
import Treegoods from "../Goods/Treegoods.vue";
import UploadImg from "../Goods/uploadImg.vue";
import Wangeditor from "../Goods/wangEditor.vue";
export default {
  components: {
    Treegoods,
    UploadImg,
    Wangeditor,
  },
  data() {
    return {
      dialogVisible: false, //外弹框
      innerVisible: false, //内弹框
      innerVisibleImg: false, //上传图片内弹框
      catagoryData: {}, //类目选择数据
      imgUrl: "", //上传图片地址
      // title cid  category sellPoint price num descs paramsInfo image
      goodsForm: {
        // 名字要与后台相同，有后台接口提供
        id:'',
        title: "", //商品名称
        price: "",
        num: "",
        // time:'',
        sellPoint: "",
        image: "",
        desc: "",
        cid: "", //商品ID
        data1: "", //日期
        data2: "", //时间
        category: "", //类目选择数据
      },
      rules: {
        //规则
        title: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
          { min: 2, max: 8, message: "长度在 2 到 8 个字符", trigger: "blur" },
        ],
        price: [
          { required: true, message: "请输入商品价格", trigger: "change" },
        ],
        num: [
          { required: true, message: "请输入商品数量", trigger: "change" },
          { min: 1, message: "长度大于1", trigger: "blur" },
        ],
      },
    };
  },
  //监听器重点  生命周期
  watch: {
    rowData(val) {
      this.goodsForm = val;
      console.log(val);
      //设置富文本编辑器内容
      this.$nextTick(() => {
        // console.log(this.$refs.myEditor)
        this.$refs.myEditor.editor.txt.html(val.descs);
      });
    },
  },

  props: {
    title: {
      type: String,
      default: "添加商品",
    },
    rowData: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
  methods: {
    //接收wangEditor内容
    sendEditor(val) {
      this.goodsForm.desc = val;
    },
    //显示上传图片
    showImage() {
      this.innerVisibleImg = false;
      this.goodsForm.image = this.imgUrl;
    },
    //接收上传图片
    sendImg(val) {
      // console.log('上传图片地址',val);
      this.imgUrl = val;
    },
    //显示tree的数据
    showTree() {
      this.innerVisible = false;
      this.goodsForm.category = this.catagoryData.name;
      this.goodsForm.cid = this.catagoryData.cid;
    },

    //接收tree的数据
    sendTreedata(val) {
      // console.log('TREE数据',val)
      this.catagoryData = val;
    },
    close() {
      this.dialogVisible = false;
      this.clearForm(); //清空表单
    },
    submitForm() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          // console.log('获取输入的信息',this.goodsForm)
          // 参数： title cid  category sellPoint price num descs paramsInfo image?
          let { title, cid, category, sellPoint, price, num, desc, image,id } =
            this.goodsForm;
          if (this.title === "添加商品") {
            this.$api
              .getAddGoods({
                title,
                cid,
                category,
                sellPoint,
                price,
                num,
                desc,
                image,
              })
              .then((res) => {
                // console.log('添加成功',res.data)
                if (res.data.status === 200) {
                  //成功
                  //1、关闭弹窗    清空表单
                  this.close();
                  //3、发送成功弹框
                  this.$message({
                    message: "恭喜你，添加商品成功成功！",
                    type: "success",
                  });
                }
                 else {
                    console.log("添加商品失败");
                    return false;
                  }
              });
          }
          else{
            console.log("编辑商品")
            this.$api.getUpdataGoods({
              id,title, cid, category, sellPoint, price, num, desc, image
            })
            .then((res)=>{
              // console.log("编辑数据",res.data)
              if (res.data.status === 200) {
                  //成功
                  //1、关闭弹窗    清空表单
                  this.close();
                  //3、发送成功弹框
                  this.$message({
                    message: "恭喜你，编辑商品成功成功！",
                    type: "success",
                  });
                }
                 else {
                    console.log("编辑商品失败");
                    return false;
                  }
            })

          }
        }
      });
    },
    //右上角的×关闭弹框
    handleClose() {
      this.close();
    },
    //清空表单
    clearForm() {
      //2、更新父组件列表
      this.$parent.http(1);
      //4、清空表单
      // this.$refs.ruleForm.resetFields();
      this.goodsForm = {
        name: "", //商品名称
        price: "",
        num: "",
        // time:'',
        sellPoint: "",
        image: "",
        desc: "",
        cid: "", //商品ID
        data1: "", //日期
        data2: "", //时间
      };
      //清空富文本编辑
      this.$refs.myEditor.editor.txt.clear();
    },
  },
};
</script>

<style>
</style>