<template lang="pug">
  div.horse
    div#info
      span#name {{ horse.name }}
      span#handi {{ horse.handi }}
      br
      span#jockey {{ horse.jockey }}
      br
      span#score {{ score }}
    Race(v-for="race in horse.past_races" :key="race.name" :race="race" @addScore="addScore")
</template>

<script>
import Race from './Race.vue'

export default {
  props: {
    horse: Object,
  },
  data() {
    return {
      score: 0,
    }
  },
  methods: {
    addScore(raceScore) {
      this.score += raceScore
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
    height: 100px;
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
