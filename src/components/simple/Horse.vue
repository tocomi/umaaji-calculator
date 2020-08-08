<template lang="pug">
  div.horse
    Gate(:gate="horse.gate" :number="horse.number")
    div#info
      div#horse_info
        div#name_age(:class="[ sexClass ]")
          span#name {{ horse.name }}
        div#race
          span#age {{ horse.sex }}{{ horse.age }}
          span#jockey {{ horse.jockey }} 
          span#handi {{ horse.handi }} 
      Score(:odds="Number(horse.odds)" :rank="Number(horse.rank)" :max="max" :average="average" :maxRank="horse.maxRank" :averageRank="horse.averageRank")
    div(v-show="false")
      PastRace(v-for="(race, index) in horse.past_races" :key="index" :race="race" @addScore="addScore")
</template>

<script>
import Gate from './Gate.vue';
import PastRace from '../PastRace.vue';
import Score from './Score.vue';

export default {
  props: {
    horse: Object,
  },
  created() {
    this.calculateInterval();
  },
  data() {
    return {
      score: 0,
      count: 0,
      max: 0,
    };
  },
  computed: {
    average() {
      return Math.round(this.score / this.count * 10) / 10;
    },
    rank() {
      if (this.horse.rank) {
        return '(' + this.horse.rank + ')';
      }
      return '';
    },
    sexClass() {
      if (this.horse.sex === '牡') {
        return 'male';
      }
      if (this.horse.sex === '牝') {
        return 'female';
      }
      return '';
    },
  },
  methods: {
    addScore(raceScore) {
      this.score += raceScore;
      this.count++;
      if (raceScore > this.max) {
        this.max = raceScore;
      }
      this.$emit('setScore', this.horse, this.average, this.max);
    },
    calculateInterval() {
      let previousDate = 0;
      this.horse.past_races.slice().reverse().forEach(race => {
        const date = this.culculateDay(race.date);
        if (date === 0 || previousDate === 0) {
          race.interval = 0;
          previousDate = date;
          return;
        }
        race.interval = Math.round((date - previousDate) / 7);
        previousDate = date;
      });
    },
    culculateDay(date) {
      let dateArray = date.split('.');
      if (dateArray.length < 3) {
        return 0;
      }
      return (Number(dateArray[0]) * 365) + (Number(dateArray[1]) * 30) + (Number(dateArray[2]));
    },
  },
  components: {
    Gate,
    PastRace,
    Score,
  },
};
</script>

<style lang="scss" scoped>
.horse {
  display: flex;
  height: 64px;

  #info {
    border: 1px solid #DDD;
    left: 24px;
    width: 264px;

    #horse_info {
      align-items: center;
      border: solid 1px #F4F4F4;
      display: flex;
      height: 28px;

      #name_age {
        align-items: center;
        display: flex;
        font-size: 13px;
        font-weight: bold;
        height: inherit;

        &.male {
          color: #2C42B8;
        }
        &.female {
          color: #DC3C3C;
        }
        #name {
          display: inline-block;
          width: 136px;
        }
      }
      #race {
        align-items: center;
        display: flex;
        height: inherit;
        justify-content: start;
        font-size: 12px;

        #age {
          width: 32px;
        }
        #jockey {
          width: 52px;
        }
        #handi {
          width: 32px;
        }
      }
    }
  }
}
</style>
