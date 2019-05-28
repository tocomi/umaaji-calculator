<template lang="pug">
  div#race_header
    span {{ race.place }}{{ race.round }}R {{race.ground}}{{ race.distance }} {{ race.name}} {{ grade }}
</template>

<script>
export default {
  props: {
    race: Object,
  },
  computed: {
    grade() {
      if (/[0-9]{3,4}/.test(this.race.grade)) {
        return this.race.grade + '万下'
      }
      return this.race.grade
    }
  }
}
</script>

<style lang="scss" scoped>
#race_header {
  height: 48px;
  background-color: #394C82;
  color: #FFF;
  padding: 5px;
  font-size: 26px;
}
</style>
