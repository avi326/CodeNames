<template>
    <div class="game">

        <div> 
            <p> {{ player_one_alias }}  שחקן 1 </p>
            <p> נגד </p>
            <p> {{ player_two_alias }}  שחקן 2 </p>
        </div>
        <div style="text-align: center; width: 65%; overflow: hidden;">
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
             <GameChat v-if="player_two_alias!=null" :name="player_two_alias"/>
             <GameChat v-else :name="player_one_alias"/>
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
                <MultiSelectWords/>
            </div>

        </div>
</template>

<script>
import MultiSelectWords from '@/components/game/MultiSelectWords'
import GameChat from '@/components/game/GameChat'
import db from '@/firebase/init'

export default {
name: 'Game',
props: ['player_one_alias','player_two_alias'], 
data () {
    return {
        table_board: [],
        map_player: []

    }
},
components: {
    MultiSelectWords,
    GameChat
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
        this.map_player = doc.data().map_player_one
        }
    })
    .catch(err => {
        console.log('Error getting document', err);
    });

    // update the player in firebase
       
        // if (player_one_alias!=null) {
        //     ref.update({
        //         alias_player_one: this.player_one_alias
        //     })
        // } else if (player_two_alias!=null) {
        //     ref.update({
        //         alias_player_two: this.player_two_alias
        //     })
        // }



        
}, mounted () {

},
methods: {

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
