<template>
    <div>
        <SongrequestForm />
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
    }
}
</script>

<style>

</style>