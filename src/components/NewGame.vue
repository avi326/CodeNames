<template>
    <div class="new-message">
    <form @submit.prevent="addGame">
      <button class="btn deep-purple" :to="{ name: 'Game'}">add_game</button> 
      <!-- , params: {player_one_alias: this.alias}  -->
      <p v-if="feedback">{{ feedback }}</p>
    </form>
    </div>
</template>

<script>
import db from '@/firebase/init'
export default {
  name: 'NewGame',
  props: ['alias'],
  data(){
    return{
      newGame: null,
      feedback: null
    }
  },
  methods: {
    addGame(){
        db.collection('table_of_players').add({
            player1: this.alias,
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
