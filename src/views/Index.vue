<template lang="pug">
  div#index
    Loading(v-if="loading")
    div#list
      div#races
        div#race(v-for="race in raceData", :key="race.place + race.round", @click="setHorseData(race)")
          RaceInfo(:race="race")
    div#data
      div#horses
        v-btn#sort(@click="sortByUmaaji" v-if="isRaceSelected") sort by umaaji
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
    },
    isRaceSelected() {
      return this.horses.length > 0
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
#index {
  margin-top: 30px;
  #list {
    float: left;
    width: 260px;
    height: 2215px;
    #race {
      width: 250px;
    }
  }
  #data {
    width: 1340px;
    .flip-list-move {
      transition: transform 1s;
    }
  }
}
</style>
