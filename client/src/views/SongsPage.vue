<template>
    <div>
        <v-toolbar dense class="mb-2 searchbar">
            <v-icon>mdi-magnify</v-icon>
            <v-text-field hide-details single-line v-model="input"></v-text-field>
        </v-toolbar>  
                    
        <div v-for="(song, index) in songList" :key="index">
            <SongItem :song="song" :index="index"/>
        </div>
    </div>
</template>

<script>
import SongItem from '../components/SongItem';

export default {
    name: 'SongsPage',
    components: {SongItem},
    data() {
        return {
            input: '',
        }
    },
    methods: {
        search(song){
            let regex = /[^a-zA-Z0-9]/gm;

            let displayname = song.displayName.toLowerCase().replace(regex, '');
            let search = this.input.toLowerCase().replace(regex, '');

            return displayname.includes(search);
        }
    },
    computed: {
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
</style>