<template lang="pug">
  div.race
    span#name {{ race.name }} {{ race.grade }}
    br
    span#condition {{ race.ground }} {{ race.distance }} {{ race.status }}
    br
    span#time {{ race.time }} ({{ race.diff }})
</template>

<script>
export default {
  props: {
    race: Object,
  }
}
</script>

<style lang="scss" scoped>
.race {
  float: left;
  width: 130px;
  height: 80px;
  padding: 10px;
  border: solid 1px #AAA;
}
</style>
