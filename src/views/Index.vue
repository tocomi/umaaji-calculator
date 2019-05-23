<template lang="pug">
  div#index
    v-progress-circular.circular(indeterminate color="primary" v-if="loading")
    v-layout
      v-flex#list-flex(xs3 lg2)
        div#list(v-if="!loading")
          v-tabs#place_tabs(color="cyan" slider-color="yellow" dark)
            v-tab(v-for="place in racePlace", :key="place") {{ place }}
            v-tab-item(v-for="place in racePlace", :key="place")
              div#races
                div#race(v-for="race in raceData(place)", :key="race.place + race.round", @click="setHorseData(race)")
                  RaceInfo(:race="race")
      v-flex#data-flex(xs9 lg10)
        div#data-header(v-if="isRaceSelected")
          v-card#data-header-card
            RaceHeader(:race="selectedRace")
            div#buttons
              v-btn#sort(@click="sortByAverage") sort by average
              v-btn#sort(@click="sortByMax") sort by max
              v-btn#sort(@click="sortByOdds") sort by odds
              v-btn#sort(@click="sortByNumber") sort by number
              v-checkbox(v-model="isDetailMode" :label="`Detail mode`")
        div#data-content(v-if="isRaceSelected")
          v-card
            div#horses
              transition-group(name="flip-list")
                template(v-if="isDetailMode")
                  Horse(v-for="horse in horses", :key="horse.name", :horse="horse", @setScore="setScore")
                template(v-if="!isDetailMode")
</template>

<script>
import Horse from '../components/Horse.vue'
import RaceInfo from '../components/RaceInfo.vue'
import RaceHeader from '../components/RaceHeader.vue'
import Loading from '../components/Loading.vue'

export default {
  name: 'Index',
  data() {
    return {
      horses: [],
      selectedRace: {},
      isDetailMode: false,
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
      return Object.keys(this.selectedRace).length
    },
    racePlace() {
      const racePlace = new Set()
      this.$store.state.raceData.forEach(race => racePlace.add(race.place))
      return [...racePlace]
    },
  },
  methods: {
    setHorseData(race) {
      const targetRace = this.$store.state.raceData.filter(raceData => race.place === raceData.place && race.round === raceData.round)
      this.selectedRace = targetRace[0]
      this.horses = targetRace[0].horses
      this.horses.forEach(horse => {
        horse.average = 0
        horse.max = 0
      })
    },
    setScore(horse, average, max) {
      horse.average = average
      horse.max = max
    },
    sortByAverage() {
      this.horses.sort((a, b) => b.average - a.average)
    },
    sortByMax() {
      this.horses.sort((a, b) => b.max - a.max)
    },
    sortByOdds() {
      this.horses.sort((a, b) => a.odds - b.odds)
    },
    sortByNumber() {
      this.horses.sort((a, b) => a.number - b.number)
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
    RaceHeader,
    Loading,
  }
}
</script>

<style lang="scss" scoped>
#index {
  .circular {
    margin: 20px 0 0 0;
  }
  #list-flex {
    border-right: 1px solid #DDDDDD;
    #list {
      height: calc(100vh - 64px);
      width: 100%;
      background-color: #FAFAFA;
      #place_tabs {
        width: 100%;
      }
      #races {
        padding: 5px 0 0 0;
        #race {
          width: 100%;
        }
      }
    }
  }
  #data-flex {
    #data-header {
      border-bottom: 1px solid #DDDDDD;
      background-color: #FAFAFA;
      #data-header-card {
        max-width: 1070px;
        margin: 20px 0 20px 20px;
      }
      #buttons {
        text-align: left;
      }
    }
    #data-content {
      height: calc(100vh - 64px - 138px);
      overflow: scroll;
      #horses {
        min-width: 1090px;
        padding: 20px 0 10px 20px;
        .flip-list-move {
          transition: transform 1s;
        }
      }
    }
  }
}
</style>
