import Vue from 'vue'
import CardView from '@/components/CardView.vue'
import engineerSensors from '@/sdk/sensorsdata.es6.js'
import { uuid, sessionId } from '@/utils/tool'

engineerSensors.init({
  server_url: 'https://sensorsdata.cmcc-cs.cn:8105/sa?project=xds', // 数据上报地址 必填 @Platform All
  web_url: 'http://csap.cmos.cmcc/sa?project=xds',
  show_log: false, // 日志打印  @Platform All
  is_track_single_page: false, // 单页面配置，默认开启，若页面中有锚点设计，需要将该配置删除，否则触发锚点会多触发 $pageview 事件
  name: 'sensors', // 参考小程序文档 @Platform 小程序
  preset_properties: {
    url: true,
    title: true
  }
})
engineerSensors.registerPage({
  rowid: function () {
    return uuid()
  },
  session_id: function () {
    return sessionId()
  }
})
Vue.config.productionTip = false
Vue.prototype.$engineerSensors = engineerSensors

let pluginOptions = {}
// 捕获异常
Vue.config.errorHandler = (err, vm, info) => {
  const { onError } = pluginOptions
  if (onError && typeof onError === 'function') {
    onError(err, vm, info)
  }
  console.log('errorCaptured', err, vm, info)
}

const _cmebEngineer = {
  init (element, options) {
    pluginOptions = options
    const parentDom = document.querySelector(element)
    if (!parentDom) {
      console.error('缺少dom元素')
      return
    }
    if (!options.telephone || !options.broadbandNum) {
      console.error('手机号和宽带号不能为空')
      return
    }
    // 如果当前节点下有插件清空插件内容
    parentDom.innerHTML = ''
    // 定义唯一的节点，兼容同时调用多次
    const el = element.slice(1)
    const uniqueId = `cmeb-engineer-${el}`

    this.buildDom(parentDom, uniqueId)
    // 创建一个子类的构造函数
    const CardViewConstructor = Vue.extend({
      ...CardView
    })
    // 使用之类的构造函数创建实例，进行传参
    new CardViewConstructor({
      propsData: options
    }).$mount(`#${uniqueId}`)
  },
  // 创建一个实例挂载的div，插入到h5页面节点
  buildDom (parent, uniqueId) {
    const div = document.createElement('div')
    div.setAttribute('id', uniqueId)
    parent.append(div)
  }
}

export default _cmebEngineer
