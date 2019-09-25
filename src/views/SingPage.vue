<template>
    <div>
        <RegistrationForm />
        <hr>
        <RegistrationTracker />
    </div>
</template>

<script>
import RegistrationForm from '../components/RegistrationForm'
import RegistrationTracker from '../components/RegistrationTracker'

export default {
    name: 'SingPage',
    components: { 
        RegistrationForm,
        RegistrationTracker
    }
}
</script>

<style>

</style>