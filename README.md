### 页面调用的插件例子
```html
<!-- 这是h5页面 -->
<!-- plugin-wrap是插件的容器,可设置外边距 -->
<div class="plugin-wrap">
  <div id="pluginId"></div>
</div>
```
```js
// 根据项目场景引入插件调用方法渲染卡片
let script = document.createElement('script');
script.type = 'text/javascript';
script.onload = () => {
    cmeb_engineer.init('#pluginId', {
        telephone: "********", // 用户手机号码（加密）
        broadbandNum: "********", // 宽带账号（加密）
        sceneEntry: "xxx", // 音频客服的场景值
        appId: "xxx", // 区分省侧调用，依据调用方分配不同的 appId
        onError: (error) => {
          console.log('查询工程师信息失败了', error)
          // 这里可以处理失败后h5页面上插件容器的外层样式或者控制DOM节点是否展示
        }
    });
};
script.src = 'https://wx.10086.cn/website/businessPlatform/js/sdk/cmeb_engineer.js';
document.getElementsByTagName('head')[0].appendChild(script);
```

### 启动与命令
```bash
#启动调试
npm run serve
#打包插件
npm run build
```

