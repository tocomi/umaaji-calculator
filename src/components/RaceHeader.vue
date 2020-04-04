<template lang="pug">
  div#race_header
    span#place {{ race.place }}{{ race.round }}R
    span#ground {{race.ground }}{{ race.distance }}
    span#grade {{ grade }}
    span#name {{ race.name }}
</template>

<script>
export default {
  props: {
    race: Object,
  },
  computed: {
    grade() {
      if (/[0-9]{3,4}/.test(this.race.grade)) {
        return this.race.grade + '万下';
      }
      return this.race.grade;
    },
  },
};
</script>

<style lang="scss" scoped>
#race_header {
  height: 48px;
  background-color: #094C32;
  color: #FFF;
  padding: 5px;
  text-align: left;
  #place {
    position: absolute;
    margin: -5px 0 0 10px;
    font-size: 16px;
  }
  #ground {
    position: absolute;
    margin: 17px 0 0 10px;
    font-size: 16px;
  }
  #grade {
    position: absolute;
    margin: 0 0 0 90px;
    font-size: 24px;
  }
  #name {
    position: absolute;
    margin: 0 0 0 170px;
    font-size: 24px;
    font-weight: bold;
  }
}
</style>
