<template lang="pug">
  div.index
    Loading(v-if="loading")
    div#races
      div#race(v-for="race in raceData", :key="race.race_name", @click="setHorseData(race)")
        RaceInfo(:race="race")
    div#horses
      Horse(v-for="horse in horses", :key="horse.name", :horse="horse")
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
    }
  },
  components: {
    Horse: Horse,
    RaceInfo: RaceInfo,
    Loading: Loading,
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
</style>
