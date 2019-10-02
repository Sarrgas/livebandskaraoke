<template>
     <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
        <template v-slot:activator="{ on }">
            <v-btn class="mx-2" fab dark color="indigo" v-on="on" fixed bottom right>
                <v-icon dark>mdi-plus</v-icon>
            </v-btn>
        </template>
        <v-card>
            <v-toolbar dark color="indigo" class="fixed-bar">
                <v-btn icon dark @click="dialog = false">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title>Ny låt</v-toolbar-title>
            </v-toolbar>
            <div>
                <v-form v-model="valid" @submit.prevent="submit" ref="form">
                    <v-container>
                    <v-row>
                        <v-col cols="12">
                        <v-text-field
                            v-model="artist"
                            :rules="nameRules"
                            label="Artist"
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
                            v-model="songname"
                            :rules="nameRules"
                            label="Låt"
                            required
                            outlined
                            clearable
                            full-width
                            prepend-inner-icon="mdi-microphone-variant"
                        ></v-text-field>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-btn
                            :disabled="!valid"
                            color="success"
                            class="mx-4"
                            type="submit"
                        >
                            Spara låt
                        </v-btn>
                    </v-row>
                    </v-container>
                </v-form>
            </div>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: 'NewSongDialog',
    data(){
        return {
            valid: false,
            dialog: false,
            artist: '',
            songname: '',
            nameRules: [
                v => !!v || 'Får inte vara blankt'
            ]
        }
    },
    methods: {
        submit() {
            const song = {
                artist: this.artist,
                song: this.songname,
                displayName: `${this.artist} - ${this.song}`
            }
            this.$store.dispatch('addSong', song);
            this.$refs.form.reset();
        }
    },
}
</script>

<style scoped>

</style>