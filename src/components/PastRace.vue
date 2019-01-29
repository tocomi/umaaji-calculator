<template lang="pug">
  div.race(:class="{ rest: isRest }")
    span#grade(:class="[ grade ]") {{ race.grade }}
    span#name(:class="{ rest: isRest }") {{ race.name }}
    template(v-if="!isRest && !isExclusion")
      div#place_date
        span#place {{ race.place }}
        span#date {{ race.date }}
      div#cond_time
        span#condition {{ race.ground }}{{ race.distance }} {{ race.status }}
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
    margin: -10px 0 0 35px;
    padding: 2px 0 0 0;
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
    height: 22px;
    width: 120px;
    margin: -8px 0 0 -85px;
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
  #place_date {
    position: absolute;
    width: inherit;
    margin: 15px 0 0 -10px;
    border-bottom: 1px solid #DDD;
    font-size: 13px;
    #place {
      display: inline-block;
      width: 40px;
    }
    #date {
      display: inline-block;
      width: 60px;
    }
  }
  #cond_time {
    position: absolute;
    width: 170px;
    margin: 38px 0 0 -90px;
    font-size: 13px;
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
    margin: 70px 0 0 -25px;
    width: 50px;
    font-weight: bold;
  }
}
</style>
