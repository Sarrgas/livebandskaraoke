<template>
    <div>
        <div v-for="(reg, i) in registrations" :key="i">
            <RegistrationListItem :registration="reg" />
        </div>
    </div>
</template>

<script>
import RegistrationListItem from './RegistrationListItem';

export default {
    name: 'RegistrationTracker',
    components: {RegistrationListItem},
    data() {
        return {
            registrations: this.$store.state.trackedRegistrations
        }
    }
}
</script>

<style>

</style>