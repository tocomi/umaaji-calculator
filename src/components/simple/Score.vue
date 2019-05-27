<template lang="pug">
  div#score
    span#rank_odds.score
      p#odds_rank.rank {{ rank }} 
      p#odds {{ odds }}
    span#average.score
      p#average_rank.rank {{ averageRank }}
      p#average_score {{ average }}
    span#max.score
      p#max_rank.rank {{ maxRank }}
      p#max_score {{ max }}
</template>

<script>
export default {
  props: {
    odds: Number,
    rank: Number,
    average: Number,
    max: Number,
    averageRank: Number,
    maxRank: Number,
  }
}
</script>

<style lang="scss" scoped>
#score {
  display: flex;
  justify-content: space-between;
  width: 135px;
  height: 46px;
  font-weight: bold;
  border-top: 1px solid #AAA;
  border-bottom: 1px solid #AAA;
  p {
    margin: 0;
  }
  .score {
    display: inline-block;
    width: 60px;
    border-right: 1px solid #AAA;
  }
  .rank {
    font-size: 18px;
  }
}
</style>
