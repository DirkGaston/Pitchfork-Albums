<template>
  <v-app>
    <v-app-bar app class="black" dark>
      <v-btn color="red darken-4" to="/albums">
        <span class="mr-2">Albums</span>
        <v-icon>mdi-album</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn color="red darken-4" class="mr-2" to="/register">
        <span class="mr-2">Register</span>
        <v-icon>mdi-bell-badge</v-icon>
      </v-btn>
      <v-btn color="red darken-4" class="mr-2" to="/login">
        <span class="mr-2">Login</span>
        <v-icon>mdi-bell-badge</v-icon>
      </v-btn>
      <v-btn color="red darken-4">
        <span class="mr-2">Logout</span>
        <v-icon>mdi-bell-badge</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
};
</script>
