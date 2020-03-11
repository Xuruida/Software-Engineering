<template>
  <div class="button_div">
    <button
      :class="'button ' + color"
      :style="'float: ' + position"
      @click="updateTime">
      <slot></slot>
    </button>
  </div>
</template>

<script>
export default {
  name: 'Button',
  data: function () {
    return {
    }
  },
  props: {
    color: String,
    position: String
  },
  methods: {
    updateTime: function () {
      this.$emit('click')
    }
  }
}
</script>

<style scoped>
.button_div {
  display: inline;
}

.button {
  border: none;
  border-radius: 5px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  color: #fff;
  display: inline-block;
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
