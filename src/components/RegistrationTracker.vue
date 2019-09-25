<template>
    <div>
        <v-list-item
            v-for="reg in registrations"
            :key="reg.song"
            >
            <v-list-item-content>
            <v-list-item-title>{{ reg.firstname }} {{ reg.lastname }}</v-list-item-title>
            <v-list-item-subtitle v-text="reg.song"></v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
            <v-btn icon>
                <v-icon color="red">mdi-close-circle</v-icon>
            </v-btn>
            </v-list-item-action>
        </v-list-item>
    </div>
</template>

<script>
export default {
    name: 'RegistrationTracker',
    data() {
        return {
            registrations: this.$store.state.registrations
        }
    }
}
</script>

<style>

</style>