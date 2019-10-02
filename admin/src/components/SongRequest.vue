<template>
    <v-list-item two-line>

        <v-list-item-content>
            <v-list-item-title>{{ songrequest.firstname }} {{ songrequest.lastname }}</v-list-item-title>
            <v-list-item-subtitle> {{ songrequest.song }}</v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-action>
            <v-btn icon @click="removeSongRequest">
                <v-icon color="red">mdi-close-circle</v-icon>
            </v-btn>
        </v-list-item-action>

    </v-list-item>
</template>

<script>
export default {
    name: 'SongRequest',
    props: ['songrequest'],
    methods: {
        removeSongRequest(){
            this.$store.dispatch('removeSongrequestFromQueue', this.songrequest);
        }
    }
}
</script>

<style scoped>
.v-list-item__subtitle{
    white-space: normal !important;
}
</style>