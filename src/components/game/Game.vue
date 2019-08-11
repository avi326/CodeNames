<template>
    <div class="game">

        <div> 
            <p> {{ player_one_alias }}  שחקן 1 </p>
            <p> נגד </p>
            <p> {{ player_two_alias }}  שחקן 2 </p>

        </div>
        <div style="text-align: center; width: 65%; overflow: hidden;">
            <div style="width: 200px;  float: left;">
             <GameMoves v-if="turn" :turn="turn"/>
             <GameMoves v-else/>
            </div>

            <div style="width: 600px; float: left;">
            <h3 class="lead text-center"> לוח מילים</h3>
            <table class="table table-bordered text-center words">
                <tbody>

                    <tr v-for="i in Math.ceil(table_board.length / 5)" :key="i">
                        <td v-for="word in table_board.slice((i - 1) * 5, i * 5)" :key="word.id">
                             {{ word }} 
                             </td>
                    </tr>
                </tbody>
            </table>
            </div>
            <div style="margin-left: 50px;">
             <GameChat v-if="player_one_alias!=null" :name="player_one_alias"/>
             <GameChat v-else :name="player_two_alias"/>
            </div>

        </div>

            <div class="mapTable">
                <h3 class="lead text-center">מפת המשחק שלך</h3>
                <table style="width:15%" class="table table-bordered mapTable">
                    <tr v-for="i in Math.ceil(map_player.length / 5)" :key="i">
                    <td  v-for="cell in map_player.slice((i - 1) * 5, i * 5)" :key="cell.id" :class="cell">
                        </td>
                    </tr>

                </table>
            </div>

            <div class="MultiSelectWords">
                <MultiSelectWords v-if="player_one_alias!=null" :blue_words="'blue_words_player_one'"/>
                <MultiSelectWords v-else :blue_words="'blue_words_player_two'"/>
            </div>

        </div>
</template>

<script>
import MultiSelectWords from '@/components/game/MultiSelectWords'
import GameChat from '@/components/game/GameChat'
import GameMoves from '@/components/game/GameMoves'
import db from '@/firebase/init'

export default {
name: 'Game',
props: ['player_one_alias','player_two_alias','turn'], 
data () {
    return {
        table_board: [],
        map_player: [],
        moves: []
    }
},
components: {
    MultiSelectWords,
    GameChat,
    GameMoves
},
created () {

    var ref = db.collection('games').doc('UwaFbzVh4MPyhzLbDNrx');
    // var cityRef = db.collection('games').doc('UwaFbzVh4MPyhzLbDNrx').set({player_one_alias: this.player_one_alias, player_two_alias: this.player_two_alias})
    var getDoc = ref
    .get()
    .then(doc => {
        if (!doc.exists) {
        console.log('No such document!');
        } else {
            console.log('Document data:', doc.data());
            this.table_board = doc.data().table_board

            if (this.player_one_alias) {
                this.map_player = doc.data().map_player_one
            } else if (this.player_two_alias) {
                this.map_player = doc.data().map_player_two
            }

            // we init turn to player 1
            if (this.turn==this.player_one_alias) {
                ref.update({
                   turn: doc.data().alias_player_one
                })
            } else {
                ref.update({
                   turn: doc.data().alias_player_two
                })
            }
        } 
    })
    .catch(err => {
        console.log('Error getting document', err);
    });

    // update the player in firebase
       
        if (this.player_one_alias) {
            ref.update({
                alias_player_one: this.player_one_alias
            })
        } else if (this.player_two_alias) {
            ref.update({
                alias_player_two: this.player_two_alias
            })
        }
        
}, mounted () {

},
methods: {

    play_the_turn () {
    var ref = db.collection('games').doc('UwaFbzVh4MPyhzLbDNrx');
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
    }

  }
}

</script>

<style>
div.game {
    direction: rtl;
    text-align: center
    
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
</style>
