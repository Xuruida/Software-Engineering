<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <timer-header @plus-hour="plusHour">
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
      hour: 23,
      minute: 59,
      second: 59
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
    plusHour: function () {
      this.hour += 1
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
