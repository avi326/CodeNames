<template>
    <div class="game">
        <div style="text-align: center">
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

            <div class="mapTable">
                <h3 class="lead text-center">מפת המשחק שלך</h3>
                <table style="width:15%" class="table table-bordered mapTable">
                    <tr v-for="i in Math.ceil(map_player_one.length / 5)" :key="i">
                        <td v-for="cell in map_player_one.slice((i - 1) * 5, i * 5)" :key="cell.id">
                            {{ cell }} 
                        </td>
                    </tr>

                </table>
            </div>

            <div class="MultiSelectWords">
                <MultiSelectWords/>
            </div>

            <div>
            {{ table_board }}
            </div>

        </div>
</template>

<script>
import MultiSelectWords from '@/components/game/MultiSelectWords'
import db from '@/firebase/init'

export default {
name: 'Game',
data () {
    return {
        table_board: [],
        map_player_one: []

    }
},
components: {
    MultiSelectWords
},
created () {

var cityRef = db.collection('games').doc('UwaFbzVh4MPyhzLbDNrx');
var getDoc = cityRef
  .get()
  .then(doc => {
    if (!doc.exists) {
      console.log('No such document!');
    } else {
      console.log('Document data:', doc.data());
      this.table_board = doc.data().table_board
      this.map_player_one = doc.data().map_player_one
    }
  })
  .catch(err => {
    console.log('Error getting document', err);
  });


// var cityRef = db.collection('words').doc('test_group');
// var getDoc = cityRef
//   .get()
//   .then(doc => {
//     if (!doc.exists) {
//       console.log('No such document!');
//     } else {
//       console.log('Document data:', doc.data());
//       this.word_list = doc.data().word_list
//     }
//   })
//   .catch(err => {
//     console.log('Error getting document', err);
//   });

//      // get 25 random numbers
//     var i;
//     for (i = 0; i < 25; i++) {
//         this.random_numbers_array.push(Math.floor(Math.random() * 50) + 1)
//     } 
//     // add 25 random word to the table
//     var num;
//     for (num in this.random_numbers_array) {
//         this.table_word.push(this.word_list.num) 
//     }
//     console.log(this.word_list)
//     console.log(this.table_word)
         



        
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
