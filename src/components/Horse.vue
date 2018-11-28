<template lang="pug">
  div.horse
    div#info
      span#name {{ horse.horse_name }}
    Race(v-for="race in horse.past_races" :key="race.grade" :race="race")
</template>

<script>
import Race from './Race.vue'

export default {
  props: {
    horse: Object,
  },
  components: {
    Race: Race,
  }
}
</script>

<style lang="scss" scoped>
.horse {
  width: 950px;
  height: 100px;
  #info {
    float: left;
    width: 130px;
    height: 80px;
    padding: 10px;
    background-color: #DDD;
  }
}
</style>
