<template>
  <v-form v-model="valid" @submit.prevent="submit" ref="form">
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model="firstname"
            :rules="nameRules"
            label="First name"
            required
            outlined
            clearable
            full-width
            prepend-inner-icon="mdi-account"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model="lastname"
            :rules="nameRules"
            label="Last name"
            required
            outlined
            clearable
            full-width
            prepend-inner-icon="mdi-account"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
            <SongpickerDialog />
        </v-col>
      </v-row>

      <v-row>
        <v-btn
            :disabled="!valid"
            color="success"
            class="mx-4"
            type="submit"
        >
            Submit song
        </v-btn>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import SongpickerDialog from './SongpickerDialog'

export default {
    name: 'SongrequestForm',
    components: { SongpickerDialog },
    data: () => ({
        valid: false,
        firstname: '',
        lastname: '',
        song: '',
        nameRules: [
            v => !!v || 'Name is required'
        ]
    }),
    watch: {
      firstname: function(newvalue){
        this.$store.commit('setFirstname', newvalue);
      },
      lastname: function(newvalue){
        this.$store.commit('setLastname', newvalue);
      },
      song: function(newvalue){
        this.$store.commit('setSong', newvalue);
      },
    },
    computed: {
        songlist() {
            return this.$store.getters.getSongsDisplayName;
        },
    },
    methods: {
        submit() {
            const songrequest = {
                firstname: this.$store.state.firstname,
                lastname: this.$store.state.lastname,
                song: this.$store.state.song
            }
            this.$store.dispatch('submit', songrequest);

            this.$refs.form.reset();
        }
    },
    mounted(){
        this.song = this.$store.state.song;
        this.firstname = this.$store.state.firstname;
        this.lastname = this.$store.state.lastname;
    }
}
</script>

<style>
.v-list-item__title{
    white-space: normal !important;
}
</style>