<template lang="pug">
  div.index
    Loading(v-if="loading")
    div(v-for="race in raceData", :key="race.race_name")
      h3 {{ race.name }}
      h4 {{ race.ground }} {{ race.distance }}
      Horse(v-for="horse in race.horses", :key="horse.name", :horse="horse")
</template>

<script>
import Horse from '../components/Horse.vue'
import Loading from '../components/Loading.vue'

export default {
  name: 'Index',
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
  components: {
    Horse: Horse,
    Loading: Loading,
  }
}
</script>

<style lang="scss" scoped>

</style>
