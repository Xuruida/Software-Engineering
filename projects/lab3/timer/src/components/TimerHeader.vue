<template>
  <div class="head">
    <timer-button color="blue" position="left" @plus-test="plusTest">测试 {{ test }} </timer-button>
    <timer-button color="red" position="right">测试二</timer-button>
  </div>
</template>

<script>
import TimerButton from './TimerButton'
export default {
  name: 'TimerHeader',
  data: function () {
    return {
      test: 0
    }
  },
  methods: {
    plusTest: function () {
      this.test += 1
      this.$emit('plus-hour')
    }
  },
  components: {
    TimerButton
  }
}
</script>

<style scoped>
.head {
  background-color: #97a5bc;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  font-family: PingFangSC-Regular, 'PingFang SC', sans-serif;
  font-size: 0;
  height: 70px;
  padding: 0;
  width: 1220px;
}
</style>
