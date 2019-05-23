<template lang="pug">
  div#score
    span#average_label.label ODD
    span#average.score {{ odds }}  {{ rank }} 
    span#average_label.label AVG
    span#average.score {{ average }} 
    span#max_label.label MAX
    span#max.score {{ max }}
</template>

<script>
export default {
  props: {
    odds: Number,
    rank: Number,
    average: Number,
    max: Number,
  }
}
</script>

<style lang="scss" scoped>
#score {
  display: flex;
  justify-content: space-between;
  width: 210px;
  height: 66px;
  font-weight: bold;
  border-top: 1px solid #AAA;
  .label {
    display: inline-block;
    background-color: #333;
    color: #EEE;
    height: inherit;
    width: 50px;
    font-size: 13px;
  }
  .score {
    display: inline-block;
    width: 60px;
  }
}
</style>
