<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <timer-header
      @update-time="updateLimitTime">
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
      limitHour: 0,
      limitMinute: 0,
      limitSecond: 0,
      hour: 23,
      minute: 59,
      second: 59
    }
  },
  watch: {
    hour: function (val) {
      if (val === 1) {
        this.$emit('cao', 'aaaooee')
      }
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

      this.updateTime()
    },
    updateTime: function () {
      this.hour = this.limitHour
      this.minute = this.limitMinute
      this.second = this.limitSecond
    }
  }
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
