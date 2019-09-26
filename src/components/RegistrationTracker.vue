<template>
    <div>
        <v-list-item
            v-for="reg in registrations"
            :key="reg.song"
            >
            <v-list-item-avatar color="grey lighten-2">{{myPositionInQueue}}</v-list-item-avatar>
            <v-list-item-content>
            <v-list-item-title>{{ reg.firstname }} {{ reg.lastname }}</v-list-item-title>
            <v-list-item-subtitle v-text="reg.song"></v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
             <ConfirmDialog :registration="reg"/>
            </v-list-item-action>
        </v-list-item>
    </div>
</template>

<script>
import ConfirmDialog from './ConfirmDialog'

export default {
    name: 'RegistrationTracker',
    components: {ConfirmDialog},
    data() {
        return {
            registrations: this.$store.state.trackedRegistrations
        }
    },
    computed: {
        myPositionInQueue(){
            return this.$store.getters.myPositionInQueue;
        }
    },
    methods: {
        removeRegistration(registration){
            this.$store.commit('removeRegistration', registration);
        }
    }
}
</script>

<style>

</style>