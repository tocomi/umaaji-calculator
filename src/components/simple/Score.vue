<template lang="pug">
  div#score
    span#rank_odds.score(:class="[ rankClass(rank) ]")
      p#odds_rank.rank {{ rank }} 
      p#odds.detail {{ odds }}
    span#average.score(:class="[ rankClass(averageRank) ]")
      p#average_rank.rank {{ averageRank }}
      p#average_score.detail {{ average }}
    span#max.score(:class="[ rankClass(maxRank) ]")
      p#max_rank.rank {{ maxRank }}
      p#max_score.detail {{ max }}
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
  },
  methods: {
    rankClass(rank) {
      if (rank === 1) {
        return 'first';
      }
      if (rank === 2) {
        return 'second';
      }
      if (rank === 3) {
        return 'third';
      }
      return '';
    },
  },
};
</script>

<style lang="scss" scoped>
#score {
  display: flex;
  justify-content: space-between;
  width: 135px;
  height: 46px;
  border-top: 1px solid #AAA;
  border-bottom: 1px solid #AAA;
  p {
    margin: -2px 0 0 0;
  }
  .score {
    display: inline-block;
    width: 60px;
    border-right: 1px solid #AAA;
    &.first {
      background-color: #FAFA8A;
    }
    &.second {
      background-color: #EAEAEA;
    }
    &.third {
      background-color: #E3C592;
    }
  }
  .rank {
    font-size: 18px;
    font-weight: bold;
  }
}
</style>
