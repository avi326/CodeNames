<template>
    <div id="chat">
        <div> 
            <b-card>
                <h2> chat </h2>
                <form @submit.prevent="enterChat">
                    <b-form-input v-model="name" placeholder="Enter your name"></b-form-input>
                    <b-form-textarea
                    id="textarea"
                    v-model="text"
                    placeholder="Enter something..."
                    rows="3"
                    max-rows="6"
                    ></b-form-textarea>
                    <b-button type="submit" variant="primary">Submit</b-button>
                </form>
            </b-card>
            <h2> aad </h2>
        </div>


    </div>
</template>

<script>
export default {
    name: 'Chat',
    data () {
        return {
        name: '',
        text: ''

        }
    },
    methods: {
        enterChat() {
            console.log(this.name)
            console.log(this.text)
        }
    }
}
</script>

<style scoped>

</style>