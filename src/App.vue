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
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App'
};
</script>
