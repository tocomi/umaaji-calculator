<template lang="pug">
  div#score_header
    span#odds オッズ
    span
      div#umaaji ウマ味
      div#score
        span#average.score 5走平均
        span#max.score 最大
</template>

<style lang="scss" scoped>
$height: 40px;
#score_header {
  height: $height;
  width: 136px;
  margin: 0 0 0 189px;
  background-color: #28288A;
  border: solid 1px #CCC;
  font-weight: bold;
  #odds {
    position: absolute;
    margin: 0 0 0 -68px;
    padding: 10px 0 0 0;
    height: $height - 1px;
    width: 45px;
    color: #FFF;
    border-right: solid 1px #FFF;
    font-size: 12px;
  }
  #umaaji {
    position: absolute;
    margin: 0 0 0 45px;
    height: ($height / 2) px;
    width: 90px;
    color: #FFF;
    border-bottom: solid 1px #FFF;
  }
  #score {
    position: absolute;
    margin: 18px 0 0 45px;
    height: ($height / 2) px;
    width: 90px;
    color: #FFF;
    .score {
      display: inline-block;
      width: 45px;
      font-size: 11px;
    }
    #average {
      border-right: solid 1px #FFF;
    }
  }
}
</style>
