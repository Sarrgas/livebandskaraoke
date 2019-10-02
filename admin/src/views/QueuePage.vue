<template>
    <div>
        <div v-for="(request, index) in queue" :key="index">
            <SongRequest :songrequest="request" />
        </div>
    </div>
</template>

<script>
import SongRequest from '../components/SongRequest'

export default {
    name: 'Queue',
    components: {SongRequest},
    computed: {
        queue(){
            return this.$store.getters.getSortedSongrequestList;
        }
    }
}
</script>

<style scoped>

</style>

