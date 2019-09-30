<template>
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
        <template v-slot:activator="{ on }">
            <v-text-field
            :rules="songRules"
            :label="label"
            required
            v-on="on"
            readonly
            ></v-text-field>
        </template>
        <v-card>
            <v-toolbar dark color="indigo" class="fixed-bar">
                <v-btn icon dark @click="dialog = false">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title>Pick a song</v-toolbar-title>
            </v-toolbar>
            <div class="filler"></div>
            <SongsPage />
        </v-card>
    </v-dialog>
</template>

<script>
import SongsPage from '../views/SongsPage'

export default {
    name: 'SongpickerDialog',
    components: { SongsPage },
    data(){
        return {
            dialog: false,
            songRules: [
                v => !!v || 'Song is required'
            ],
        }
    },
    computed: {
        label(){
            return this.$store.state.song || "Pick a song";
        }
    }
}
</script>

<style scoped>
.fixed-bar {
    position: fixed;
    width: 100%;
    z-index: 100;
}
.filler{
    position:relative;
    height: 56px;
}
</style>