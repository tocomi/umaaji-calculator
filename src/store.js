import Vue from 'vue';
import Vuex from 'vuex';

import axios from 'axios';

Vue.use(Vuex);

const firebaseStorage = firebase.storage();

export default new Vuex.Store({
  state: {
    raceData: [],
    loading: true,
  },
  mutations: {
    setData(state, payload) {
      state.raceData = payload.raceData ? payload.raceData : [];
      state.loading = false;
    },
  },
  actions: {
    readJson({ commit }) {
      const fileRef = firebaseStorage.ref('result.json');
      fileRef.getDownloadURL().then(url => {
        return axios.get(url);
      }).then(response => {
        const data = response.data;
        commit('setData', { raceData: data });
      });
    },
  },
});
