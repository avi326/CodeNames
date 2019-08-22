<template>
    <div class="game_moves">

    <div v-if="turn">
      <b-card>
         
      <div v-if="need_to_fix">
        <p>  תקן את הניחוש הקודם שלך</p>
      </div>
      <div v-if="need_to_guess"> 
        <p> נחש את ההגדרה הנוכחית</p>
        <GuessDefine :ref_db="ref_db"/>
      </div>
      <div id="define" v-if="!need_to_guess">
        <p> אתגר את השחקן השני! </p>
        <MultiSelectWords v-if="startTurn!=null" :blue_words="'blue_words_player_one'" :setAppGetData="setAppGetData"  :ref_db="ref_db"/>
        <MultiSelectWords v-else :blue_words="'blue_words_player_two'" :setAppGetData="setAppGetData"  :ref_db="ref_db"/>
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
            <b-card v-if="words_worng_guess"> 
                <p> היריב טעה בניחוש המילים שלך </p>
            </b-card>
    </div>
            
    </div>

</template>

<script>
import MultiSelectWords from '@/components/game/MultiSelectWords'
import GuessDefine from '@/components/game/GuessDefine'
import db from '@/firebase/init'
import moment from 'moment'

export default {
  name: 'GameMoves',
  props:{ startTurn: String,
          ref_db: Object
        },
  components: {
    MultiSelectWords,
    GuessDefine
  },
  data(){
    return{
      moves: [],
      turn: null,
      need_to_fix: null,
      need_to_guess: null,
      define_word: null,
      words: null,
      words_right_guess: null,
      words_worng_guess: null
      
    }
  },created () {
    this.turn = this.startTurn
  },
  mounted(){
    // the control in moves 
    var ref = this.ref_db.collection('moves').orderBy('timestamp');
    
    // subscribe to changes to the 'moves' collection
    ref.onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        // console.log(change)
        if(change.type == 'added'){
          let doc = change.doc
          this.moves.push({
            define: doc.data().define,
            num_of_words: doc.data().num_of_words,
          })
            if (!this.check_if_first_move) {

            }
            else {
                this.need_to_guess=true
                this.replaceTurn();
            }
            

        }
      })
    })
    this.check_my_guess() // for the player that guess.
    this.check_rival_guess() // for the rival that waiting.
  },
  methods: {
        setAppGetData (data) {
          this.define_word = data
        },

        replaceTurn () {

          console.log("replace turn")

          if (this.turn ) {
            this.turn = null 
          } else {
            this.turn = true
          }
    },
    play_the_turn() {

    },
    check_if_first_move () {
      
    var ref = this.ref_db.collection('moves');
    var getDoc = ref
    .get()
    .then(doc => {
        if (!doc.exists) {
          console.log('No such document!');
          return true;

        } else {
          return false;

        } 
    })
    }, check_my_guess () {

              var ref = this.ref_db.collection('moves').orderBy('timestamp')
                ref.onSnapshot(snapshot => {
                snapshot.docChanges().forEach(change => {
                    console.log(change)
                    if(change.type == 'modified'){
                    let doc = change.doc
                    this.words = doc.data().words
                    this.words_right_guess = doc.data().words_right_guess
                    this.words_worng_guess = doc.data().words_worng_guess
                    if (this.words_worng_guess) {
                        console.log("my guess is worng",this.words_worng_guess)
                        this.need_to_guess=false
                    } else if (this.words.length == this.words_right_guess.length) {
                        console.log("OMG! complete guess!",this.words_right_guess.length)
                        this.need_to_guess=false
                    }
                    }
                })
    })

 
    },

check_rival_guess () {

      var ref = this.ref_db.collection('moves').orderBy('timestamp')
    ref.onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        console.log(change)
        if(change.type == 'modified'){
          let doc = change.doc
          this.words_worng_guess = doc.data().words_worng_guess
          if (this.words_worng_guess) {
            console.log("there is worng guess",this.words_worng_guess)
          } else {
            console.log("right guess",this.words_worng_guess)
          }
        }
      })
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
