<template lang="pug">
  div#score_header
    span#odds ODDS
    span
      div#umaaji umaaji
      div#score
        span#average.score AVG
        span#max.score MAX
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
    margin: 20px 0 0 45px;
    height: ($height / 2) px;
    width: 90px;
    color: #FFF;
    .score {
      display: inline-block;
      width: 45px;
    }
    #average {
      border-right: solid 1px #FFF;
    }
  }
}
</style>
