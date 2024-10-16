<template>
  <div v-if="visible" class="dialog-overlay">
    <div class="dialog">
      <div class="dialog-header mt30">温馨提示</div>
      <div class="dialog-body mt30">
        <div>工程师工作时间为</div>
        <div>08:00-20:00</div>
      </div>
      <div class="dialog-footer mt30" @click="closeDialog">我知道了</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NonWorkingDialog',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    closeDialog () {
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style scoped>
.dialog-overlay {
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
}

.dialog {
  width: 600px;
  height: 330px;
  background: #FFFFFF;
  border-radius: 24px;
}
.mt30{
  margin-top: 30px;
}
.dialog-header{
  font-size: 40px;
  font-weight: bold;
  color: #000000;
  line-height: 56px;
  text-align: center;
}
.dialog-body{
  font-size: 32px;
  color: #000000;
  line-height: 44px;
  text-align: center;
}
.dialog-footer {
  border-top: 2px solid #DDD;
  padding-top: 30px;
  font-size: 32px;
  font-weight: bold;
  color: #007EFF;
  line-height: 36px;
  text-align: center;
}

</style>
