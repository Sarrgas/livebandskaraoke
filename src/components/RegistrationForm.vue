<template>
  <v-form v-model="valid" @submit.prevent="submit" ref="form">
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
            <p>Your name</p>
          <v-text-field
            v-model="firstname"
            :rules="nameRules"
            label="First name"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
            v-model="lastname"
            :rules="nameRules"
            label="Last name"
            required
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="4">
            <p>Pick a song</p>

            <v-overflow-btn
            class="my-2"
            :items="songlist"
            :rules="songRules"
            v-model="song"
            label="Songs"
            editable
            item-value="text"
            ></v-overflow-btn>
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
export default {
    name: 'RegistrationForm',
    data: () => ({
        valid: false,
        firstname: '',
        lastname: '',
        song: '',
        nameRules: [
            v => !!v || 'Name is required'
        ],
        songRules: [
            v => !!v || 'Song is required'
        ],
    }),
    computed: {
        songlist() {
            return this.$store.state.songList;
        }
    },
    methods: {
        submit() {
            const songrequest = {
                firstname: this.firstname,
                lastname: this.lastname,
                song: this.song
            }
            this.$store.commit('trackRegistration', songrequest);

            this.$refs.form.reset();
        }
    }
}
</script>

<style>

</style>