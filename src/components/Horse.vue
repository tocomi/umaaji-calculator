<template lang="pug">
  div.horse
    div#info
      span#name {{ horse.name }}
      span#handi {{ horse.handi }}
      br
      span#jockey {{ horse.jockey }}
      br
      span#score umaaji: {{ average }}
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
    }
  },
  computed: {
    average() {
      return Math.round(this.score / this.count * 10) / 10
    }
  },
  methods: {
    addScore(raceScore) {
      this.score += raceScore
      this.count++
      this.$emit('setAverage', this.horse, this.average)
    }
  },
  components: {
    PastRace: PastRace,
  }
}
</script>

<style lang="scss" scoped>
.horse {
  width: 1320px;
  height: 122px;
  #info {
    float: left;
    width: 180px;
    height: 120px;
    padding: 10px;
    background-color: #1770BA;
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
