<template>
    <div class="new-message">
    <form @submit.prevent="addMessage">
        <label for="new-message"> New Message (enter to add) </label>
        <b-input type="text" name="new-message"> </b-input>
        <b-button type="submit" variant="primary">Submit</b-button>

    </form>
    </div>
</template>

<script>
export default {
    name: 'NewMessage',
    prop: ['name'],
    data () {
        return {
            newMessage: null
        }

    },
    methods: {
        addMessage () {
            console.log(this.newMessage, this.name, Date.now())
        }
    }
}
</script>

<style>

</style>
