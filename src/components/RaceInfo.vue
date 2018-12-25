<template lang="pug">
  button#race_info
    span {{ race.name }} {{ race.grade }}
    br
    span {{ race.ground }} {{ race.distance }}
</template>

<script>
export default {
  props: {
    race: Object
  }
}
</script>

<style lang="scss" scoped>
#race_info {
  height: 55px;
  width: 200px;
  margin-top: 10px;
  outline: 0;
  background-color: #394C82;
  color: #FFFFFF;
  border-radius: 20px;
  &:hover {
    background-color: #5B6EA4;
  }
}
</style>
