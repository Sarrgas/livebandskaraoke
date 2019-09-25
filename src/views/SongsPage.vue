<template>
    <div>
        <span>Låtlista med alla låtar</span>
        <div v-for="(song, key) in songList" :key="key">
            {{ song }}
        </div>
    </div>
</template>

<script>
export default {
    name: 'SongsPage',
    data() {
        return {
            songList: this.$store.state.songList
        }
    }
}
</script>

<style>

</style>