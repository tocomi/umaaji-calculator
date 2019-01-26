<template lang="pug">
  div.horse
    Gate(:gate="horse.gate" :number="horse.number")
    div#info
      div#name {{ horse.name }} {{ horse.sex}}{{ horse.age }}
      div#race
        span#jockey {{ horse.jockey }}
        span#handi {{ horse.handi }} 
      div#favorite
        span#odds {{ horse.odds }} 
        span#rank {{ rank }}
      div#score
        span#average AVG: {{ average }} 
        span#max MAX: {{ max }}
    PastRace(v-for="(race, index) in horse.past_races" :key="index" :race="race" @addScore="addScore")
</template>

<script>
import Gate from './Gate.vue'
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
    Gate: Gate,
    PastRace: PastRace,
  }
}
</script>

<style lang="scss" scoped>
$height: 105px;
.horse {
  height: $height + 1px;
  $info_width: 180px;
  #info {
    float: left;
    width: $info_width;
    height: $height;
    padding: 10px;
    background-color: #169;
    color: #DDD;
    #name {
      position: absolute;
      width: $info_width - 20px;
      font-weight: bold;
    }
    #race {
      position: absolute;
      width: $info_width - 20px;
      margin-top: 20px;
      #handi {
        margin-left: 5px;
      }
    }
    #favorite {
      position: absolute;
      width: $info_width - 20px;
      margin-top: 40px;
      font-size: 16px;
    }
    #score {
      position: absolute;
      width: $info_width - 20px;
      margin-top: 70px;
      font-weight: bold;
    }
  }
}
</style>
