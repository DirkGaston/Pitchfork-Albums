<template>
  <div>
    <h1>ALBUMS</h1>

    <v-form>
      <v-container>
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field required label="Artist" v-model="album.artist" />
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field required label="Title" v-model="album.title" />
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field required label="Score" v-model="album.score" />
          </v-col>
        </v-row>
        <v-btn block color="red darken-2" class="white--text" @click="addAlbum"
          >ADD</v-btn
        >
      </v-container>
    </v-form>

    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Artist</th>
            <th class="text-left">Title</th>
            <th class="text-left">Score</th>
            <th class="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(album, i) in albums" :key="i">
            <td>{{ album.data.artist }}</td>
            <td>{{ album.data.title }}</td>
            <td>{{ album.data.score }}</td>
            <td class="text-center">
              <v-btn class="mr-2" color="error" @click="deleteAlbum()"
                >DELETE</v-btn
              >
              <v-btn color="warning" @click="activateUpdate(item)">EDIT</v-btn>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>

    <v-dialog v-model="dialog">
      <v-card>
        <v-card-title class="text-h5 grey lighten-2"> Edit </v-card-title>
        <v-card-text>
          <v-form>
            <v-container>
              <v-row>
                <v-col cols="12" md="4">
                  <v-text-field
                    required
                    label="Artist"
                    v-model="album.artist"
                  />
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field required label="Artist" v-model="album.title" />
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    required
                    label="Calories"
                    v-model="album.score"
                  />
                </v-col>
              </v-row>
              <v-btn block color="warning" @click="updateAlbumForm"
                >UPDATE</v-btn
              >
            </v-container>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import {
  getFirestore,
  collection,
  addDoc,
  deleteDoc,
  onSnapshot,
  query,
  doc,
} from "firebase/firestore";

export default {
  data() {
    return {
      album: {
        artist: "",
        title: "",
        score: "",
      },
      albums: [],
      dialog: false,
    };
  },
  methods: {
    ...mapActions(["add_album", "delete_album", "update_album"]),

    deleteAlbumItems(id) {
      this.delete_album(id);
    },
    activateUpdate(item) {
      this.dialog = true;
      this.album = item;
    },
    updateAlbumForm() {
      console.log(this.album);
      this.update_album({ ...this.album });
      this.album = {};
      this.dialog = false;
    },
    async addAlbum() {
      const db = getFirestore();
      const { album } = this;
      await addDoc(collection(db, "albums"), album);
    },
    async deleteAlbum() {
      const db = getFirestore();
      const { id } = this;
      await deleteDoc(doc(db, "albums", id));
    },
    async getAlbums() {
      const db = getFirestore();
      const q = query(collection(db, "albums"));
      onSnapshot(q, (querySnapshot) => {
        const albums = [];
        this.albums = [];
        querySnapshot.forEach((doc) => {
          albums.push({ id: doc.id, data: doc.data() });
        });
        this.albums = albums;
      });
    },
  },
  mounted() {
    this.getAlbums();
  },
  //   computed: {
  //     ...mapState(["albums"]),
  //   },
};
</script>
