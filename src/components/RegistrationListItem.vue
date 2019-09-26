<template>
    <v-list-item>
        <v-list-item-avatar color="grey lighten-2">{{positionInQueue}}</v-list-item-avatar>
        <v-list-item-content>
        <v-list-item-title>{{ registration.firstname }} {{ registration.lastname }}</v-list-item-title>
        <v-list-item-subtitle v-text="registration.song"></v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-action>
            <ConfirmDialog :registration="registration"/>
        </v-list-item-action>
    </v-list-item>
</template>

<script>
import ConfirmDialog from './ConfirmDialog'
export default {
    name: 'RegistrationListItem',
    props: ['registration'],
    components: {ConfirmDialog},
    computed: {
        positionInQueue(){
            console.log('Run positionInQueue');
            let sortedList = this.$store.getters.getSortedRegistrationList;
            return sortedList.findIndex(i => i.id == this.registration.id) +1;
        }
    }
}
</script>

<style>

</style>