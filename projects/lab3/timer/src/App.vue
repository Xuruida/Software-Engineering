<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <timer-header
      @update-time="updateLimitTime"
      @start-down-timing="startDownTiming"
      @start-up-timing="startUpTiming"
      @pause-timing="pauseTiming"
      @resume-timing="resumeTiming"
      @restart-timing="restartTiming"
      @clear-timing="clearTiming"
      :limit-str="limitStr"
      :is-started="isStarted"
      :is-finished="isFinished"
      :is-down-timing="isDownTiming"
      :is-paused="isPaused"
      :is-changed-display="isChangedDisplay">
    </timer-header>
    <!-- <router-view/> -->
    <timer-body :clock-str="clockStr">
    </timer-body>
  </div>
</template>

<script>
import TimerHeader from './components/TimerHeader'
import TimerButton from './components/TimerButton'
import TimerBody from './components/TimerBody'
export default {
  name: 'App',
  data: function () {
    return {
      limitStr: '',
      limitHour: 0,
      limitMinute: 0,
      limitSecond: 0,
      hour: 0,
      minute: 0,
      second: 0,
      remainningTime: 0,
      limitTime: 0,
      ms: 0,
      isStarted: false,
      isFinished: false,
      isDownTiming: true,
      isPaused: false,
      isChangedDisplay: false
    }
  },
  computed: {
    clockStr: function () {
      let strHour = this.hour.toString()
      let strMinute = this.minute.toString()
      let strSecond = this.second.toString()
      if (strHour < 10) strHour = '0' + strHour
      if (strMinute < 10) strMinute = '0' + strMinute
      if (strSecond < 10) strSecond = '0' + strSecond
      let clockStr = strHour + ':' + strMinute + ':' + strSecond
      return clockStr
    }
  },
  components: {
    TimerHeader,
    TimerButton,
    TimerBody
  },
  methods: {
    updateLimitTime: function (inputHour, inputMinute, inputSecond) {
      this.getInputInfo(inputHour, inputMinute, inputSecond)
      this.displayAttr[2] = false
      this.isChangedDisplay = !this.isChangedDisplay
      console.log('changed', this.change)
      this.updateTime()
    },

    updateTime: function () {
      const timeNow = Date.now()
      this.remainningTime = this.finishTime - timeNow
      const currentTime = this.limitTime - this.remainningTime
      if (this.remainningTime < 0) {
        clearInterval(timeObj)
        timeObj = null
        this.remainningTime = 0
        this.changeDisplay(true, true, this.isDownTiming, false)
      }
      if (this.isDownTiming) {
        const tmpArr = calcHMS(this.remainningTime)
        this.hour = tmpArr[0]
        this.minute = tmpArr[1]
        this.second = tmpArr[2]
        this.ms = tmpArr[3]
      } else {
        const tmpArr = calcHMS(currentTime)
        this.hour = tmpArr[0]
        this.minute = tmpArr[1]
        this.second = tmpArr[2]
        this.ms = tmpArr[3]
      }
    },

    getInputInfo: function (inputHour, inputMinute, inputSecond) {
      if (isNaN(inputHour)) inputHour = 0
      if (inputHour > 99) inputHour = 99
      else if (inputHour < 0) inputHour = 0
      this.limitHour = inputHour

      if (isNaN(inputMinute)) inputMinute = 0
      if (inputMinute > 59) inputMinute = 59
      else if (inputMinute < 0) inputMinute = 0
      this.limitMinute = inputMinute

      if (isNaN(inputSecond)) inputSecond = 0
      if (inputSecond > 59) inputSecond = 59
      else if (inputSecond < 0) inputSecond = 0
      this.limitSecond = inputSecond

      let strHour = this.limitHour.toString()
      let strMinute = this.limitMinute.toString()
      let strSecond = this.limitSecond.toString()
      if (strHour < 10) strHour = '0' + strHour
      if (strMinute < 10) strMinute = '0' + strMinute
      if (strSecond < 10) strSecond = '0' + strSecond
      this.limitStr = strHour + ':' + strMinute + ':' + strSecond

      this.ms = 0
      this.remainningTime = this.limitTime =
        calcMs(this.limitHour, this.limitMinute, this.limitSecond, this.ms)

      this.finishTime = Date.now() + this.limitTime
      console.log(Date.now(), this.finishTime, this.limitTime)
    },

    changeDisplay: function (boSt, boFi, boDo, boPa) {
      this.isStarted = boSt
      this.isFinished = boFi
      this.isDownTiming = boDo
      this.isPaused = boPa
      this.isChangedDisplay = !this.isChangedDisplay
    },

    startDownTiming: function (inputHour, inputMinute, inputSecond) {
      // initialize
      if (timeObj === null) {
        this.changeDisplay(true, false, true, false)
        this.getInputInfo(inputHour, inputMinute, inputSecond)
        setTimeout(() => {
          this.updateTime()
          timeObj = setInterval(this.updateTime, INTERVAL)
        }, 1)
      }
    },

    startUpTiming: function (inputHour, inputMinute, inputSecond) {
      // initialize
      if (timeObj === null) {
        this.changeDisplay(true, false, false, false)
        this.getInputInfo(inputHour, inputMinute, inputSecond)
        setTimeout(() => {
          this.updateTime()
          timeObj = setInterval(this.updateTime, INTERVAL)
        }, 1)
      }
    },

    pauseTiming: function () {
      if (timeObj !== null) {
        this.changeDisplay(true, false, this.isDownTiming, true)
        clearInterval(timeObj)
        timeObj = null
      }
    },

    resumeTiming: function () {
      if (timeObj === null) {
        this.changeDisplay(true, false, this.isDownTiming, false)
        this.finishTime = this.remainningTime + Date.now()
        timeObj = setInterval(this.updateTime, INTERVAL)
      }
    },

    restartTiming: function () {
      if (timeObj !== null) {
        clearInterval(timeObj)
        timeObj = null
      }
      this.changeDisplay(true, false, this.isDownTiming, false)
      this.finishTime = this.limitTime + Date.now()
      setTimeout(() => {
        this.updateTime()
        timeObj = setInterval(this.updateTime, INTERVAL)
      }, 1)
    },

    clearTiming: function () {
      if (timeObj !== null) {
        clearInterval(timeObj)
        timeObj = null
      }
      this.changeDisplay(false, false, true, false)
      this.hour = this.minute = this.second = this.ms = 0
    }
  }
}
let timeObj = null
const INTERVAL = 50
function calcMs (hr, min, sec, ms) {
  const tmpTime = 1000 * (60 * (60 * hr + min) + sec) + ms
  return tmpTime
}

function calcHMS (tmpTime) {
  const arr = new Array(4)
  arr[3] = tmpTime % 1000
  tmpTime = parseInt(tmpTime / 1000)
  arr[2] = tmpTime % 60
  tmpTime = parseInt(tmpTime / 60)
  arr[1] = tmpTime % 60
  arr[0] = parseInt(tmpTime / 60)
  console.log(arr)
  return arr
}
</script>

<style>
#app {
  margin: 0;
}

body {
  margin: 0;
}
</style>
