<template lang="pug">
  div.race(:class="{ rest: isRest }")
    span#grade(:class="[ grade ]") {{ race.grade }}
    span#name(:class="{ rest: isRest }") {{ race.name }}
    div#cond_time
      span#condition {{ race.ground }}{{ race.distance }} {{ race.status }}
      span#time {{ race.time }} {{ diff }}
    span#score(v-if="!isRest && !isExclusion") {{ score }}
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
    if (this.isRest || this.isExclusion) {
      return
    }
    const calculator = new Calculator();
    this.score = calculator.calculateOneRace(this.race);
    this.$emit('addScore', this.score)
  },
  computed: {
    diff() {
      if (this.isRest || this.isExclusion) {
        return ''
      }
      return '(' + this.race.diff + ')'
    },
    isRest() {
      if (!this.race.name) {
        return true;
      }
      return this.race.name.includes('休養')
    },
    isExclusion() {
      return !this.race.time
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
  width: 170px;
  height: 105px;
  padding: 10px;
  border: solid 1px #AAA;
  &.rest {
    background-color: #EEE;
  }
  #grade {
    position: absolute;
    margin-top: -10px;
    margin-left: 35px;
    height: 24px;
    width: 50px;
    font-size: 14px;
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
    margin-top: -8px;
    margin-left: -85px;
    height: 22px;
    width: 120px;
    font-size: 13px;
    color: #444;
    border-bottom: solid #666 1px;
    &.rest {
      position: relative;
      margin: 0;
      border: 0;
      background: none; 
    }
  }
  #cond_time {
    position: absolute;
    width: 170px;
    margin-top: 15px;
    margin-left: -90px;
    #condition {
      position: absolute;
      margin-left: 5px;
    }
    #time {
      position: absolute;
      width: 90px;
      margin-left: 70px;
    }
  }
  #score {
    position: absolute;
    margin-top: 70px;
    margin-left: -25px;
    width: 50px;
    font-weight: bold;
  }
}
</style>
