<template>
  <div class="input_div">
    <input type="text"
      :id="inputAttr"
      v-model="test"
      class="input_box">
    <p class="input_text">{{ showText }}</p>
  </div>
</template>

<script>
export default {
  name: 'TimerInput',
  data: function () {
    return {
      test: 0
    }
  },
  props: {
    inputAttr: String,
    showText: String
  }
}
</script>

<style scoped>
.input_div {
  background-color: #fff;
  border: none;
  border-radius: 5px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  display: inline-block;
  font-size: 16px;
  font-weight: 300;
  height: 40px;
  margin: 15px 10px;
  padding: 0;
  width: 70px;
}

.input_box {
  border: none;
  color: #afafaf;
  font-family: PingFangSC-Regular, 'PingFang SC', sans-serif;
  font-size: 16px;
  font-weight: 300;
  height: 22px;
  margin: 9px 0 9px 9px;
  padding: 0;
  width: 32px;
}

.input_text {
  color: #222;
  float: right;
  margin: 9px 9px 9px 0;
}
</style>
