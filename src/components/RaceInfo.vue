<template lang="pug">
  v-btn#race_info
    div#info
      div#place
        span {{ race.place }}{{ race.round }}R
      div#condition
        span {{ race.ground }}{{ race.distance }}
      div#grade
        span {{ race.grade }}
    div#name
      span {{ race.name }}
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
  height: 45px;
  width: 200px;
  margin-top: 5px;
  outline: 0;
  background-color: #394C82;
  color: #FFFFFF;
  border-radius: 5px;
  &:hover {
    background-color: #5B6EA4;
  }
  #info {
    position: absolute;
    height: 30px;
    width: 170px;
    margin-top: -5px;
    #place {
      position: absolute;
      margin-left: 10px;
    }
    #condition {
      position: absolute;
      margin-left: 70px;
    }
    #grade {
      position: absolute;
      width: 45px;
      margin-left: 120px;
      text-align: center;
    }
  }
  #name {
    position: absolute;
    margin-top: 10px;
    font-weight: bold;
  }
}
</style>
