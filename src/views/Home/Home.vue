<template>
  <div class="home">
    <div class="header">
      <div class="item" v-for="item in totalData" :key="item.id">
        {{ item.title }}
        <div class="num">{{ item.total }}</div>
        <div class="bottom">今日销售额: {{ item.current }}</div>
      </div>
    </div>
    <!-- 访问时长 -->
    <div class="content">
      <div class="time-info">
        <div class="title">月销售额</div>
        <div id="charts" style="width: 100%; height: 360px"></div>
      </div>
      <div class="area">地区分布</div>
    </div>
    <!-- 最新内容 -->
    <div class="home-footer">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>最新内容</span>
        </div>
        <div v-for="o in 4" :key="o" class="text item">
          {{ "列表内容 " + o }}
        </div>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>新增产品</span>
        </div>
        <div v-for="o in 4" :key="o" class="text item">
          {{ "列表内容 " + o }}
        </div>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>快捷入口</span>
        </div>
        <div class="text item">
            <el-button type = "primary">产品管理</el-button>
            <el-button>内容管理</el-button>
          </div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      totalData: [],
    };
  },
  mounted() {
    console.log("图表初始化", this.$echarts);
    console.log(document.getElementById("charts"));
    //进度
    // 销售数据量
    this.$api.getStatisticaldata().then((res) => {
      console.log("销售数据量", res.data);
      if (res.data.status === 200) {
        this.totalData = res.data.list;
      }
    });
    // this.initChart(200,300,577,300)
    //--销售比----------------------
    this.$api.getSellTotal().then((res) => {
      console.log("--x--y---z--", res.data);
      //获取x轴数据
      let xData = res.data.info.date;
      //获取数据
      let xResult = res.data.info.xResult;
      //存放X轴的类目
      let titleArr = [];
      // 存放数值
      let data = [];

      xResult.forEach((ele) => {
        titleArr.push(ele.xName);
        ele.data.forEach((item) => {
          data.push(item.num);
        });
      });
      //折线
      this.initChart(
        xData,
        data.slice(0, 6),
        data.slice(6, 12),
        data.slice(12, 18)
      );
    });
  },
  methods: {
    bar() {
      //柱状图
      // 基于准备好的dom，初始化echarts实例
      var myChart = this.$echarts.init(document.getElementById("main"));

      // 指定图表的配置项和数据
      var option = {
        title: {
          text: "ECharts 入门示例",
        },
        tooltip: {},
        legend: {
          data: ["销量"],
        },
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20],
          },
        ],
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
    // 折线图
    initChart(data, data1, data2, data3) {
      let charts = this.$echarts.init(document.getElementById("charts"));
      let option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985",
            },
          },
        },
        //设置图例
        legend: {
          data: ["家具", "手机", "家电"],
          left: 100,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data,
        },
        yAxis: { type: "value" },
        series: [
          {
            name: "家具",
            type: "line",
            smooth: true,
            areaStyle: {},
            emphasis: {
              focus: "series",
            },
            data: data1,
          },
          {
            name: "手机",
            type: "line",
            smooth: true,
            areaStyle: {},
            emphasis: {
              focus: "series",
            },
            data: data2,
          },
          {
            name: "家电",
            type: "line",
            smooth: true,
            areaStyle: {},
            emphasis: {
              focus: "series",
            },
            data: data3,
          },
        ],
      };
      charts.setOption(option);
    },
  },
};
</script>

<style lang='less' scoped>
.home {
  margin: 10px;
}
.header {
  display: flex;
  padding-right: 30px;
  .item {
    flex: 1;
    height: 100px;
    padding: 10px;
    background: #fff;
    border-radius: 10px;
    margin-left: 20px;
    margin-right: 20px;
    font-weight: bold;
    color: #fff;
    // text-align: center;
    position: relative;
    .num {
      font-size: 22px;
      margin: 10px;
      color: #fff;
    }
    .bottom {
      position: absolute;
      border-top: 1px solid rgb(246, 245, 245);
      padding: 10px 20px;
      bottom: 0;
      right: 0;
      left: 0;
      color: #fff;
      font-weight: normal;
    }
  }
  .item:nth-child(1) {
    background-image: linear-gradient(#df887d, #88554d);
  }
  .item:nth-child(2) {
    background-image: linear-gradient(#409eff, #2e556e);
  }
  .item:nth-child(3) {
    background-image: linear-gradient(#b54fa8, #713c7a);
  }
  .item:nth-child(4) {
    background-image: linear-gradient(#1cd2f1, #39717a);
  }
}

.content {
  margin: 20px;
  display: flex;
  height: 400px;
  .time-info {
    flex: 2;
    background: white;
    padding: 10px;
    margin-right: 20px;
  }
  .area {
    flex: 1;
    background: white;
    padding: 10px;
  }
}

.home-footer{
  display: flex;
  margin-left: 20px;
  margin-bottom: 20px;
  .box-card {
    flex: 1;
    margin-right: 20px;
    span {
      font-weight:600;
    }
  }
  .text {
    display: flex;
   
  }
}

 
 
 
</style>