<template>
  <div class="head">
    <div class="empty_blk"></div>
    <timer-input
      v-show="disAttr[0]"
      v-for="item in items"
      :key="item.id"
      :input-attr="item.inputAttr"
      :show-text="item.showText"
      :ref="item.inputAttr">
    </timer-input>
    <timer-button color="blue" @click="startUpTiming" id="countup" v-show="disAttr[1] === true">开始正计时 </timer-button>
    <timer-button color="blue" @click="startDownTiming" id="countdown" v-show="disAttr[2] === true">开始倒计时 </timer-button>
    <p class="info_text" id="hint" v-show="disAttr[3] === true">{{ hintText }}</p>
    <timer-button color="blue" @click="pauseTiming" id="pause" v-show="disAttr[4] === true">暂停计时器</timer-button>
    <timer-button color="blue" @click="resumeTiming" id="resume" v-show="disAttr[5] === true">恢复计时器</timer-button>
    <div class="empty_blk_right"></div>
    <timer-button color="yellow" position="right" @click="restartTiming" id="restart" v-show="disAttr[6] === true">重新再计时</timer-button>
    <timer-button color="red" position="right" @click="clearTiming" id="clear" v-show="disAttr[7] === true">清空计时器</timer-button>
  </div>
</template>

<script>
import TimerButton from './TimerButton'
import TimerInput from './TimerInput'
export default {
  name: 'TimerHeader',
  data: function () {
    return {
      disAttr: [true, true, true, false, false, false, false, false],
      test: 0,
      hintText: '',
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
      ],
      constDisAttr: [
        // !isStarted
        {
          boArr: [true, true, true, false, false, false, false, false],
          hintStr: ''
        },
        // isStarted && !isFinished
        { // isDownTiming, !isPaused
          boArr: [false, false, false, true, true, false, true, true],
          hintStr: '正在倒计时 '
        },
        { // isDownTiming, isPaused
          boArr: [false, false, false, true, false, true, true, true],
          hintStr: '暂停倒计时 '
        },
        { // !isDownTiming, !isPaused
          boArr: [false, false, false, true, true, false, true, true],
          hintStr: '正在正计时 '
        },
        { // !isDownTiming, isPaused
          boArr: [false, false, false, true, false, true, true, true],
          hintStr: '暂停正计时 '
        },
        // isFinished
        {
          // isDownTiming
          boArr: [false, false, false, true, false, false, true, true],
          hintStr: ['倒计时', '已结束']
        },
        {
          // !isDownTiming
          boArr: [false, false, false, true, false, false, true, true],
          hintStr: ['正计时', '已结束']
        }
      ]
    }
  },
  props: {
    keyboardUpTiming: {
      type: Boolean,
      defalut: true
    },
    isChangedDisplay: {
      type: Boolean,
      default: false
    },
    isStarted: {
      type: Boolean,
      default: false
    },
    isFinished: {
      type: Boolean,
      default: false
    },
    isDownTiming: Boolean,
    isPaused: Boolean,
    limitStr: {
      type: String,
      default: ''
    }
  },
  watch: {
    isChangedDisplay: {
      handler: function (val, oldVal) {
        console.log(this.isStarted, this.isFinished, this.isDownTiming, this.isPaused)
        if (!this.isStarted) {
          this.changeDisplay(0)
        } else {
          if (!this.isFinished) {
            if (this.isDownTiming) {
              if (!this.isPaused) this.changeDisplay(1)
              else this.changeDisplay(2)
            } else {
              if (!this.isPaused) this.changeDisplay(3)
              else this.changeDisplay(4)
            }
          } else {
            if (this.isDownTiming) this.changeDisplay(5)
            else this.changeDisplay(6)
          }
        }
      }
    },
    keyboardUpTiming: {
      handler: function (val) {
        console.log('KbdUpTiming Changed!')
        this.startUpTiming()
      }
    }
  },
  components: {
    TimerButton,
    TimerInput
  },
  methods: {
    updateTime: function () {
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
    },
    emitTiming: function (tmpStr) {
      this.$emit(
        tmpStr,
        Number(this.$refs.hour[0].test),
        Number(this.$refs.minute[0].test),
        Number(this.$refs.second[0].test))
      console.log(
        tmpStr,
        this.$refs.hour[0].test,
        this.$refs.minute[0].test,
        this.$refs.second[0].test)
    },
    startDownTiming: function () {
      this.emitTiming('start-down-timing')
    },
    startUpTiming: function () {
      this.emitTiming('start-up-timing')
    },
    pauseTiming: function () {
      this.$emit('pause-timing')
    },
    resumeTiming: function () {
      this.$emit('resume-timing')
    },
    restartTiming: function () {
      this.$emit('restart-timing')
    },
    clearTiming: function () {
      this.$emit('clear-timing')
    },
    changeDisplay: function (idx) {
      let tmpObj = this.constDisAttr[idx]
      if (idx < 5) this.hintText = tmpObj.hintStr + this.limitStr
      else this.hintText = [tmpObj.hintStr[0], this.limitStr, tmpObj.hintStr[1]].join(' ')
      this.disAttr = this.constDisAttr[idx].boArr
      console.log(this.hintText, this.disAttr, this.limitStr)
    }
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
  font-family: PT Mono, PingFang SC, sans-serif;
  display: inline-block;
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
