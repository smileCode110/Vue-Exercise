<template>
  <el-tree
  :props="props"
  :load="loadNode"
  lazy
  accordion
  @node-click='nodeClick'
  >
  </el-tree>
</template>

<script>
export default {
    data() {
      return {
        props: {
          label: 'name',
          children: 'zones',
          isLeaf: 'leaf'
        },
      };
    },
    methods: {
        //点击tree获取数据
       nodeClick(data){
           console.log(data)
           //向父组件传递数据
           this.$emit('sendTreedata',data)
       },
      loadNode(node, resolve) {//resolve成功返回结果
    //   console.log('node---',node)
        if (node.level === 0) {
            //获取第一层tree的数据
            this.$api.getSelectCategory()
            .then(res=>{
                // console.log('一级tree',res.data);
                return resolve(res.data.result);

            })
        }
        if (node.level >= 1){
            //请求当前点击tree下面的数据
            this.$api.getSelectCategory({
                id:node.data.cid
            })
            .then(res=>{
                // console.log('二级tree',res.data);
                if(res.data.status===200){
                    return resolve(res.data.result);
                }
                else{
                    return resolve([]);
                }
            })
        } 
      }
    }
  };
</script>

<style>

</style>