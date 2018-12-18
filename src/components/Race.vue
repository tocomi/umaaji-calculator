<template lang="pug">
  div.race(:class="{ rest: isRest }")
    span#grade(:class="[ grade ]") {{ race.grade }}
    span#name(:class="{ rest: isRest }") {{ race.name }}
    span#condition {{ race.ground }} {{ race.distance }} {{ race.status }}
    span#time {{ race.time }} {{ diff }}
    span#score {{ score }}
</template>

<script>
import Calculator from '../lib/UmaajiCalculator.js'

export default {
  props: {
    race: Object,
  },
  data() {
    return {
      score: 0,
    }
  },
  created() {
    if (this.isRest) {
      score = 0
      return
    }
    const calculator = new Calculator();
    this.score = calculator.calculateOneRace(this.race);
  },
  computed: {
    diff() {
      if (this.race.diff) {
        return '(' + this.race.diff + ')'
      }
      return ''
    },
    isRest() {
      return this.race.name.includes('休養')
    },
    grade() {
      if (this.race.grade) {
        return this.race.grade
      }
      return 'rest'
    }
  }
}
</script>

<style lang="scss" scoped>
.race {
  float: left;
  width: 130px;
  height: 100px;
  padding: 10px;
  border: solid 1px #AAA;
  &.rest {
    background-color: #EEE;
  }
  #grade {
    position: absolute;
    margin-top: -10px;
    margin-left: 25px;
    height: 25px;
    width: 50px;
    background: #888;
    color: #EEE;
    &.G1 {
      background: #BF382A;
      font-weight: bold;
    }
    &.G2 {
      background: #2880BA;
      font-weight: bold;
    }
    &.G3 {
      background: #8E725E;
      font-weight: bold;
    }
    &.OP {
      background: #666;
    }
    &.rest {
      height: 0;
      width: 0;
    }
  }
  #name {
    position: absolute;
    margin-top: -10px;
    margin-left: -75px;
    width: 100px;
    color: #444;
    border-bottom: solid #666 1px;
    &.rest {
      position: relative;
      margin: 0;
      border: 0;
      background: none; 
    }
  }
  #condition {
    position: absolute;
    margin-top: 25px;
    margin-left: -38px;
  }
  #time {
    position: absolute;
    margin-top: 50px;
    margin-left: -40px;
  }
  #score {
    position: absolute;
    margin-top: 75px;
    margin-left: -25px;
    width: 50px;
    font-weight: bold;
  }
}
</style>
