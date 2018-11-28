<template lang="pug">
  div.index
    div(v-for="race in raceData", :key="race.race_name")
      h3 {{ race.race_name }}
      h4 {{ race.race_ground }}
      Horse(v-for="horse in race.horses", :key="horse.horse_name", :horse="horse")
</template>

<script>
import Horse from '../components/Horse.vue'

export default {
  name: 'Index',
  created() {
    this.$store.dispatch('readJson')
  },
  computed: {
    raceData() {
      return this.$store.state.raceData
    }
  },
  components: {
    Horse: Horse,
  }
}
</script>

<style lang="scss" scoped>

</style>
