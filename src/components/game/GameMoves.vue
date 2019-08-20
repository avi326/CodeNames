<template>
    <div class="game_moves">

    <div v-if="turn">
      <b-card>
         
      <div v-if="need_to_fix">
        <p>  תקן את הניחוש הקודם שלך</p>
      </div>
      <div v-if="need_to_guess">
        <p> נחש את ההגדרה הנוכחית</p>
      </div>
      <div id="define">
        <p> אתגר את השחקן השני! </p>
        <MultiSelectWords v-if="startTurn!=null" :blue_words="'blue_words_player_one'"/>
        <MultiSelectWords v-else :blue_words="'blue_words_player_two'"/>
      </div>
      </b-card>
    </div>
    <div v-else>
        <h3> מהלכים </h3>
            <b-card>
                <ul class="messages" v-chat-scroll> <!-- print all message -->
                <li v-for="move in moves" :key="move.id">
                    <span class="define">{{ move.define }}</span>
                    <span class="num_of_words">{{ move.num_of_words }}</span>
                </li>
                </ul>
            </b-card>
    </div>
            
    </div>

</template>

<script>
import MultiSelectWords from '@/components/game/MultiSelectWords'
import db from '@/firebase/init'
import moment from 'moment'

export default {
  name: 'GameMoves',
  props: ['startTurn'],
  components: {
    MultiSelectWords
  },
  data(){
    return{
      moves: [],
      turn: null,
      need_to_fix: null,
      need_to_guess: null
    }
  },created () {
    this.turn = this.startTurn
  },
  mounted(){
    // the control in moves 
    //TODO: Get the right moves from the specific game. First need to create the collection (look at other TODO)
    let ref = db.collection('games').doc('UwaFbzVh4MPyhzLbDNrx').collection('moves')
    
    // subscribe to changes to the 'messages' collection
    ref.onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        console.log(change)
        if(change.type == 'added'){
          let doc = change.doc
          this.moves.push({
            define: doc.data().define,
            num_of_words: doc.data().num_of_words,
          })

          this.replaceTurn();

        }
      })
    })
  },
  methods: {
        replaceTurn () {
      if (this.turn) {
        this.turn = null 
      } else {
        this.turn = true
      }
    },
    play_the_turn() {

    },
    check_if_first_move () {
      
    var ref = db.collection('games').doc('UwaFbzVh4MPyhzLbDNrx');
    // var cityRef = db.collection('games').doc('UwaFbzVh4MPyhzLbDNrx').set({player_one_alias: this.player_one_alias, player_two_alias: this.player_two_alias})
    var getDoc = ref
    .get()
    .then(doc => {
        if (!doc.exists) {
        console.log('No such document!');
        } else {

        } 
    })
    }
  }
}
</script>

<style scoped>
span.define {
color: rgb(138, 131, 42);
font-size: 25px
}

span.num_of_words {
font-size: 25px;
color: rgb(76, 77, 24);
font-style: inherit
}

.messages{
  max-height: 300px;
  overflow: auto;
}
.messages::-webkit-scrollbar {
  width: 3px;
}
 
.messages::-webkit-scrollbar-track {
  background: #ddd;
}
 
.messages::-webkit-scrollbar-thumb {
  background: #aaa; 
}

</style>
