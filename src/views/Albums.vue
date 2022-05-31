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
          <tr v-for="item in albums" :key="item.id">
            <td>{{ item.artist }}</td>
            <td>{{ item.title }}</td>
            <td>{{ item.score }}</td>
            <td class="text-center">
              <v-btn class="mr-2" color="error" @click="deleteAlbum(item.id)"
                >DELETE</v-btn
              >
              <v-btn color="warning" @click="triggerUpdate(item)">EDIT</v-btn>
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
                  <v-text-field required label="Title" v-model="album.title" />
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    required
                    label="Score"
                    v-model="album.score"
                  />
                </v-col>
              </v-row>
              <v-btn block color="warning" @click="updateAlbum"
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

export default {
  data() {
    return {
      album: {
        artist: "",
        title: "",
        score: "",
      },
      dialog: false,
    };
  },
  methods: {
    ...mapActions(["add_album", "delete_album", "update_album", "get_albums"]),
    addAlbum() {
      this.add_album({ ...this.album });
    },
    deleteAlbum(id) {
      this.delete_album(id);
    },
    triggerUpdate(item) {
      this.dialog = true;
      this.album = item;
    },
    updateAlbum() {
      console.log(this.album);
      this.update_album({ ...this.album });
      this.album = {};
      this.dialog = false;
    },
  },
  computed: {
    ...mapState(["albums"]),
  },
  created() {
    this.get_albums();
  },
};
</script>
