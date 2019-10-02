<template>
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
        <template v-slot:activator="{ on }">
            <v-text-field
            :rules="songRules"
            :value="currentSong"
            label="Pick a song"
            required
            v-on="on"
            readonly
            outlined
            clearable
            @click:clear="clearSong"
            prepend-inner-icon="mdi-microphone-variant"
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
            <v-toolbar dense class="mb-2 searchbar">
                <v-icon>mdi-magnify</v-icon>
                <v-text-field hide-details single-line v-model="input"></v-text-field>
            </v-toolbar>  
            <div>
                <div v-for="(song, index) in songList" :key="index">
                    <v-list-item two-line :ripple="false" @click="setSong(song)">
                        <v-list-item-avatar> {{index + 1}} </v-list-item-avatar>
                        <v-list-item-content>
                            <v-list-item-title>{{song.artist}}</v-list-item-title>
                            <v-list-item-subtitle>{{song.song}}</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </div>
            </div>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: 'SongpickerDialog',
    data(){
        return {
            input: '',
            dialog: false,
            songRules: [
                v => !!v || 'Song is required'
            ],
        }
    },
    methods: {
        search(song){
            let regex = /[^a-zA-Z0-9]/gm;
            let displayname = song.displayName.toLowerCase().replace(regex, '');
            let search = this.input ? this.input.toLowerCase().replace(regex, '') : '';

            return displayname.includes(search);
        },
        setSong(song){
            this.$store.commit('setSong', song.displayName);
            this.dialog = false;
        },
        clearSong(){
            this.$store.commit('setSong', '');
        }
    },
    computed: {
        currentSong(){
            return this.$store.state.song || '';
        },
        songList(){
            window.scrollTo(0, 0);
            return this.$store.getters.getSongs.filter(song => this.search(song));
        }
    }
}
</script>

<style scoped>
.searchbar{
    position: -webkit-sticky;
    position: sticky;
    top: 56px;
    width: 100%;
    z-index: 100;
}
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