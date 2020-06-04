import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isNavShow: false,
    isSmallScreen: false
  },
  mutations: {
    UPDATE_ISSMALLSCREEN(state, isSmallScreen) {
      state.isSmallScreen = isSmallScreen;
    },
    UPDATE_ISNAVSHOW(state, isNavShow) {
      state.isNavShow = isNavShow;
    }
  },
  actions: {
    updateIsSmallScreen({ commit }, isSmallScreen) {
      commit("UPDATE_ISSMALLSCREEN", isSmallScreen);
    },
    updateIsNavShow({ commit }, isNavShow) {
      commit("UPDATE_ISNAVSHOW", isNavShow);
    }
  }
});
