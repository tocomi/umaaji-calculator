<template lang="pug">
  div#index
    Loading(v-if="loading")
    div#list
      v-tabs#place_tabs(color="cyan" slider-color="yellow" dark)
        v-tab(v-for="place in racePlace") {{ place }}
        v-tab-item(v-for="place in racePlace")
          div#races
            div#race(v-for="race in raceData(place)", :key="race.place + race.round", @click="setHorseData(race)")
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
    loading() {
      return this.$store.state.loading
    },
    isRaceSelected() {
      return this.horses.length > 0
    },
    racePlace() {
      const racePlace = new Set()
      this.$store.state.raceData.forEach(race => racePlace.add(race.place))
      return [...racePlace]
    },
  },
  methods: {
    setHorseData(race) {
      let targetRace = this.$store.state.raceData.filter(raceData => race.place === raceData.place && race.round === raceData.round)
      this.horses = targetRace[0].horses
      this.horses.forEach(horse => horse.average = 0)
    },
    setAverage(horse, average) {
      horse.average = average
    },
    sortByUmaaji() {
      this.horses.sort((a, b) => b.average - a.average)
    },
    raceData(place) {
      return this.$store.state.raceData
        .filter(race => race.place === place)
        .sort((a, b) => a.round - b.round)
    },
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
    width: 220px;
    height: 2215px;
    #place_tabs {
      margin-left: 10px;
      width: 210px;
    }
    #races {
      margin-top: 10px;
      #race {
        width: 210px;
      }
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
