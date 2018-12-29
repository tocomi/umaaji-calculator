<template lang="pug">
  div.index
    Loading(v-if="loading")
    div#races
      div#race(v-for="race in raceData", :key="race.race_name", @click="setHorseData(race)")
        RaceInfo(:race="race")
    div#horses
      button#sort(@click="sortByUmaaji") sort by umaaji
      transition-group(name="flip-list")
        Horse(v-for="horse in horses", :key="horse.name", :horse="horse", @setAverage="setAverage")
</template>

<script>
import Horse from '../components/Horse.vue'
import RaceInfo from '../components/RaceInfo.vue'
import Loading from '../components/Loading.vue'

export default {
  name: 'Index',
  data() {
    return {
      horses: [],
    }
  },
  created() {
    this.$store.dispatch('readJson')
  },
  computed: {
    raceData() {
      return this.$store.state.raceData
    },
    loading() {
      return this.$store.state.loading
    }
  },
  methods: {
    setHorseData(race) {
      let targetRace = this.$store.state.raceData.filter(raceData => race.name === raceData.name)
      this.horses = targetRace[0].horses
      this.horses.forEach(horse => horse.average = 0)
    },
    setAverage(horse, average) {
      horse.average = average
    },
    sortByUmaaji() {
      this.horses.sort((a, b) => b.average - a.average)
    }
  },
  components: {
    Horse,
    RaceInfo,
    Loading,
  }
}
</script>

<style lang="scss" scoped>
#races {
  width: 1280px;
  height: 420px;
}
#race {
  float: left;
  width: 210px;
}
.flip-list-move {
  transition: transform 1s;
}
</style>
