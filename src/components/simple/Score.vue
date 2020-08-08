<template lang="pug">
  div#score
    //- FIXME: netkeibaの仕様変更によりオッズのデータが取れていない
    //- span#rank_odds.score(:class="[ rankClass(rank) ]")
    //-   p#odds_rank.rank {{ rank }} 
    //-   p#odds.detail {{ odds }}
    div#average.score
      span.label 5走平均
      span.rank(:class="[ rankClass(averageRank) ]") {{ averageRank }}
      span.unit 位
      span.detail ({{ fixedAverage }})
    div#max.score
      span.label 最大値
      span.rank(:class="[ rankClass(maxRank) ]") {{ maxRank }}
      span.unit 位
      span.detail ({{ fixedMax }})
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
  computed: {
    fixedAverage() {
      return Number.parseFloat(this.average).toFixed(1);
    },
    fixedMax() {
      return Number.parseFloat(this.max).toFixed(1);
    },
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
  align-items: center;
  display: flex;
  justify-content: space-evenly;
  width: 264px;
  height: 32px;

  p {
    margin: -2px 0 0 0;
  }
  .score {
    display: flex;
    align-items: baseline;
    width: 120px;
  }
  .label {
    color: #777;
    font-size: 8px;
    width: 40px;
  }
  .rank {
    font-size: 18px;
    font-weight: bold;
    width: 24px;

    &.first {
      color: #CACA4A;
    }
    &.second {
      color: #BABABA;
    }
    &.third {
      color: #C3A572;
    }
  }
  .unit {
    color: #AAA;
    font-size: 8px;
  }
  .detail {
    font-size: 12px;
    width: 40px;
  }
}
</style>
