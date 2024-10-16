<template>
<div>
 <div id="app" class="plugin-wrap" v-if="isSow">
      <div id="pluginId"></div>
      <div id="pluginId2"></div>
      <div id="pluginId3"></div>
      <button class="btn1" @click="change">切换</button>
  </div>
</div>

</template>

<script>
import _cmebEngineer from '@/plugins/engineer/main'

export default {
  name: 'App',
  data () {
    return {
      isSow: true
    }
  },
  mounted () {
    _cmebEngineer.init('#pluginId', {
      telephone: 'MF2UsXWry6cqmDfhPUJ/V3wRko6bw19pw5G5V/CHirk126fGpqxBLf0EMAwRW1flXWZvTkLQ4bGNCCefKPjMlhHiQGwSWu4dTM8xZdiNmbFUT2RGacIBOEBdfPobdOd0ogRvC4I2E1DXGhDnNG5YF1ghTzkZHDszSk/8+RkC9UI=',
      broadbandNum: 'MF2UsXWry6cqmDfhPUJ/V3wRko6bw19pw5G5V/CHirk126fGpqxBLf0EMAwRW1flXWZvTkLQ4bGNCCefKPjMlhHiQGwSWu4dTM8xZdiNmbFUT2RGacIBOEBdfPobdOd0ogRvC4I2E1DXGhDnNG5YF1ghTzkZHDszSk/8+RkC9UI=',
      appId: 'BROBAND_ENGINEER_APP',
      sceneEntry: '843',
      onError: (error) => {
        console.log('查询工程师信息失败了', error)
        // 此处可处理工程师获取失败后的逻辑，比如删除插件容器或去掉容器的外间距及其他逻辑
      }
    })
    _cmebEngineer.init('#pluginId2', {
      telephone: 'MF2UsXWry6cqmDfhPUJ/V3wRko6bw19pw5G5V/CHirk126fGpqxBLf0EMAwRW1flXWZvTkLQ4bGNCCefKPjMlhHiQGwSWu4dTM8xZdiNmbFUT2RGacIBOEBdfPobdOd0ogRvC4I2E1DXGhDnNG5YF1ghTzkZHDszSk/8+RkC9UI=',
      broadbandNum: 'MF2UsXWry6cqmDfhPUJ/V3wRko6bw19pw5G5V/CHirk126fGpqxBLf0EMAwRW1flXWZvTkLQ4bGNCCefKPjMlhHiQGwSWu4dTM8xZdiNmbFUT2RGacIBOEBdfPobdOd0ogRvC4I2E1DXGhDnNG5YF1ghTzkZHDszSk/8+RkC9UI=',
      appId: 'BROBAND_ENGINEER_APP',
      sceneEntry: '843',
      onError: (error) => {
        console.log('查询工程师信息失败了', error)
        // 此处可处理工程师获取失败后的逻辑，比如删除插件容器或去掉容器的外间距及其他逻辑
      }
    })
    _cmebEngineer.init('#pluginId3', {
      telephone: 'F6XB5IpR9t2UezqrwYvYOukxt4ZOfqmuJQZ5fcIaHkItv15YzwsFSuKIWe4dDAPTZsIzAxtJPMe5s0yCkB8p+eo0PlN0GMyCEKdIvtHB1qyHZbuzLFXVEKBjyPRTVp7PQlHgqOZrddBF3+k9NtCewiGeDXLbNmW2b4z8gNvK6ac=',
      broadbandNum: 'F6XB5IpR9t2UezqrwYvYOukxt4ZOfqmuJQZ5fcIaHkItv15YzwsFSuKIWe4dDAPTZsIzAxtJPMe5s0yCkB8p+eo0PlN0GMyCEKdIvtHB1qyHZbuzLFXVEKBjyPRTVp7PQlHgqOZrddBF3+k9NtCewiGeDXLbNmW2b4z8gNvK6ac=',
      appId: 'BROBAND_ENGINEER_APP',
      sceneEntry: '843',
      onError: (error) => {
        console.log('查询工程师信息失败了', error)
        // 此处可处理工程师获取失败后的逻辑，比如删除插件容器或去掉容器的外间距及其他逻辑
      }
    })
  },
  methods: {
    change () {
      _cmebEngineer.init('#pluginId', {
        telephone: 'F6XB5IpR9t2UezqrwYvYOukxt4ZOfqmuJQZ5fcIaHkItv15YzwsFSuKIWe4dDAPTZsIzAxtJPMe5s0yCkB8p+eo0PlN0GMyCEKdIvtHB1qyHZbuzLFXVEKBjyPRTVp7PQlHgqOZrddBF3+k9NtCewiGeDXLbNmW2b4z8gNvK6ac=',
        broadbandNum: 'F6XB5IpR9t2UezqrwYvYOukxt4ZOfqmuJQZ5fcIaHkItv15YzwsFSuKIWe4dDAPTZsIzAxtJPMe5s0yCkB8p+eo0PlN0GMyCEKdIvtHB1qyHZbuzLFXVEKBjyPRTVp7PQlHgqOZrddBF3+k9NtCewiGeDXLbNmW2b4z8gNvK6ac=',
        appId: 'BROBAND_ENGINEER_APP',
        sceneEntry: '843',
        onError: (error) => {
          console.log('查询工程师信息失败了', error)
        // 此处可处理工程师获取失败后的逻辑，比如删除插件容器或去掉容器的外间距及其他逻辑
        }
      })
    }
  }
}
</script>

<style>
html,body{
  padding: 0;
  margin: 0 !important;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.plugin-wrap{
  padding: 20px 30px;
}
.btn1{
  width: 300px;
  height: 100px;
  background: linear-gradient( 270deg, #54CCFF 0%, #007EFF 100%);
  border: none;
  border-radius: 20px;
  color: #ffffff;
}
</style>
