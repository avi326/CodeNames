<template>
    <div id="guide">
        <h1> Table Of Games </h1>
        <Register/>
    </div>
</template>

<script>
import Register from '@/components/Register'
import firebase from 'firebase'

export default {
    name: 'TableOfGames',
    data () {
        return {

        }
    },
  components: {
    Register
  },
  mounted () {
    console.log(firebase.auth().currentUser)
  }
}
</script>

<style>

</style>
