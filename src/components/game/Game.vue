<template>
    <div class="game">
    <b-container class="bv-example-row">
    <b-row>
        <b-col cols="1"  align-self="center">
                <form class="endGame" @submit.prevent="end_game">
                <button class="btn red ">סיים-משחק! </button>
                </form>
        </b-col>
        <b-col>
            <div> 
            <p> {{ player_one_alias }}  שחקן 1 </p>
            <p  v-if="player_one_count_moves"> {{ player_one_count_moves }}   תור:  </p>
            <p> נגד </p>
            <p> {{ player_two_alias }}  שחקן 2 </p>
            <p  v-if="player_two_count_moves"> {{ player_two_count_moves }}   תור:  </p>

            
              <h5> 
                    <p v-if="count_moves">  {{ count_moves }}  מספר מהלכים כולל עד כה</p> 
                    <p v-if="count_moves=='8'">  המשחק מסתיים בקרוב... </p> 
                    <p v-if="count_moves=='10'">  תור אחרון לכל אחד!  </p> 
              </h5>
              <b-progress :value="count_moves" :max="12" show-value></b-progress>
            </div>
        </b-col>
    </b-row>

    <b-row>
        <b-col>

             <GameMoves v-if="turn" :startTurn="turn"  :ref_db="ref" :conected_player="conected_player"/>
             <GameMoves v-else :ref_db="ref" :conected_player="conected_player"/>
        </b-col>
        <b-col>
            <h3 class="lead text-center"> לוח מילים</h3>
            <table class="table table-bordered text-center words">
                <tbody>

                    <tr v-for="i in Math.ceil(table_board.length / 5)" :key="i">
                        <td v-for="word in table_board.slice((i - 1) * 5, i * 5)" :key="word.id" :name="word">
                             {{ word }} 
                             </td>
                    </tr>
                </tbody>
            </table>
        </b-col>
        <b-col>
             <GameChat v-if="player_one_alias!=null" :name="player_one_alias" :ref_db="ref" />
             <GameChat v-else :name="player_two_alias" :ref_db="ref"/>
        </b-col>
    </b-row>
        
    <b-row>
        <b-col>
                <div class="mapTable">
                <h3 class="lead text-center">מפת המשחק שלך</h3>
                <table style="width:15%" class="table table-bordered mapTable">
                    <tr v-for="i in Math.ceil(map_player.length / 5)" :key="i">
                    <td  v-for="cell in map_player.slice((i - 1) * 5, i * 5)" :key="cell.id" :class="cell">
                        </td>
                    </tr>

                </table>
            </div>
        </b-col>
    </b-row>
    </b-container>


    </div>





</template>

<script>
import GameChat from '@/components/game/GameChat'
import GameMoves from '@/components/game/GameMoves'
import db from '@/firebase/init'
//import VuetifyConfirm from 'vuetify-confirm'


export default {
name: 'Game',
props: ['player_one_alias','player_two_alias','turn','conected_player'], 
data () {
    return {
        table_board: [],
        map_player: [],
        moves: [],
        ref: null,
        count_moves: null,
        player_one_count_moves: null,
        player_two_count_moves: null


    }
},
components: {
    GameChat,
    GameMoves
},

// destroyed() {
//     db.collection('games').doc(this.player_one_alias).delete()
//     db.collection('table_of_players').doc(this.player_one_alias).delete()
// },

created () {

    //get the game as to the initiator (this first player)
    this.ref = db.collection('games').doc(this.player_one_alias); 
    // console.log(typeof this.ref);
    this.init_firebase_game ()
    // this.getNumOfMoves ()

    // var cityRef = db.collection('games').doc('UwaFbzVh4MPyhzLbDNrx').set({player_one_alias: this.player_one_alias, player_two_alias: this.player_two_alias})
    var getDoc = this.ref
    .get()
    .then(doc => {
        if (!doc.exists) {
        console.log('No such game document!');
        } else {
            // console.log('Document data:', doc.data());
            this.table_board = doc.data().table_board

            //First check if it's player two becuase player one most to be in this level
            if (this.player_two_alias)
            {
                this.map_player = doc.data().map_player_two


                
                //TODO: Need to get the currect doc and update it
                db.collection('table_of_players').doc(this.player_one_alias).set({                    
                    player2: this.player_two_alias,
                    countPlayers: 2,
                    time: Date.now()
                }, {merge: true}
                ).catch(err => {
                    console.log(err)
                })
            }
            else if (this.player_one_alias)
            {
                this.map_player = doc.data().map_player_one
            }
            // init color of td by map_player
            //     this.map_player.forEach( blue_word => {
            //         //document.getElementById(blue_word).className = "table_board_td_blue";
            //         console.log(document.getElementById(blue_word).className)
            // })


            // we init turn to player 1
            if (this.turn==this.player_one_alias) {
                this.ref.update({
                   turn: doc.data().alias_player_one
                })
            } else {
                this.ref.update({
                   turn: doc.data().alias_player_two
                })
            }
        } 
    })
    .catch(err => {
        console.log('Error getting document', err);
    });

    // update the player in firebase
       if (this.player_two_alias) {
            this.ref.update({
                alias_player_two: this.player_two_alias
            })
        }
        else if (this.player_one_alias) {
            this.ref.update({
                alias_player_one: this.player_one_alias
            })
        }
}, mounted () {

    this.getNumOfMoves ()

},
destroyed () {

    console.log("game over")

            // First perform the query
            this.ref.collection('chat').get()
            .then(function(querySnapshot) {
                    // Once we get the results, begin a batch
                    var batch = db.batch();

                    querySnapshot.forEach(function(doc) {
                        // For each doc, add a delete operation to the batch
                        batch.delete(doc.ref);
                    });

                    // Commit the batch
                    return batch.commit();

            }).then(function() {
                // Delete completed!
                // ...
            }); 

        // First perform the query
            this.ref.collection('moves').get()
            .then(function(querySnapshot) {
                    // Once we get the results, begin a batch
                    var batch = db.batch();

                    querySnapshot.forEach(function(doc) {
                        // For each doc, add a delete operation to the batch
                        batch.delete(doc.ref);
                    });

                    // Commit the batch
                    return batch.commit();

            }).then(function() {
                // Delete completed!
                // ...
            }); 



        // delete row from table_of_games.
        db.collection('table_of_players').doc(this.player_one_alias).delete().then(function() {
            console.log("deleted from table_of_players successfully deleted!");
            }).catch(function(error) {
                console.error("Error deleted from table_of_players ", error);
            });

        // delete game
        this.ref.delete().then(function() {
            console.log("game successfully deleted!");
            }).catch(function(error) {
                console.error("Error removing game: ", error);
            });
        this.$router.push({ name: 'TableOfGames' })
},
methods: {
    init_firebase_game () {
        db.collection('games').doc(this.player_one_alias).collection('moves')
        db.collection('games').doc(this.player_one_alias).collection('chat')
    },

    play_the_turn () {
        var ref = this.ref;
        // var cityRef = db.collection('games').doc('UwaFbzVh4MPyhzLbDNrx').set({player_one_alias: this.player_one_alias, player_two_alias: this.player_two_alias})
        var getDoc = ref
        .get()
        .then(doc => {
            if (!doc.exists) {
            console.log('No such document!');
            } else {
            
                this.table_board = doc.data().table_board

            } 
        })
    },
    getNumOfMoves () {

        var ref = this.ref
            .onSnapshot(doc => {
                if (doc.exists) {
                            this.count_moves = doc.data().num_of_moves

                            // count moves for each player
                            this.player_one_count_moves =  Math.floor(this.count_moves/2) + 1
                            this.player_two_count_moves = Math.floor(this.count_moves/2)

                            this.check_game_over()
                }
            });

    },
    check_game_over () {

        if (this.count_moves==12) {
            this.$destroy()
        } else  {
        this.ref
        .get()
        .then(doc => {
            if (!doc.exists) {
            console.log('No such document!');
            } else {

               var blue_words_player_one = doc.data().blue_words_player_one
               var blue_words_player_two = doc.data().blue_words_player_two
               //console.log("blue word check end game one: ", blue_words_player_one)
               //console.log("blue word check end game two : ", blue_words_player_two)

               if (blue_words_player_one.length == 0  && blue_words_player_two.length == 0 )
               {
                   window.alert("סיימתם את המשחק בהצלחה! ");
                    this.$destroy()
               }

            } 
        })
        }
},
    end_game () {

        // change this.count to 12 for end the game
          window.alert("בחרתם לסיים את המשחק. תודה רבה! ");
            this.ref.update({
                    num_of_moves: 12
                })
       
    }


  }
}

</script>

<style>
div.game {
    direction: rtl;
    text-align: center
    
}
form.endGame {
    margin-left:auto; 
    margin-right:auto;
    text-align: center;
    width: 100px; 

}
table.words {
    margin-left:auto; 
    margin-right:auto;
    text-align: center
}

table.mapTable {
    margin-left:auto; 
    margin-right:auto;
    text-align: center
}

table.mapTable {
    width: 10%;
    border-collapse: collapse;
    border: 1px solid black;
    background-color: rgb(221, 253, 255);
    margin: 0px auto;
}

table.mapTable.td {
    float:left;
    width: 100%;
    padding-bottom: 100%; /* = width for a 1:1 aspect ratio */
    background-color: rgb(221, 200, 200);
}

table.mapTable.td.blue {
    float:left;
    width: 100%;
    padding-bottom: 100%; /* = width for a 1:1 aspect ratio */
    background-color: rgb(0, 119, 255);
}

table.mapTable.td.black {
    float:left;
    width: 100%;
    padding-bottom: 100%; /* = width for a 1:1 aspect ratio */
    background-color: rgb(0, 0, 0);
}

div.MultiSelectWords {
    margin-left:auto; 
    margin-right:auto;
    text-align: center;
    width: 300px;
}

.table_board_td_blue { 
    float:left;
    width: 100%;
    padding-bottom: 100%; /* = width for a 1:1 aspect ratio */
    background-color: rgb(0, 119, 255);
}
</style>
