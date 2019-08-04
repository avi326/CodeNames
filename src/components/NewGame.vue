<template>
    <div class="new-message">
    <form @submit.prevent="addGame">
      <button class="btn deep-purple">add_game</button>
      <p v-if="feedback">{{ feedback }}</p>
    </form>
    </div>
</template>

<script>
import db from '@/firebase/init'
export default {
  name: 'NewGame',
  props: ['name'],
  data(){
    return{
      newGame: null,
      feedback: null
    }
  },
  methods: {
    addGame(){
        db.collection('table_of_players').add({
            player1: "blabla",
            player2: "",
            countPlayers: 1,
            time: Date.now()
        }).catch(err => {
            console.log(err)
        })
        this.newGame = null
        this.feedback = null
    }
  }
}
</script>

<style>

</style>
