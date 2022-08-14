import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

// 准备翻译的语言环境信息
const messages = {
    en: {
      menu: {
        home: 'Home',
        goods:'Goods Manage',
        params:'Specification',
        advent:'Advantages',
        order:'Order Manage'
      }
    },
    zh: {
        menu: {
        home: '首页',
        goods:'商品管理 ',
        params:'规格参数',
        advent:'广告信息',
        order:'订单管理'
      }
    }
  }

// 通过选项创建 VueI18n 实例
  const i18n = new VueI18n({
    locale: 'zh', // 设置地区
    messages, // 设置地区信息
  })

  export default i18n