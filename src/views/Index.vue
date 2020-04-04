<template lang="pug">
  div#index
    v-layout
      v-flex(hidden-sm-and-up)
        v-expansion-panel(v-model="expanded" expand)
          v-expansion-panel-content
            template(v-slot:header)
              div Races
            div(text-xs-center)
              RaceList(:loading="loading" :racePlace="racePlace" @setHorseData="setHorseData")
    v-progress-circular.circular(indeterminate color="primary" v-if="loading")
    h2.error-message(v-if="!loading && isLoadingError") レース情報の取得に失敗しました。
    v-layout
      v-flex#list-flex(hidden-xs-only lg2)
        RaceList(:loading="loading" :racePlace="racePlace" @setHorseData="setHorseData")
      v-flex#data-flex(lg10)
        div#data-header(v-if="isRaceSelected")
          RaceHeader(:race="selectedRace")
          div#buttons
            v-btn.sort-button(@click="sortByAverage") average
            v-btn.sort-button(@click="sortByMax") max
            v-btn.sort-button(@click="sortByOdds") odds
            v-btn.sort-button(@click="sortByNumber") number
          div#options
            v-checkbox(v-model="isDetailMode" :label="`Detail mode`")
        div#data-content(v-if="isRaceSelected")
          v-card#data-card
            div#horses(:class="{ detail: isDetailMode }")
              template(v-if="isDetailMode")
                transition-group(name="flip-list")
                  HorseDetail(v-for="horse in horses", :key="horse.name", :horse="horse", @setScore="setScore")
              template(v-else)
                ScoreHeader
                transition-group(name="flip-list")
                  Horse(v-for="horse in horses", :key="horse.name", :horse="horse", @setScore="setScore")
</template>

<script>
import Horse from '../components/simple/Horse.vue';
import HorseDetail from '../components/detail/HorseDetail.vue';
import RaceList from '../components/RaceList.vue';
import RaceInfo from '../components/RaceInfo.vue';
import RaceHeader from '../components/RaceHeader.vue';
import ScoreHeader from '../components/simple/ScoreHeader.vue';
import Loading from '../components/Loading.vue';

export default {
  name: 'Index',
  data() {
    return {
      horses: [],
      selectedRace: {},
      isDetailMode: false,
      expanded: [ true ],
      dummy: false
    };
  },
  created() {
    this.$store.dispatch('readJson');
  },
  computed: {
    loading() {
      return this.$store.state.loading;
    },
    isRaceSelected() {
      return Object.keys(this.selectedRace).length;
    },
    racePlace() {
      const racePlace = new Set();
      this.$store.state.raceData.forEach(race => racePlace.add(race.place));
      return [...racePlace];
    },
    isLoadingError() {
      return this.$store.state.raceData.length === 0;
    }
  },
  methods: {
    setHorseData(race) {
      const targetRace = this.$store.state.raceData.filter(raceData => race.place === raceData.place && race.round === raceData.round);
      this.selectedRace = targetRace[0];
      this.horses = targetRace[0].horses;
      this.horses.forEach(horse => {
        horse.average = 0;
        horse.max = 0;
      });
      this.closeRaceList();
    },
    closeRaceList() {
      this.expanded = [];
    },
    setScore(horse, average, max) {
      horse.average = average;
      horse.max = max;
      this.calculateRank();
    },
    calculateRank() {
      const last = this.horses.slice(-1)[0];
      if (last.max === 0 && last.average === 0) {
        return;
      }

      const averageScores = [];
      const maxScores = [];
      this.horses.forEach((horse) => {
        averageScores.push(horse.average);
        maxScores.push(horse.max);
      });

      const averageRanks = this.makeRankArray(averageScores);
      const maxRanks = this.makeRankArray(maxScores);

      this.horses.forEach((horse, index) => {
        horse.averageRank = averageRanks[index];
        horse.maxRank = maxRanks[index];
      });

      this.sortByOdds();
    },
    makeRankArray(scores) {
      const ranks = [];
      const checked = [];
      scores.forEach((score) => {
        if (ranks.length === 0) {
          ranks.push(1);
          checked.push(score);
          return;
        }
        let rank = 1;
        checked.forEach((checkedScore, index) => {
          if (score < checkedScore) {
            rank++;
          } else if (score > checkedScore) {
            ranks[index]++;
          }
        });
        ranks.push(rank);
        checked.push(score);
      });
      return ranks;
    },
    sortByAverage() {
      this.horses.sort((a, b) => b.average - a.average);
    },
    sortByMax() {
      this.horses.sort((a, b) => b.max - a.max);
    },
    sortByOdds() {
      this.horses.sort((a, b) => a.odds - b.odds);
    },
    sortByNumber() {
      this.horses.sort((a, b) => a.number - b.number);
    },
    raceData(place) {
      return this.$store.state.raceData
        .filter(race => race.place === place)
        .sort((a, b) => a.round - b.round);
    },
  },
  components: {
    Horse,
    HorseDetail,
    RaceList,
    RaceInfo,
    RaceHeader,
    ScoreHeader,
    Loading,
  }
};
</script>

<style lang="scss" scoped>
#index {
  .circular {
    margin: 20px 0 0 0;
  }
  .error-message {
    color: red;
  }
  #list-flex {
    border-right: 1px solid #DDDDDD;
    #list {
      height: calc(100vh - 64px);
      width: 100%;
      background-color: #FAFAFA;
      #place_tabs {
        width: 100%;
      }
      #races {
        padding: 5px 0 0 0;
        #race {
          width: 100%;
        }
      }
    }
  }
  #data-flex {
    #data-header {
      height: 135px;
      border-bottom: 1px solid #DDDDDD;
      background-color: #FAFAFA;
      #data-header-card {
        max-width: 1070px;
        margin: 20px 0 20px 20px;
      }
      #buttons {
        text-align: left;
        .sort-button {
          height: 30px;
        }
      }
      #options {
        margin: -10px 0 0 10px;
      }
    }
    #data-content {
      overflow: scroll;
      #data-card {
        min-width: 350px;
      }
      #horses {
        min-width: 345px;
        padding: 20px 0 10px 20px;
        &.detail {
          min-width: 1090px;
        }
        .flip-list-move {
          transition: transform 1s;
        }
      }
    }
  }
}
</style>
