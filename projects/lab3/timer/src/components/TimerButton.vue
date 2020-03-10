<template>
  <div>
    <button :class="'button ' + color" :style="'float: ' + position" @click="plusNumber"><slot></slot></button>
  </div>
</template>

<script>
import App from '@/App'
export default {
  name: 'Button',
  data: function () {
    return {
      test: App.data(),
      num: 0
    }
  },
  props: {
    color: String,
    position: String
  },
  methods: {
    plusNumber: function () {
      this.$emit('plus-test')
    }
  },
  component: App
}
</script>

<style scoped>
.button {
  border: none;
  border-radius: 5px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  color: #fff;
  font-family: PingFangSC-Regular, 'PingFang SC', sans-serif;
  font-size: 16px;
  font-weight: 300;
  margin: 15px 10px;
  text-align: center;
  padding: 9px;
}

.blue {
  background-color: #2188e9;
}

.red {
  background-color: #dd2e1d;
}

.yellow {
  background-color: #ffb020;
}
</style>
