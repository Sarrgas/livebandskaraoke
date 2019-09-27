<template>
    <div>
        <v-toolbar dense class="mb-2 searchbar">
            <v-icon>mdi-magnify</v-icon>
            <v-text-field hide-details single-line v-model="search"></v-text-field>
        </v-toolbar>  
                    
        <div v-for="(song, index) in songList" :key="index">
            <SongItem :song="song"/>
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
            search: '',
        }
    },
    computed: {
        songList(){
            window.scrollTo(0, 0);
            return this.$store.getters.getSongs.filter(song => song.displayName.toLowerCase().includes(this.search.toLowerCase()));
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