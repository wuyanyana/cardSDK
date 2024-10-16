<template>
<div>
  <template v-if="isLoading">
    <img src="http://activity.cmcc-cs.cn/chop/res/prd-ngmc1/product/product/06077159035a4e9a88469fa895113398.png" alt="" class="default-img" v-if="isLoading">
  </template>
  <template v-else>
    <div class="plugin-card" v-if="engineerInfo.realName">
      <div class="left">
        <img  class="avatar" :src="engineerInfo.photo || this.avatar" alt="Avatar" />
        <div class="tag">我的智家工程师</div>
      </div>
      <div class="right">
        <div class="top-wrap flex-between-center">
          <span class="name">{{ engineerInfo.realName }}</span>
          <div @click="gotoVoiceService" class="btn-wrap flex-between-center" v-if="isAppChannel"><i class="tel-icon"></i><span class="btn">联系工程师</span></div>
        </div>
        <div class="bottom-wrap flex-between-center">
          <div class="item">
              <div class="value">{{ engineerInfo.satisfaction }}分</div>
              <div class="label">服务满意度</div>
          </div>
          <div class="item">
              <div class="value">{{ engineerInfo.workYear }}年</div>
              <div class="label">工作经验</div>
          </div>
          <div class="item" v-if="engineerInfo.starLevel">
              <div class="star-backgroud">
                <div class="star-rating" >
                  <i class="star-icon" v-for="(_, index) in starLevels" :key="index"></i>
                </div>
              </div>
              <div class="label">星级</div>
          </div>
        </div>
      </div>
    </div>
  </template>
  <!-- 非工作时间的弹窗展示 -->
  <NonWorkingDialog :visible.sync="showDialog" />
</div>

</template>
<script>
import NonWorkingDialog from './NonWorkingDialog.vue'
import { isApp } from '@/utils/tool'
import { fetchGetData } from '@/utils/request'
export default {
  name: 'CardView',
  props: {
    telephone: String, // 加密手机号
    broadbandNum: String, // 加密宽带号
    sceneEntry: String, // 音频场景值
    appId: String, // 区分调用方，依据调用方分配不同的 appId
    onError: Function // 工程师获取失败后调用此方法
  },
  components: { NonWorkingDialog },
  data () {
    return {
      engineerInfo: {}, // 工程师信息
      isLoading: false, // 展示占位图
      avatar: 'http://activity.cmcc-cs.cn/chop/res/prd-ngmc1/product/product/3f02b979a58d4cc89e92d21f779ba320.png', // 默认头像
      showDialog: false, // 星级样式，默认展示灰色星星背景
      starLevels: [], // 星级转换
      isAppChannel: isApp() // 是否是App渠道
    }
  },
  created () {
    if (this.telephone && this.broadbandNum) {
      this.initData()
    } else {
      this.engineerInfo = {}
      this.onError && this.onError('手机号和宽带号不能为空')
    }
  },
  methods: {
    /**
     * @method 查询工程师信息接口
     * @params telephone-加密的手机号，broadbandNum-加密的宽带账号， appId-依据调用方分配不同的appId
     */
    initData () {
      this.isLoading = true
      const params = {
        telephone: this.telephone,
        broadbandNum: this.broadbandNum,
        appId: this.appId,
        sceneEntry: this.sceneEntry
      }
      try {
        fetchGetData('/nrapigate/nrhall/broadband/business/queryBroadClearCard', params).then(res => {
          if (res.returnCode === '0' && res.data) {
            this.engineerInfo = res.data
            // 星级展示处理
            if (res.data.starLevel) {
              this.updateRating(res.data.starLevel)
            }
          } else {
            this.engineerInfo = {}
            this.onError && this.onError(res.returnMessage || '未获取到工程师信息')
          }
        }).catch(error => {
          console.log('获取工程师信息失败')
          this.engineerInfo = {}
          this.onError && this.onError(error)
        }).finally(() => {
          this.isLoading = false
        })
      } catch (error) {
        this.onError && this.onError(error)
      }
    },

    /**
     * 星级展示
     */
    updateRating (rating) {
      try {
        this.starLevels = Array(Number(rating)).fill(null)
      } catch (error) {
        console.log('Array(Number(rating)).fill(null)编译失败')
      }
    },
    /**
     * 点击联系工程师按钮调起音频拨打电话
     */
    gotoVoiceService () {
      this.sensorsTrack('ButtonClick', { button_name: '联系工程师' })
      try {
        // 获取当前时间
        const now = new Date()
        const hours = now.getHours() // 获取当前小时
        if (hours >= 8 && hours < 20) {
          // 在APP内呼叫工程师音频
          if (window) {
            console.log('满足唤起音频条件')
            // 呼叫工程师音频独有参数
            const ext = {
              engMode: true,
              engPhoto: this.avatar,
              engRefer: `智家工程师${this.engineerInfo.realName}`
            }
            // 基础参数
            const param = {
              debug: false,
              type: '0', // 音视频类型，0是音频客服，1是视频客服
              useOneScreen: false, // 是否使用同屏，true 表示使用同屏 ，false表示非同屏，默认传true
              useGonetoneUserFlag: false, // 是否使用全球通用户专属视觉页面，如果传true，需先自行校验是全球通用户，默认传false
              voiceCallUseOnline: false, // 是否走热线混排，看该省份该渠道是否支持， 默认情况下传false
              appKey: 'jtztty_sdk#ZH46048899506', // 渠道申请的AppKey
              companyId: 'jtztty_sdk', // 对应appkey #号前的内容
              sceneEntry: this.sceneEntry, // 场景值，需要产品分配，联系在线本部 王乐（18703666930）、黄宇（13526430307）配置
              guideVideoNumber: '0', // 视频引导页展示次数，配置规则：如果不配置默认是展示3次，如果配置“0”默认引导页不展示，如果配置大于等于999，引导页会一直显示，如果，配置1-998，那么会根据配置的次数进行展示
              guideVoiceNumber: '0', // 音频引导页展示次数，配置规则同视频引导页
              ext
            }
            console.log('调起音频的参数', param)
            window.cmcc.startVoipVoiceOrVideo(param)
          } else {
            console.log('不满足在APP内且window.cmcc存在')
          }
        } else {
          // 不在工作时间内，弹窗提示
          console.log('非工作时间')
          this.showDialog = true
          this.sensorsTrack('PopExposure', { window_name: '工作时间弹窗' })
        }
      } catch (e) {
        console.log('唤起音频出错了')
      }
    },
    /**
     * 神策埋点
     */
    sensorsTrack (type, param) {
      try {
        this.$engineerSensors.track(type, {
          first_channel: '30011',
          serv_number: this.telephone,
          visit_source: this.sceneEntry,
          visit_sid: this.appId,
          button_type: '智家工程师卡片',
          ...param
        })
      } catch (error) {
        console.log('智家工程师埋点异常')
      }
    }
  }
}
</script>

<style scoped lang="less">
.default-img{
  width: 690px;
  height: 210px;
  margin: 0 auto;
}
.flex-between-center{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.plugin-card {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: linear-gradient( 181deg, #D5EAFF 0%, #FFFFFF 41%);
  border-radius: 18px;
  padding: 24px 30px 30px;
  display: flex;
  justify-content: space-between;
  .left {
    width: 154px;
    height: 145px;
    margin-top: 11px;
    position: relative;
    text-align: center;
    .avatar {
      width: 140px;
      height: 140px;
      border-radius: 50%;
    }
    .tag {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 34px;
      background: linear-gradient( 270deg, #7B5424 0%, #000000 100%);
      border-radius: 10px;
      align-content: center;
      font-size: 20px;
      color: #FFFFFF;
      line-height: 34px;
      text-align: center;
    }
  }
  .right{
    margin-left: 36px;
    flex: 1;
    .top-wrap {
      .name{
        flex: 1;
        height: 44px;
        font-size: 30px;
        font-weight: 500;
        color: #000000;
        line-height: 44px;
        overflow: hidden;
        word-break: break-all;
      }
      .btn-wrap{
        width: 194px;
        height: 56px;
        background: linear-gradient( 270deg, #54CCFF 0%, #007EFF 100%);
        border-radius: 90px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 4px;
        .tel-icon{
          width: 26px;
          height: 26px;
          background: url('http://activity.cmcc-cs.cn/chop/res/prd-ngmc1/product/product/f8736e2f97a4492c882fe9e20e1bf773.png') no-repeat 0 0;
          background-size: cover;
        }
        .btn{
          margin-left: 12px;
          font-size: 24px;
          font-weight: bold;
          color: #FFFFFF;
        }
      }
    }
    .bottom-wrap{
      margin-top: 30px;
      .item{
        text-align: center;
        .value{
          font-size: 24px;
          font-weight: bold;
          color: #000000;
          line-height: 32px;
        }
        .label{
          padding-top: 6px;
          font-size: 20px;
          color: #999999;
          line-height: 32px;
        }
        .star-backgroud{
          width: 145px;
          height: 28px;
          margin: 2px 0;
          background: url('http://activity.cmcc-cs.cn/chop/res/prd-ngmc1/product/product/733c917d9adf405d961df46687bfde05.png') no-repeat 0 0;
          background-size: cover;
          position: relative;
          overflow: hidden;
        }
        .star-rating {
          position: absolute;
          top: 0;
          left: 0;
          width: 145px;
          height: 28px;
          display: flex;
          .star-icon{
            width: 29px;
            height: 29px;
            background: url('http://activity.cmcc-cs.cn/chop/res/prd-ngmc1/product/product/f9912ada937744e1b9d2ad7a31bf6b87.png') no-repeat 0 0;
            background-size: cover;
          }
        }
      }
    }
  }
}
</style>
