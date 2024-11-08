<template>
<div>
 <div id="app" class="plugin-wrap" v-if="isSow">
      <div id="pluginId"></div>
      <div id="pluginId2"></div>
      <div id="pluginId3"></div>
      <!-- <button class="btn1" @click="change">切换</button> -->
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
      telephone: 'PfZWEqCxR6ToXk/P404dKZWqhQFSbyWnd1ugy+1IPR9H03jUGOGNNUV11x2uveC63GQbFJXL09OC+cbdSLGUXDpyWjsjL/JyvzKOQppsaWDy0CKTcK5vgyufCaDUdA3s7BsZMeZcEM2b0OFcGIL/87nHOykSArIFEAJibqxPdGU=',
      broadbandNum: 'PfZWEqCxR6ToXk/P404dKZWqhQFSbyWnd1ugy+1IPR9H03jUGOGNNUV11x2uveC63GQbFJXL09OC+cbdSLGUXDpyWjsjL/JyvzKOQppsaWDy0CKTcK5vgyufCaDUdA3s7BsZMeZcEM2b0OFcGIL/87nHOykSArIFEAJibqxPdGU=',
      appId: 'BROBAND_ENGINEER_HA',
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
        appId: 'BROBAND_ENGINEER_HA',
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
