<template>
  <div class="clock_div">
    <p id="time" class="time"> {{ clockStr }} </p>
  </div>
</template>

<script>
export default {
  name: 'TimerBody',
  props: {
    clockStr: {
      type: String,
      default: '00:00:00'
    }
  }
}
</script>

<style scoped>
.clock_div {
  background-color: #f2f4f7;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  font-family: PTMono-Bold, 'PT Mono', sans-serif;
  font-weight: bold;
  height: 440px;
  margin: 0;
  position: absolute;

  /* padding: 127px 130px 113px 131px; */
  text-align: center;
  width: 1220px;
}

.time {
  color: #333;
  font-size: 200px;
  height: 224px;
  margin: 115px 130px 101px 131px;
}
</style>
