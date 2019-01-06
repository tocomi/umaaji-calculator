<template lang="pug">
  div.horse
    div#entry(:class="[ 'gate' + horse.gate ]")
      div#gate {{ horse.gate }}
      div#number {{ horse.number }}
    div#info
      div#name {{ horse.name }} {{ horse.sex}}{{ horse.age }}
      div#race
        span#jockey {{ horse.jockey }}
        span#handi {{ horse.handi }} 
      div#favorite
        span#odds {{ horse.odds }} 
        span#rank {{ rank }}
      span#score AVG: {{ average }} MAX: {{ max }}
    PastRace(v-for="(race, index) in horse.past_races" :key="index" :race="race" @addScore="addScore")
</template>

<script>
import PastRace from './PastRace.vue'

export default {
  props: {
    horse: Object,
  },
  data() {
    return {
      score: 0,
      count: 0,
      max: 0,
    }
  },
  computed: {
    average() {
      return Math.round(this.score / this.count * 10) / 10
    },
    rank() {
      if (this.horse.rank) {
        return '(' + this.horse.rank + ')'
      }
      return ''
    }
  },
  methods: {
    addScore(raceScore) {
      this.score += raceScore
      this.count++
      if (raceScore > this.max) {
        this.max = raceScore
      }
      this.$emit('setScore', this.horse, this.average, this.max)
    }
  },
  components: {
    PastRace: PastRace,
  }
}
</script>

<style lang="scss" scoped>
$height: 105px;
.horse {
  height: $height + 1px;
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
  #info {
    float: left;
    width: 180px;
    height: $height;
    padding: 10px;
    background-color: #169;
    color: #DDD;
    #name {
      font-weight: bold;
    }
    #handi {
      margin-left: 5px;
    }
    #score {
      font-weight: bold;
    }
  }
}
</style>
