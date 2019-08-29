<template>
    <div class="game_moves">

    <div v-if="turn">
      <b-card>
          <b-spinner small  variant="success" type="grow"></b-spinner>
          <circular-count-down-timer
        :initial-value="clock_time"
        :stroke-width="5"
        :seconds-fill-color="'#D3FFE6'"
        :minutes-fill-color="'#ACE7C5'"
        :size="80"
        :padding="4"
        :minute-label="'דקות'"
        :second-label="'שניות'"
        :show-second="true"
        :show-minute="true"
        :show-hour="false"
        :show-negatives="false"
        :notify-every="'minute'"
        @finish="time_over_replace_turn"
></circular-count-down-timer>

      <!-- <div v-if="need_to_fix">
        <p>  תקן את הניחוש הקודם שלך</p>
        <FixGuess :ref_db="ref_db" :move_doc_id="need_to_fix"/>
      </div> -->
      <div v-if="need_to_guess ">  <!-- && !need_to_fix -->
        <p> נחש את ההגדרה הנוכחית</p>
            <GuessDefine :ref_db="ref_db"/>
      </div>
      <div id="define" v-if="!need_to_guess">
        <b-card v-if="words_worng_guess">
                <ul class="words_worng_guess" v-chat-scroll> <!-- print all words_right_guess -->
                <li v-for="worng_word in words_worng_guess" :key="worng_word.id">
                    <span class="worng_word"> המילה  <b> {{ worng_word }} </b> איננה נכונה</span>
                </li>
                </ul>
        </b-card>
        <b-card v-else-if="words_right_guess && words && words_right_guess.length==words.length">
            <span class="right_word"> הצלחת לנחש את כל המילים!  </span>
        </b-card>
        <p> אתגר את השחקן השני! </p>
        <MultiSelectWords v-if="startTurn!=null" :blue_words="'blue_words_player_one'" :setAppGetData="setAppGetData"  :ref_db="ref_db"/>
        <MultiSelectWords v-else :blue_words="'blue_words_player_two'" :setAppGetData="setAppGetData"  :ref_db="ref_db"/>
      </div>
      </b-card>
    </div>
    <div v-else>
        <h3> מהלכים </h3>
            <b-card>
              <h5> תור היריב לשחק...   </h5>
              <p>  אתה יכול בנתיים להסתכל על הלוח ולתכנן את המהלך הבא! </p>
                  <circular-count-down-timer
                :initial-value="180"
                :stroke-width="5"
                :seconds-fill-color="'#D3FFE6'"
                :minutes-fill-color="'#ACE7C5'"
                :size="80"
                :padding="4"
                :minute-label="'דקות'"
                :second-label="'שניות'"
                :show-second="true"
                :show-minute="true"
                :show-hour="false"
                :show-negatives="false"
                :notify-every="'minute'"
        ></circular-count-down-timer>

                <ul class="messages" v-chat-scroll> <!-- print all message -->
                <li v-for="move in moves" :key="move.id">
                    <span class="define">{{ move.define }}</span>
                    <span class="num_of_words">{{ move.num_of_words }}</span>
                </li>
                </ul>
            </b-card>
            <b-card v-if="words_worng_guess"> 
             
                <ul class="words_worng_guess" v-chat-scroll> <!-- print all words_right_guess -->
                <li v-for="worng_word in words_worng_guess" :key="worng_word.id">
                    <span class="worng_word"> היריב בחר את המילה  <b> {{ worng_word }} </b> וטעה</span>
                </li>
                </ul>
            </b-card>
            <b-card v-else-if="words_right_guess && words && words_right_guess.length==words.length">
                 <p> היריב צדק בכל המילים שלך </p>
            </b-card>
    </div>
            
    </div>

</template>

<script>
import MultiSelectWords from '@/components/game/MultiSelectWords'
import GuessDefine from '@/components/game/GuessDefine'
import FixGuess from '@/components/game/FixGuess'
import db from '@/firebase/init'
import moment from 'moment'
import firebase from 'firebase'

export default {
  name: 'GameMoves',
  props:{ startTurn: String,
          ref_db: Object,
          conected_player: String
        },
  components: {
    MultiSelectWords,
    GuessDefine,
    FixGuess
  },
  data(){
    return{
      alias: null,
      moves: [],
      turn: null,
      need_to_fix: null,
      need_to_guess: null,
      define_word: null,
      words: null,
      words_right_guess: null,
      words_worng_guess: null,
      player_pass_guess: null,
      clock_time: 180
      
      
    }
  },created () {
    this.init_user_alias()
    this.turn = this.startTurn
  },
  mounted(){
    // check if need to fix the last turn
     this.check_if_need_fix ()
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
        // else if (change.type="modified") {
        //   let doc = change.doc
        //   var check_worng = doc.data().words_worng_guess
        //   console.log("check worng", doc.data().words_worng_guess)
        //   if (check_worng == null)
        //   {
        //     this.need_to_fix = null
        //   }  else {
        //     this.need_to_fix = doc.id
        //   }

        // }
      })
    })
    this.check_my_guess() // for the player that guess.
    this.check_rival_guess() // for the rival that waiting.
  },
  methods: {
        time_over_replace_turn () {

            // add empty move because the player dont to it.
            var ref = this.ref_db.collection('moves')
            ref.add({
                define: "לא הוגדרה מילה",
                num_of_words: 0,
                words: [],
                words_right_guess: null, // kind of temp array, for checking == 'words' array.
                words_worng_guess: null, // when guess worng word, add to this array.
                player_worng_guess: null, // when guess worng word, save the player
                player_pass_guess: null, // when player dont know the guess, and want pass
                timestamp: Date.now()
                }).catch(err => {
                console.log(err)
                })
        },

        setAppGetData (data) {
          this.define_word = data
        },
          updated_clock: (status) => {
              this.clock_time = 180
          },

        replaceTurn () {

          console.log("replace turn")

          if (this.turn ) {
            this.turn = null 
          } else {
            this.turn = true
          }

          this.updated_clock()
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
                    //console.log(change)
                    if(change.type == 'modified'){
                    let doc = change.doc
                    this.words = doc.data().words
                    this.words_right_guess = doc.data().words_right_guess
                    this.words_worng_guess = doc.data().words_worng_guess
                    this.player_pass_guess = doc.data().player_pass_guess
                    if (this.words_worng_guess) { //  && !this.need_to_fix
                        console.log("my guess is worng",this.words_worng_guess)
                        this.need_to_guess=false
                    } else if (this.words_right_guess && this.words.length == this.words_right_guess.length) {
                        console.log("OMG! complete guess!",this.words_right_guess.length)
                        this.need_to_guess=false
                    } else if (this.player_pass_guess) {
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
        //console.log(change)
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

},
                check_if_need_fix () {
                  var self = this;
                  console.log("alias need to fix: ", this.alias)
                  var ref = this.ref_db.collection("moves").where("player_worng_guess", "==", this.conected_player)
                  .onSnapshot(

                      function(querySnapshot) {
                        console.log("querySnapshot to fix: ", querySnapshot)
                        

                        if (querySnapshot.empty) {
                          self.need_to_fix = null
                      } else {
                          querySnapshot.forEach(function(doc) {
                          console.log("move to fix:", doc)
                          self.need_to_fix = doc.id
                        });
                        
                      }




                    })
                },

                init_user_alias() {
                    let user = firebase.auth().currentUser;

                    //console.log(user)

                    if(user){
                        db.collection('users').where('user_id', '==', user.uid).get()
                          .then(snapshot => {
                            snapshot.forEach((doc) => {
                             this.alias = doc.id
                             console.log(" this.alias in get_user_alias: ",this.alias)
                            })
                          }).then(() => {


                          }).catch( (err) => {console.log(err)}

                          )
                          } else {
                            console.log("error: no user connected")
                        }
                },

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
