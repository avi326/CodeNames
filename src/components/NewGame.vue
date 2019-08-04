<template>
    <div class="new-message">
    <form @submit.prevent="addGame">
      <input type="text" name="new-message" v-model="newGame">
      <button class="btn deep-purple">add game</button>
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
      if(this.newGame){
        db.collection('table_of_players').add({
          player1: "blabla",
          player2: "",
          time: Date.now()
        }).catch(err => {
          console.log(err)
        })
        this.newGame = null
        this.feedback = null
      } else {
        this.feedback = 'You must enter a message in order to send one'
      }
    }
  }
}
</script>

<style>

</style>
