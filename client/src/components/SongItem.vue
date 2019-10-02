<template>
    <v-list-item two-line>

        <v-list-item-avatar> {{song.number}} </v-list-item-avatar>
        <v-list-item-content>
            <v-list-item-title>{{ song.artist }}</v-list-item-title>
            <v-list-item-subtitle>{{ song.song }}</v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-action>
            <v-btn icon @click="setSong" elevation="3">
                <v-icon>mdi-microphone-variant</v-icon>
            </v-btn>
        </v-list-item-action>

    </v-list-item>
</template>

<script>
export default {
    name: 'SongItem',
    props: ['song'],
    methods: {
        setSong(){
            this.$store.commit('setSong', this.song.displayName);
            this.$router.push('/');
        }
    }
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