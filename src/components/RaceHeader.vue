<template lang="pug">
  div#race_header
    span {{ race.place }}{{ race.round }}R {{race.ground}}{{ race.distance }} {{ race.name}}
</template>

<script>
export default {
  props: {
    race: Object,
  },
}
</script>

<style lang="scss" scoped>
#race_header {
  background-color: #394C82;
  color: #FFF;
  padding: 5px;
  font-size: 26px;
}
</style>
