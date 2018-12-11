<template lang="pug">
  div.horse
    div#info
      span#name {{ horse.name }}
      span#handi {{ horse.handi }}
      br
      span#jockey {{ horse.jockey }}
      br
      span#score {{ score }}
    Race(v-for="race in horse.past_races" :key="race.grade" :race="race")
</template>

<script>
import Race from './Race.vue'
import Calculator from '../lib/Calculator.js'

export default {
  props: {
    horse: Object,
  },
  data() {
    return {
      score: 0,
    }
  },
  created() {
    const calculator = new Calculator()
    const score = calculator.execute(this.horse.past_races)
    this.score = score
  },
  methods: {
    calculateScore() {
      const calculator = new Calculator()
      const score = calculator.execute(this.horse.past_races)
      this.score = score
    }
  },
  components: {
    Race: Race,
  }
}
</script>

<style lang="scss" scoped>
.horse {
  width: 1000px;
  height: 100px;
  #info {
    float: left;
    width: 180px;
    height: 80px;
    padding: 10px;
    background-color: #1770BA;
    color: #DDD;
    #name {
      font-weight: bold;
    }
    #handi {
      margin-left: 5px;
    }
  }
}
</style>
