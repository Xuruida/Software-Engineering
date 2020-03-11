<template>
  <div class="head">
    <div class="empty_blk"></div>
    <timer-input
      v-show="isTiming === false"
      v-for="item in items"
      :key="item.id"
      :input-attr="item.inputAttr"
      :show-text="item.showText"
      :ref="item.inputAttr">
    </timer-input>
    <timer-button color="blue" @click="updateTime" v-show="isTiming === false">开始正计时 </timer-button>
    <timer-button color="blue" @click="updateTime" v-show="isTiming === false">开始倒计时 </timer-button>
    <p class="info_text" id="hint" v-show="isTiming === true">test</p>
    <timer-button color="blue" @click="updateTime" v-show="isTiming === true">暂停计时器</timer-button>
    <timer-button color="yellow" position="right" v-show="isTiming === true">重新再计时</timer-button>
    <timer-button color="red" position="right" v-show="isTiming === true">清空计时器</timer-button>
  </div>
</template>

<script>
import TimerButton from './TimerButton'
import TimerInput from './TimerInput'
export default {
  name: 'TimerHeader',
  data: function () {
    return {
      test: 0,
      isTiming: false,
      items: [
        {
          id: 1,
          inputAttr: 'hour',
          showText: '时'
        },
        {
          id: 2,
          inputAttr: 'minute',
          showText: '分'
        },
        {
          id: 3,
          inputAttr: 'second',
          showText: '秒'
        }
      ]
    }
  },
  methods: {
    updateTime: function () {
      this.$on('cao', 'alert("I did it.")')
      this.$emit(
        'update-time',
        Number(this.$refs.hour[0].test),
        Number(this.$refs.minute[0].test),
        Number(this.$refs.second[0].test))
      console.log(
        'update-time',
        this.$refs.hour[0].test,
        this.$refs.minute[0].test,
        this.$refs.second[0].test)
    }
  },
  components: {
    TimerButton,
    TimerInput
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

.info_text {
  color: #fff;
  display: none;
  font-family: PT Mono, PingFang SC, sans-serif;
  font-size: 16px;
  margin: 24px 10px;
}
.empty_blk {
  display: inline-block;
  height: 0;
  margin: 15px 10px;
  width: 10px;
}

.empty_blk_right {
  float: right;
  height: 0;
  margin: 15px 10px;
  width: 10px;
}

</style>
