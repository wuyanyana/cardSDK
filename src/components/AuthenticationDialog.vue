<template>
  <div v-if="visible" class="business-dialog-overlay">
    <div class="business-dialog-wrap">
      <div class="business-dialog-header business-mt30">
        确认呼叫
        <i class="close-icon" @click="handleCloseDislog"></i>
      </div>
      <div class="business-dialog-body business-mt30">
        <div>您即将呼叫智家工程师，并将{{mobile}}作为您和工程师的联系号码</div>
      </div>
      <div class="business-dialog-footer business-mt30" @click="handelConfirmCall">确认呼叫</div>
    </div>
  </div>
</template>

<script>
import { fetchGetData } from '@/utils/request'
export default {
  name: 'AuthenticationDialog',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    mobile: {
      type: String,
      default: ''
    }
  },
  methods: {
    /**
     * 确认呼叫
     */
    handelConfirmCall () {
      this.$emit('handelConfirmCall')
      // 调用接口记录授权
      this.record()
    },
    /**
     * 用户授权记录
     */
    record () {
      const params = {
        mobile: ''
      }
      // 先清除授权记录的缓存信息
      fetchGetData('/nrapigate/nrhall/broadband/business/queryBroadClearCard', params).then(res => {
        if (res.returnCode === '0' && res.data) {
          // 成功了缓存授权状态，用户不刷新页面情况下再次点击不需要弹授权弹窗
          sessionStorage.setItem('businees_engineerInfo_authStatus', 'isAuth')
        } else {
          console.log(res.returnMessage || '用户授权记录失败')
          sessionStorage.setItem('businees_engineerInfo_authStatus', 'isAuth')
        }
      }).catch(error => {
        console.log(error || '用户授权记录失败')
        sessionStorage.setItem('businees_engineerInfo_authStatus', 'isAuth')
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
.business-dialog-overlay {
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
  .business-dialog-wrap {
    width: 600px;
    height: 434px;
    background: #FFFFFF;
    border-radius: 24px;
    .business-mt30{
      margin-top: 30px;
    }
    .business-dialog-header{
      font-size: 40px;
      font-weight: bold;
      color: #000000;
      line-height: 56px;
      text-align: center;
      position: relative;
      .close-icon{
        width: 40px;
        height: 40px;
        background: url("http://activity.cmcc-cs.cn/chop/res/prd-ngmc1/product/item/9640124573304c92924988437b55a424.png");
        background-size: cover;
        position: absolute;
        top: 0;
        right: 15px;
      }
    }
    .business-dialog-body{
      padding: 0 30px;
      font-size: 32px;
      color: #000000;
      line-height: 44px;
      text-align: center;
    }
    .business-dialog-footer {
      border-top: 2px solid #DDD;
      padding-top: 30px;
      font-size: 32px;
      font-weight: bold;
      color: #007EFF;
      line-height: 36px;
      text-align: center;
    }
  }
}

</style>
