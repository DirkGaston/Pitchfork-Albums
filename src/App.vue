<template>
  <v-app>
    <v-app-bar color="black" class="hidden-sm-and-down" app dark>
      <v-btn color="red darken-4" class="mr-2" to="/">
        <span class="mr-2">Home</span>
        <v-icon>mdi-home</v-icon>
      </v-btn>
      <v-btn color="red darken-4" to="/albums">
        <span class="mr-2">Albums</span>
        <v-icon>mdi-album</v-icon>
      </v-btn>
      <v-spacer></v-spacer>

      <v-btn color="red darken-4" class="mr-2" to="/register">
        <span class="mr-2">Register</span>
        <v-icon>mdi-account-plus</v-icon>
      </v-btn>
      <v-btn color="red darken-4" class="mr-2" to="/login">
        <span class="mr-2">Login</span>
        <v-icon>mdi-login</v-icon>
      </v-btn>
      <v-btn color="red darken-4">
        <span class="mr-2">Logout</span>
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>

    <v-app-bar color="black" class="hidden-md-and-up" app dark>
      <v-btn color="red darken-4" class="mr-2" to="/">
        <span class="mr-2">Home</span>
        <v-icon>mdi-home</v-icon>
      </v-btn>
      <v-btn color="red darken-4" to="/albums">
        <span class="mr-2">Albums</span>
        <v-icon>mdi-album</v-icon>
      </v-btn>
      <v-spacer></v-spacer>

      <v-dialog
        v-model="dialog"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
        ><template v-slot:activator="{ on }">
          <v-app-bar-nav-icon v-on="on" dark></v-app-bar-nav-icon> </template
        ><v-card>
          <v-app-bar color="black" dark>
            <v-btn
              color="red darken-4"
              class="mr-2"
              to="/"
              @click.native="dialog = false"
            >
              <span class="mr-2">Home</span>
              <v-icon>mdi-home</v-icon>
            </v-btn>
            <v-btn
              color="red darken-4"
              to="/albums"
              @click.native="dialog = false"
            >
              <span class="mr-2">Albums</span>
              <v-icon>mdi-album</v-icon>
            </v-btn>
            <v-spacer></v-spacer>

            <v-btn icon @click.native="dialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-app-bar>

          <v-list>
            <v-list-item
              v-for="(item, index) in menu"
              :key="index"
              :to="item.link"
              @click.native="dialog = false"
            >
              <v-list-item-action>
                <v-icon v-if="item.icon">{{ item.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title :title="item.title">{{
                  item.title
                }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-dialog>
    </v-app-bar>

    <v-main style="padding: 67px 0px 0px">
      <v-container>
        <router-view />
      </v-container>
    </v-main>

    <v-footer dark padless>
      <v-card class="flex" flat tile>
        <v-card-text class="py-3 white--text text-center">
          © {{ new Date().getFullYear() }} <strong>Pitchfork</strong>
        </v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data() {
    return {
      menu: [
        { icon: "mdi-account-plus", title: "Register", link: "/register" },
        { icon: "mdi-login", title: "Login", link: "/login" },
        { icon: "mdi-logout", title: "Logout" },
      ],
      toggleMenu: false,
      dialog: false,
    };
  },

  methods: {
    menuItems() {
      return this.menu;
    },
  },
  computed: {
    showMenu() {
      return this.toggleMenu || this.$vuetify.breakpoint.mdAndUp;
    },
  },
};
</script>
