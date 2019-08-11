<template>
    <div class="new-message">
    <form @submit.prevent="addGame">
        <button class="btn deep-purple"> add_game</button>  
    </form>
    <p v-if="newGame"> {{ newGame }} </p>
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

        // move to game after create col:
        this.$router.push({ name: 'Game', params: {player_one_alias: this.alias, turn: this.alias}}) 
    }
  }

  // לוח חדש, 
}
</script>

<style>

</style>
