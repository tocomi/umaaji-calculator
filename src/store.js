import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    raceData: []
  },
  mutations: {
    setData(state, payload) {
      state.raceData = payload.raceData
    }
  },
  actions: {
    readJson({ commit }) {
      const data = require('./assets/data/result.json')
      commit('setData', { raceData: data })
    }
  }
})
