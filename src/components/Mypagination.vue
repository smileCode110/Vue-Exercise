<template>
  <div style="text-align:center">
    <el-pagination
        background
        layout="prev, pager, next,total,jumper"
        :total="total"
        :page-size="pageSize"
        :current-page.sync="currentPage"
        @current-change="changePage">
    </el-pagination>
  </div>
</template>

<script>
export default {
    props:{
        total:{
            type:Number,
            default:100
        },
        pageSize:{
            type:Number,
            default:10
        },
        currentPage:{
            type:Number,
            default:1
        }

    },
    methods:{
        changePage(page){
            this.$emit('changePage',page)
        }
    }

}
</script>

<style>

</style>