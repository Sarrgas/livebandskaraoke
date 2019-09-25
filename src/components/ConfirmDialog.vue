<template>
  <v-dialog
        v-model="dialog"
        width="500"
        eager
      >
        <template v-slot:activator="{ on }">
            <v-btn icon>
                <v-icon color="red" v-on="on">mdi-close-circle</v-icon>
            </v-btn>
        </template>
  
        <v-card>
          <v-card-title
            class="headline red lighten-3"
            primary-title
            dark
          >
            Remove from queue?
          </v-card-title>
  
          <v-card-text>
            <p class="body-1">
                This will remove you from the Karaoke queue.<br>
                Are you sure?
            </p>
          </v-card-text>
  
          <v-divider></v-divider>
  
         <v-card-actions>
            <div class="flex-grow-1"></div>
            <v-btn color="grey darken-1" text @click="dialog = false">Cancel</v-btn>
            <v-btn color="red darken-1" text @click="removeRegistration">Yes, remove me</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
</template>

<script>
export default {
    props: ['registration'],
    data(){
        return {
            dialog: false,
        }
    },
    methods: {
        removeRegistration(){
            this.dialog = false;
            this.$store.commit('removeRegistration', this.registration);
        },
    }
}
</script>

<style>

</style>