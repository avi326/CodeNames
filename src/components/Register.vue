<template>
    <div id="register">
        <div> 
            <b-card>
                <h2> Register </h2>
                <form @submit.prevent="registerGame">
                    <b-form-input v-model="name" placeholder="Enter your name"></b-form-input>
                    <b-button type="submit" variant="primary">Submit</b-button>
                <p v-if="feedback"> {{ feedback }} </p>
                </form>
            </b-card>
        </div>


    </div>
</template>

<script>
export default {
    name: 'Register',
    data () {
        return {
        name: null,
        feedback: null
        }
    },
    methods: {
        registerGame() {
            if (this.name){
                this.$router.push({name: 'Chat', params: { name: this.name}})

            }
            else{
                this.feedback = 'You must to fill a name.'

            }
        }
    }
}
</script>

<style scoped>

</style>