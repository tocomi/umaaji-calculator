<template lang="pug">
  div.race(:class="{ rest: isRest }")
    span#name {{ race.name }} {{ race.grade }}
    br
    span#condition {{ race.ground }} {{ race.distance }} {{ race.status }}
    br
    span#time {{ race.time }} {{ diff }}
</template>

<script>
export default {
  props: {
    race: Object,
  },
  computed: {
    diff() {
      if (this.race.diff) {
        return '(' + this.race.diff + ')'
      }
      return ''
    },
    isRest() {
      return this.race.name.includes('休養')
    }
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
.rest {
  background-color: #DDD;
}
</style>
