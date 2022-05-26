<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img
          :src="require('../assets/CRNhukqUkAA8r5y.jpg')"
          class="my-3"
          contain
          height="200"
        />
      </v-col>

      <v-col cols="12">
        <v-img
          :src="
            require('../assets/cbacf593ccdbc52f7089a47f5d4bfd6a-1200-80.jpg')
          "
          class="my-3"
          contain
          height="200"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "SiteIntro",
};
</script>

<style>
.v-main__wrap {
  background-color: #f5f5f5;
}
</style>
