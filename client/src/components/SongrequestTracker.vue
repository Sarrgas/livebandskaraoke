<template>
    <div>
        <div v-for="(reg, i) in songrequests" :key="i">
            <SongrequestListItem :songrequest="reg" />
        </div>
    </div>
</template>

<script>
import SongrequestListItem from './SongrequestListItem';

export default {
    name: 'SongrequestTracker',
    components: {SongrequestListItem},
    data() {
        return {
            songrequests: this.$store.state.trackedSongrequests
        }
    }
}
</script>

<style>

</style>