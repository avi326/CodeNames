<template>
    <div>
        <form class="card-panel" @submit.prevent="sendGroupOfWords">
        <!-- <pre class="language-json"><code>{{ value  }}</code></pre> -->
         <div class="field">
        <label class="typo__label"> בחר מרשימת המילים שלך</label>
        <multiselect v-model="value" tag-placeholder="הוסף מילה זו" placeholder="חפש או בחר מילה" label="name" track-by="code" :options="options" :multiple="true" :taggable="true" @tag="addTag"></multiselect>
      </div>
      <div class="field">
        <label for="name">כתוב מילה שמגדירה את המלים שבחרת: </label>
        <input id="name" type="text" v-model="defineWord">
        <p v-if="feedback" class="center">{{ feedback }}</p>
      </div>
      <div class="field center">
        <button class="btn  light-blue lighten-2">שחק! </button>
        
      </div>
         </form>
    </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
import db from '@/firebase/init'
import firebase from 'firebase'

export default {
  name: 'MultiSelectWords',
  props: ['blue_words'],
  components: {
    Multiselect
  },
  data () {
    return {
      feedback: null,
      defineWord: null,
      value: [],
      options: []
    }
  },created () {

    var cityRef = db.collection('games').doc('UwaFbzVh4MPyhzLbDNrx');
    var getDoc = cityRef
    .get()
    .then(doc => {

        var temp_options;

        if (!doc.exists) {
        console.log('No such document!');
        } else {
            if (this.blue_words=='blue_words_player_one')
            {
                temp_options = doc.data().blue_words_player_one
            } else if (this.blue_words=='blue_words_player_two'){
                temp_options = doc.data().blue_words_player_two
            }

        console.log(temp_options);

        var i = 0
        temp_options.forEach( (element) => {
           this.options.push({name: element, code: i++})
        })
        }
        console.log(this.options)
    })
    .catch(err => {
        console.log('Error getting document', err);
    });


  },

  
        //  var ref = firebase.database().ref("games/UwaFbzVh4MPyhzLbDNrx").child('blue_words_player_one');
        // ref.on("value", function(snapshot) { 
        // let emails=snapshot.val();
        // console.log(ref);
        //     console.log(emails);
        // });


        // var check_ref = firebase.database().ref('games/UwaFbzVh4MPyhzLbDNrx/').once('value').then(function(snapshot) { // blue_words_player_two
        // let data_ref = snapshot;
        // console.log(data_ref);
        // });

//         var check_ref = firebase.database().ref('games/UwaFbzVh4MPyhzLbDNrx/blue_words_player_two');
//         var data_ref = check_ref.then(function(snapshot) {
//     var data = snapshot.val(); // data === "hello"
//   });
       // console.log(data_ref);

  methods: {
    addTag (newTag) {
      const tag = {
        name: newTag,
        code: newTag.substring(0, 2) + Math.floor((Math.random() * 10000000))
      }
      this.options.push(tag)
      this.value.push(tag)
    },
    sendGroupOfWords(){
      if(this.defineWord){
            db.collection('groupofwords').doc(this.defineWord).set({
            wordsArray: this.value
            },{ merge: true }).catch(err => {
            console.log(err)
            })

            this.addDefineDataToFirebase()

            this.defineWord = null
            this.options = this.options // need to remove "value"
            this.value = null
            this.feedback = 'המילה נוספה בהצלחה!'
        } else {
            this.feedback = 'אתה חייב להגדיר מילה'
        }
      },
    addDefineDataToFirebase () {
            var num_of_moves =  db.collection('games').doc('UwaFbzVh4MPyhzLbDNrx').num_of_moves
            console.log(num_of_moves)

            var ref = db.collection('games').doc('UwaFbzVh4MPyhzLbDNrx').collection('moves').doc(num_of_moves)
            ref.set({
                define: this.defineWord,
                num_of_words: this.value.length,
                words: this.value,
                }).catch(err => {
                console.log(err)
                })
                this.define = null
                this.num_of_words = null
                this.feedback = null
    },
    getNumOfMoves () {

    }
  }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style>

</style>
