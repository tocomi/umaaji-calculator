<template lang="pug">
  div#list(v-if="!loading")
    v-tabs#place_tabs(color="#463C21" slider-color="yellow" dark)
      v-tab(v-for="place in racePlace", :key="place") {{ place }}
      v-tab-item(v-for="place in racePlace", :key="place")
        div#races
          div#race(v-for="race in raceData(place)", :key="race.place + race.round", @click="setHorseData(race)")
            RaceInfo(:race="race")
</template>

<script>
import RaceInfo from '../components/RaceInfo.vue';

export default {
  props: {
    loading: Boolean,
    racePlace: Array,
  },
  methods: {
    raceData(place) {
      return this.$store.state.raceData
        .filter(race => race.place === place)
        .sort((a, b) => a.round - b.round);
    },
    setHorseData(race) {
      this.$emit('setHorseData', race);
      // NOTE: for google analytics
      // eslint-disable-next-line no-undef
      dataLayer.push({
        'event': 'gaEvent',
        'eventCategory': 'selectRace',
        'eventAction': 'click',
        'eventLabel': `${race.place}${race.round}R`,
        'nonInteraction': true,
      });
    },
  },
  components: {
    RaceInfo,
  },
};
</script>

<style lang="scss" scoped>
#races {
  text-align: center;
}
</style>
