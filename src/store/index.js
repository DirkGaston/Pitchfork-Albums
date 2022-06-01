import Vue from "vue";
import Vuex from "vuex";
// import { nanoid } from "nanoid";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db, auth } from "../firebase";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    albums: [],
  },
  mutations: {
    // ADD_ALBUM(state, payload) {
    //   state.albums.push(payload);
    // },
    // DELETE_ALBUM(state, payload) {
    //   state.albums = state.albums.filter((item) => item.id !== payload);
    // },
    // UPDATE_ALBUM(state, payload) {
    //   state.albums = state.albums.map((item) =>
    //     item.id === payload.id ? payload : item
    //   );
    // },
    GET_ALBUMS(state, payload) {
      state.albums = payload;
    },
  },
  actions: {
    async get_albums({ commit }) {
      try {
        const q = query(
          collection(db, "albums"),
          where("uid", "==", auth.currentUser.uid)
        );
        onSnapshot(q, (querySnapshot) => {
          const albums = [];
          querySnapshot.forEach((doc) => {
            albums.push({
              id: doc.id,
              ...doc.data(),
            });
          });
          commit("GET_ALBUMS", albums);
        });
      } catch (error) {
        console.log(error);
      }
    },

    async add_album({ commit }, album) {
      // album.id = nanoid(6);
      try {
        await addDoc(collection(db, "albums"), {
          artist: album.artist,
          title: album.title,
          score: album.score,
          uid: auth.currentUser.uid,
        });
      } catch (error) {
        console.log(error);
      }
      // commit("ADD_ALBUM", album);
    },
    async delete_album({ commit }, id) {
      try {
        const docRef = doc(db, "albums", id);
        await deleteDoc(docRef);
      } catch (error) {
        console.log(error);
      }
      // commit("DELETE_ALBUM", id);
    },
    async update_album({ commit }, album) {
      try {
        const docRef = doc(db, "albums", album.id);
        await updateDoc(docRef, {
          artist: album.artist,
          title: album.title,
          score: album.score,
        });
      } catch (error) {
        console.log(error);
      }
      // commit("UPDATE_ALBUM", album);
    },
  },
});
