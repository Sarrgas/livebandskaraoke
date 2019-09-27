<template>
    <v-list-item>
        <v-list-item-avatar color="grey lighten-2">{{positionInQueue}}</v-list-item-avatar>
        <v-list-item-content>
        <v-list-item-title>{{ songrequest.firstname }} {{ songrequest.lastname }}</v-list-item-title>
        <v-list-item-subtitle v-text="songrequest.song"></v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-action>
            <ConfirmDialog :songrequest="songrequest"/>
        </v-list-item-action>
    </v-list-item>
</template>

<script>
import ConfirmDialog from './ConfirmDialog'

export default {
    name: 'songrequestListItem',
    props: ['songrequest'],
    components: {ConfirmDialog},
    computed: {
        positionInQueue(){
            console.log('Run positionInQueue');
            let sortedList = this.$store.getters.getSortedSongrequestList;
            return sortedList.findIndex(i => i.id == this.songrequest.id) +1;
        }
    }
}
</script>

<style>

</style>