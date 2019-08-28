<template>
    <div>
      <div>
        <span  v-if="rival_define">
            <p> עליך לתקן את ההגדרה:  </p>
            <p>  {{ rival_define }} : {{ num_of_word_to_guess }}  </p>  
        </span>
      
      </div>
        <form class="card-panel" @submit.prevent="sendGuess">
        <!-- <pre class="language-json"><code>{{ value  }}</code></pre> -->
         <div class="field">
        <label class="typo__label"> בחר מילים מהלוח</label>
        <multiselect v-model="value" label="name" track-by="code" :options="options"  
        :searchable="true"  :allow-empty="false" :close-on-select="false" 
        :selected="value" :taggable="true" deselect-label="חייב לבחור מילה" placeholder="חפש או בחר מילה" @update="updateValue"></multiselect>
      </div>
      <div class="field center">
        <button class="btn  light-blue lighten-2">תקן!  </button>
      </div>
         </form>

      <div>
          <ul class="show_words_right_guess" v-chat-scroll> <!-- print all words_right_guess -->
          <li v-for="right_word in show_words_right_guess" :key="right_word.id">
              <span class="right_word">{{ right_word }} צדקת! אפשר להמשיך.</span>
          </li>
          </ul>
      </div>
    </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
import db from '@/firebase/init'
import firebase from 'firebase'

export default {
  name: 'FixGuess',
  props: { move_doc_id: String,
          timestamp: null,
          ref_db: Object,
          conected_player: String
          } ,
  components: {
    Multiselect
  },
  data () {
    return {
      alias: null,
      value: null,
      options: [],
      rival_define: null,
      num_of_word_to_guess: null,
      words_to_guess: null,
      show_words_right_guess: [],
      doc_id: null,
      rival_map: null,
      rival_black_words: [],
      is_in_black_words: null


    }
  },created () {
    // init current alias of connected player
    this.init_user_alias()
    // this.get_rivel_blue_and_black_words()

    var getDoc = this.ref_db;
    getDoc.get()
    .then(doc => {

        var temp_options;

        if (!doc.exists) {
        console.log('No table_board!');
        } else {
                temp_options = doc.data().table_board

                
                // console.log(temp_options);

                var i = 0
                temp_options.forEach( (element) => {
                  this.options.push({name: element, code: i++})
        })
        }
        // console.log(this.options)
    })
    .catch(err => {
        console.log('Error getting document', err);
    });

 

  },
  mounted () { // timestamp

    var ref = this.ref_db.collection('moves').doc(this.move_doc_id);

    ref.get()
    .then(doc => {
        if (!doc.exists) {
          
        } else {
                this.doc_id = doc.id
                console.log(this.doc_id)
                this.rival_define = doc.data().define       
                this.words_to_guess = doc.data().words
                this.num_of_word_to_guess = this.words_to_guess.length
                console.log(" fix define: ",  this.rival_define)
                // this.get_words_to_guess()


               console.log("words_to_guess from firebase: ",  this.words_to_guess)
        }
    })
    .catch(err => {
        console.log('Error getting document', err);
    });

  },

  methods: { 
          updateValue (value) {
            this.value = value
            // console.log("value: ",  this.value)
          },
          sendGuess(){
              var ref_moves = this.ref_db.collection('moves').doc(this.move_doc_id);
              var ref = this.ref_db
              console.log("doc to fix in fixGuess: ", this.move_doc_id)
               
              console.log("value: ",  this.value.name)

              if (this.words_to_guess.includes(this.value.name)) {
                  console.log(this.value.name, "exists")
                 ref_moves.update({
                    words_right_guess: firebase.firestore.FieldValue.arrayUnion(this.value.name),
                    // player_worng_guess: null
                });

                // remove value from blue words of rival because this is current guess.
                this.remove_from_rivel_blue_words(this.value) 

                this.show_words_right_guess.push(this.value.name)
              } 
               else {
                  console.log(this.value.name, "not exists")
                  ref_moves.update({
                    words_worng_guess: firebase.firestore.FieldValue.arrayUnion(this.value.name),
                    player_worng_guess: null
                });
                
                

                    // end game if guess word is black.
                    // this.check_rivel_black_words(this.alias, this.value.name)
                    // if (this.is_in_black_words) {
                    //     console.log("you choose black word, game over.", this.is_in_black_words)
                    //     this.$parent.game_over()
                    // }
                    // else {
                    //     console.log(" the word not in black word", this.is_in_black_words)
                    // }


              }

            },
                check_if_first_move () {
                  
                var ref = this.ref_db.collection('moves');
                var getDoc = ref
                .get()
                .then(doc => {
                    if (doc.exists) {
                      return false;

                    } else {
                      return true;

                    } 
                })
                },

                init_user_alias() {
                    let user = firebase.auth().currentUser;

                    console.log(user)

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
                // get_rivel_blue_and_black_words () {

                //      this.ref_db
                //           .onSnapshot(function(doc) {
                //               console.log(doc.data())
                //               // console.log('Document data:', doc.data());
                //               // this.table_board = doc.data().table_board
                //               var player_one_alias = doc.data().alias_player_one
                //               var player_two_alias = doc.data().alias_player_two
                //               console.log(this.alias)
                //               console.log(player_two_alias)

                //              // get_rivel_blue_words
                //               if (this.alias == player_two_alias)
                //               {
                //                 console.log("player_2: rival 1 blue:", doc.data().blue_words_player_one)
                //                 console.log("player_2: rival 1 black: ", doc.data().black_words_player_one)
                //                 this.rival_map = doc.data().blue_words_player_one
                //                 this.rival_black_words = doc.data().black_words_player_one

                //               }
                //               else
                //               {
                //                   console.log("player_1: rival 2 blue:", doc.data().blue_words_player_two)
                //                   console.log("player_1: rival 2 black: ", doc.data().black_words_player_two)
                //                   this.rival_map = doc.data().blue_words_player_two
                //                   this.rival_black_words = doc.data().black_words_player_two
                //               }
                //           });
                // },
                //  check_rivel_black_words (alias, value) {
                //     var rival_black_words = []

                //      var getDoc = this.ref_db.get()
                //           .then(doc => {
                //              if (!doc.exists) {
                //           console.log('No such game document!');
                //           } else {
                //               // console.log('Document data:', doc.data());
                              
                //               var player_one_alias = doc.data().alias_player_one
                //               var player_two_alias = doc.data().alias_player_two
                //               var temp_arr;
                             
                //              // get_rivel_blue_words
                //               if (alias == player_two_alias)
                //               {
                //                 console.log("player_2: rival 1 black: ")
                //                  console.log(doc.data().black_words_player_one)
                //                 temp_arr = doc.data().black_words_player_one
                //                 temp_arr.forEach( word => rival_black_words.push(word))
                //               }
                //               else
                //               {
                //                 console.log("player_1: rival 2 black: ")
                //                 console.log(doc.data().black_words_player_two)
                //                 temp_arr = doc.data().black_words_player_two
                //                 temp_arr.forEach( word => rival_black_words.push(word))
                //               }

                //               if (temp_arr.includes(value))
                //                 {
                //                   console.log(value," in black words")
                //                   this.is_in_black_words = true
                                  
                //                 } else {
                //                   console.log(value," is not in black words")
                //                    this.is_in_black_words = false
                //                 }
                //            }
                //           })
                //           console.log("alias of player check black",alias)
                //           console.log("before check include in black words",rival_black_words)
                //           console.log("type of this.rival_black_word",typeof(rival_black_words))
                //           console.log("word value",value)


                //           // if (rival_black_words.includes(value))
                //           // {
                //           //   console.log(value," in black words")
                //           //   return true
                            
                //           // } else {
                //           //   console.log(value," is not in black words")
                //           //   return false
                //           // }
                          


                // },
                    remove_from_rivel_blue_words (value) {
                      var getDoc = this.ref_db
                      .get()
                      .then(doc => {
                          if (!doc.exists) {
                          console.log('No such game document!');
                          } else {
                              console.log(doc.data())
                              // console.log('Document data:', doc.data());
                              // this.table_board = doc.data().table_board
                              var player_one_alias = doc.data().alias_player_one
                              var player_two_alias = doc.data().alias_player_two
                              console.log("this.alias in remove",this.alias)

                             // get_rivel_blue_words
                              if (this.alias == player_two_alias)
                              {
                                console.log("map: ", doc.data().blue_words_player_one)
                                this.rival_map = doc.data().blue_words_player_one
                                this.ref_db.update({
                                blue_words_player_one: firebase.firestore.FieldValue.arrayRemove(value.name),
                                // TODO: remove from table_board. problem: common table board.
                              })
                              }
                              else if (this.alias == player_one_alias)
                              {
                                  console.log("map: ", doc.data().blue_words_player_two)
                                  this.rival_map = doc.data().blue_words_player_two
                                this.ref_db.update({
                                blue_words_player_two: firebase.firestore.FieldValue.arrayRemove(value.name)
                              })
                              }
                          } 
                      })
                      .catch(err => {
                          console.log('Error getting document', err);
                      });
                }
        
  }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style scoped>
span {
  direction: rtl;

}
p {
   font-weight: bold;
}


</style>
