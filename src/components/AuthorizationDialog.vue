<template>
  <div v-if="visible" class="business-authDialog-overlay">
    <div class="business-authDialog-wrap">
      <i class="close-icon" @click="handleCloseDislog"></i>
      <div class="business-authDialog-header">
        确认呼叫
      </div>
      <div class="business-authDialog-body">
        <div>您即将呼叫智家工程师，并将{{desMobile}}作为您和工程师的联系号码</div>
      </div>
      <div class="business-authDialog-footer" @click="handelConfirmCall">确认呼叫</div>
    </div>
  </div>
</template>

<script>
import { fetchGetData } from '@/utils/request'
export default {
  name: 'AuthorizationDialog',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    telephone: {
      type: String,
      default: ''
    },
    appId: {
      type: String,
      default: ''
    },
    desMobile: {
      type: String,
      default: '您的手机号'
    }
  },
  methods: {
    /**
     * 确认呼叫
     */
    handelConfirmCall () {
      // 调用接口记录授权
      this.saveUserAuthorize()
      // 呼叫音频
      this.$emit('handelConfirmCall')
      // 关闭弹窗
      this.handleCloseDislog()
    },
    /**
     * 用户授权记录
     */
    saveUserAuthorize () {
      if (!this.telephone || !this.appId) return
      const params = {
        telephone: this.telephone,
        appId: this.appId
      }
      fetchGetData('/nrapigate/nrhall/broadband/business/saveUserAuthorize', params).then(res => {
        if (res.returnCode === '0') {
          console.log('用户授权记录成功')
        } else {
          console.log(res.returnMessage || '用户授权记录失败')
        }
      }).catch(error => {
        console.log(error || '用户授权记录失败')
      }).finally(() => {
        // 授权成功或者失败，都缓存已授权状态，用户不刷新页面情况下再次点击不需要弹授权弹窗
        sessionStorage.setItem('businees_engineerInfo_authStatus', 'isAuthorize')
      })
    },
    /**
     * 关闭弹窗
     */
    handleCloseDislog () {
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style scoped lang="less">
.business-authDialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99999;
  .business-authDialog-wrap {
    width: 600px;
    background: #FFFFFF;
    border-radius: 24px;
    padding: 30px 0;
    position: relative;
    .close-icon{
      width: 40px;
      height: 40px;
      background: url("http://activity.cmcc-cs.cn/chop/res/prd-ngmc1/product/product/2d0e3cb3f25e4113af2dd368532f3b35.png");
      background-size: cover;
      position: absolute;
      top: 18px;
      right: 18px;
    }
    .business-mt48{
      margin-top: 48px;
    }
    .business-authDialog-header{
      font-size: 40px;
      font-weight: bold;
      color: #000000;
      line-height: 56px;
      text-align: center;
    }
    .business-authDialog-body{
      padding: 48px 30px 48px;
      font-size: 32px;
      color: #000000;
      line-height: 44px;
      text-align: center;
    }
    .business-authDialog-footer {
      width: 500px;
      height: 90px;
      margin: 0 auto;
      border-radius: 18px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #2892FF;
      font-size: 32px;
      font-weight: bold;
      color: #FFFFFF;
      line-height: 44px;
    }
  }
}

</style>
