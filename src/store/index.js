import Vue from "vue";
import Vuex from "vuex";
import { nanoid } from "nanoid";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    albums: [],
  },
  mutations: {
    ADD_ALBUM(state, payload) {
      state.albums.push(payload);
    },
    DELETE_ALBUM(state, payload) {
      state.albums = state.albums.filter((item) => item.id !== payload);
    },
    UPDATE_ALBUM(state, payload) {
      state.albums = state.albums.map((item) =>
        item.id === payload.id ? payload : item
      );
    },
  },
  actions: {
    add_album({ commit }, album) {
      album.id = nanoid(6);
      commit("ADD_ALBUM", album);
    },
    delete_album({ commit }, id) {
      commit("DELETE_ALBUM", id);
    },
    update_album({ commit }, album) {
      commit("UPDATE_ALBUM", album);
    },
  },
});
