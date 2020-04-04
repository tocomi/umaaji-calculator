<template lang="pug">
  div#entry(:class="[ gateClass]")
    div#gate {{ gate }}
    div#number {{ number }}
</template>

<script>
export default {
  props: {
    gate: String,
    number: String,
  },
  computed: {
    gateClass() {
      return 'gate' + this.gate;
    },
  },
};
</script>

<style lang="scss" scoped>
$height: 46px;
#entry {
  float: left;
  height: $height;
  line-height: $height;
  #gate, #number {
    float: left;
    height: $height - 0.5px;
    width: 20px;
    border: solid 1px #AAA;
  }
  &.gate2 {
    background-color: #111;
    color: #FFF;
  }
  &.gate3 {
    background-color: #D33;
    color: #FFF;
  }
  &.gate4 {
    background-color: #33D;
    color: #FFF;
  }
  &.gate5 {
    background-color: #EE3;
  }
  &.gate6 {
    background-color: #080;
    color: #FFF;
  }
  &.gate7 {
    background-color: #D80;
    color: #FFF;
  }
  &.gate8 {
    background-color: #FCD;
  }
}
</style>

