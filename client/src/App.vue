<template>
  <v-app>
    <v-app-bar app>
      <v-tabs
      fixed-tabs
      background-color="indigo"
      dark
    >
      <v-tab href="#sing" :to="{name: 'sing'}">
        Sing
      </v-tab>
      <v-tab href="#songs" :to="{name: 'songs'}">
        Songs
      </v-tab>
    </v-tabs>
  </v-app-bar>

    <v-content>
      <v-container>
        <v-layout>
          <v-flex grow class="hidden-md-and-down"></v-flex>
          <v-flex>
            <router-view />
          </v-flex>
          <v-flex grow class="hidden-md-and-down"></v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  mounted() {
    this.$store.dispatch('init');
  }
};
</script>
