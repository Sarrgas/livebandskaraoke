<template>
    <v-list-item two-line>

        <v-list-item-avatar> {{song.number}} </v-list-item-avatar>
        <v-list-item-content>
            <v-list-item-title>{{ song.artist }}</v-list-item-title>
            <v-list-item-subtitle>{{ song.song }}</v-list-item-subtitle>
        </v-list-item-content>

    </v-list-item>
</template>

<script>
export default {
    name: 'SongItem',
    props: ['song'],
}
</script>

<style scoped>
.v-list-item__subtitle{
    white-space: normal !important;
}
.router-link-active{
    text-decoration: none;
}
</style>