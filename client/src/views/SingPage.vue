<template>
    <div>
        <SongrequestForm :songprop="song"/>
        <hr>
        <SongrequestTracker />
    </div>
</template>

<script>
import SongrequestForm from '../components/SongrequestForm'
import SongrequestTracker from '../components/SongrequestTracker'

export default {
    name: 'SingPage',
    components: { 
        SongrequestForm,
        SongrequestTracker
    },
    computed: {
        song(){
            return this.$route.params.song;
        }
    }
}
</script>

<style>

</style>

