import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo: {},
    isLogin: false,
    isNavShow: false,
    isSmallScreen: false
  },
  mutations: {
    UPDATE_ISLOGIN(state, isLogin) {
      state.isLogin = isLogin;
      console.log(state.isLogin);
    },
    UPDATE_USER_INFO(state, info) {
      state.userInfo = info;
    },
    UPDATE_ISSMALLSCREEN(state, isSmallScreen) {
      state.isSmallScreen = isSmallScreen;
    },
    UPDATE_ISNAVSHOW(state, isNavShow) {
      state.isNavShow = isNavShow;
    }
  },
  actions: {
    updateIsLogin({ commit }, isLogin) {
      commit("UPDATE_ISLOGIN", isLogin);
    },
    updateUserInfo({ commit }, info) {
      commit("UPDATE_USER_INFO", info);
    },
    updateIsSmallScreen({ commit }, isSmallScreen) {
      commit("UPDATE_ISSMALLSCREEN", isSmallScreen);
    },
    updateIsNavShow({ commit }, isNavShow) {
      commit("UPDATE_ISNAVSHOW", isNavShow);
    }
  }
});
