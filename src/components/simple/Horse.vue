<template lang="pug">
  div.horse
    Gate(:gate="horse.gate" :number="horse.number")
    div#info
      div#name_age(:class="[ sexClass ]")
        span#name {{ horse.name }}
      div#race
        span#age {{ horse.sex }}{{ horse.age }}
        div#jocket_handi
          span#jockey {{ horse.jockey }} 
          span#handi {{ horse.handi }} 
    Score(:odds="Number(horse.odds)" :rank="Number(horse.rank)" :max="max" :average="average" :maxRank="horse.maxRank" :averageRank="horse.averageRank")
    div(v-show="false")
      PastRace(v-for="(race, index) in horse.past_races" :key="index" :race="race" @addScore="addScore")
</template>

<script>
import Gate from './Gate.vue'
import PastRace from '../PastRace.vue'
import Score from './Score.vue'

export default {
  props: {
    horse: Object,
  },
  created() {
    this.calculateInterval()
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
    },
    sexClass() {
      if (this.horse.sex === '牡') {
        return 'male'
      }
      if (this.horse.sex === '牝') {
        return 'female'
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
    },
    calculateInterval() {
      let previousDate = 0
      this.horse.past_races.slice().reverse().forEach(race => {
        const date = this.culculateDay(race.date)
        if (date === 0 || previousDate === 0) {
          race.interval = 0
          previousDate = date
          return
        }
        race.interval = Math.round((date - previousDate) / 7)
        previousDate = date
      });
    },
    culculateDay(date) {
      let dateArray = date.split('.')
      if (dateArray.length < 3) {
        return 0
      }
      return (Number(dateArray[0]) * 365) + (Number(dateArray[1]) * 30) + (Number(dateArray[2]))
    }
  },
  components: {
    Gate,
    PastRace,
    Score,
  }
}
</script>

<style lang="scss" scoped>
$height: 46px;
.horse {
  height: $height + 1px;
  $info_width: 150px;
  #info {
    float: left;
    width: $info_width;
    height: $height;
    border: 1px solid #AAA;
    #name_age {
      position: absolute;
      width: $info_width - 2px;
      height: 24px;
      font-size: 14px;
      font-weight: bold;
      border-bottom: solid 1px #CCC;
      &.male {
        color: #2C42B8;
      }
      &.female {
        color: #DC3C3C;
      }
      #name {
        display: inline-block;
        width: 139px;
      }
      #age {
        display: inline-block;
        width: 39px;
      }
    }
    #race {
      position: absolute;
      display: flex;
      justify-content: space-around;
      height: 21px;
      width: $info_width;
      margin-top: 24px;
      font-size: 13px;
      border-bottom: 1px solid #AAA;
    }
  }
}
</style>
