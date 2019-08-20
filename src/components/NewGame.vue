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
import { constants } from 'fs';
export default {
  name: 'NewGame',
  props: ['alias'],
  data(){
    return{
      newGame: null,
    }
  },
  methods: {
    addGame()
    {
      if(this.alias == null)
      {
        this.feedback = 'Please singup or singin before adding a game (guest can not create a new game)'
        window.alert("Please singup or singin before adding a game (guest can not create a new game")
        return;
      }

      //If not a guest
      let refGames = db.collection('games').doc(this.alias)
      refGames.get().then(doc => {
        if(doc.exists){
          this.feedback = 'This player already have a live game'
          window.alert("This player already have a live game")
        }        
        else{
          db.collection('table_of_players').doc(this.alias).set({
              player1: this.alias,
              player2: "",
              countPlayers: 1,
              time: Date.now()
          }).catch(err => {
              console.log(err)
          })

          this.newGame = null

          //let words = db.collection('words').doc('test_group').get('50array')
          var words = ["גבוה","נשיא","עולם","אדמה","תרנגול","פצצה","רמקול","אש","ירושלים","יד","סרטן","כנף","תקרה","ארוחה","כוכב","חזק","איראן","גרגיר","משחק","דשא","עציץ","כדור","עט","חם","דף","אש","ארנק","מחשב","מכנס","חולצה","מראה","מדף","מזגן","שלט","קיר","צבע","כבל","מטען","מפה","סיכה","רעש","גלגל","אבק","קרש","בטריה","ספר","אות","קר","חם","מושב","עיר"]

          var randomCell;
          var tableBoard = new Array();
          var black_list_one = new Array();
          var black_list_two = new Array();
          var blue_list_one = new Array();
          var blue_list_two = new Array();
          var map_board_player_one = new Array(25);
          var map_board_player_two = new Array(25);

          while(tableBoard.length != 25) // exectaly 25 words to board game
          {
            randomCell = Math.floor(Math.random() * words.length);
            if(!tableBoard.includes(words[randomCell]))
            {
              tableBoard.push(words[randomCell])
            }              
          }

          // exectaly 4 different words to each black list
          while(black_list_one.length != 4) 
          {
            randomCell = Math.floor(Math.random() * tableBoard.length);
            if(!black_list_one.includes(tableBoard[randomCell]))
            {
              black_list_one.push(tableBoard[randomCell])
            }              
          }

          while(black_list_two.length != 4) 
          {
            randomCell = Math.floor(Math.random() * tableBoard.length);
            if(!black_list_two.includes(tableBoard[randomCell]) && !black_list_one.includes(tableBoard[randomCell]))
            {
              black_list_two.push(tableBoard[randomCell])
            }              
          }

          // exectaly 8 different words to each blue list
          while(blue_list_one.length != 8) 
          {
            randomCell = Math.floor(Math.random() * tableBoard.length);
            if(!black_list_two.includes(tableBoard[randomCell]) && 
                !black_list_one.includes(tableBoard[randomCell]) &&
                !blue_list_one.includes(tableBoard[randomCell]))
            {
              blue_list_one.push(tableBoard[randomCell])
            }              
          }

          while(blue_list_two.length != 8) 
          {
            randomCell = Math.floor(Math.random() * tableBoard.length);
            if(!black_list_two.includes(tableBoard[randomCell]) && 
                !black_list_one.includes(tableBoard[randomCell]) &&
                !blue_list_one.includes(tableBoard[randomCell]) &&
                !blue_list_two.includes(tableBoard[randomCell]))
            {
              blue_list_two.push(tableBoard[randomCell])
            }              
          }
          
          var i;
          //Moving on the table words board and mapping the 2 players map game.
          for(i=0; i < 25; i++)
          {
            //Mapping conditations for player one
            if(black_list_one.includes(tableBoard[i])) // not exceed from black list
            {
              map_board_player_one[i] = "black"
              continue;
            }
            else if(blue_list_one.includes(tableBoard[i]))
            {
              map_board_player_one[i] = "blue"
              continue;
            }
            else
            {
              map_board_player_one[i] = "empty"
              continue;
            }
          }

          for(i=0; i < 25; i++)
          {
            //Mapping conditations for player two
            if(black_list_two.includes(tableBoard[i])) 
            {
              map_board_player_two[i] = "black"
              continue;
            }
            else if(blue_list_two.includes(tableBoard[i]))
            {
              map_board_player_two[i] = "blue"
              continue;
            }
            else
            {
              map_board_player_two[i] = "empty"
              continue;
            }
          }          

          //TODO: Need to add the Moves and Chat as new collections
          refGames.set({
                alias_player_one: this.alias,
                alias_player_two: "",
                black_words_player_one: black_list_one,
                black_words_player_two: black_list_two,
                blue_words_player_one: blue_list_one,
                blue_words_player_two: blue_list_two,
                map_player_one: map_board_player_one,
                map_player_two: map_board_player_two,
                num_of_moves: 0,
                table_board: tableBoard,
                turn: 1
            }).catch(err => {
                console.log(err)
          })

          // move to game after create row:
          this.$router.push({ name: 'Game', params: {player_one_alias: this.alias, turn:this.alias}}) 
        }
      })
    }
  }

  // לוח חדש, 
}
</script>

<style>

</style>
