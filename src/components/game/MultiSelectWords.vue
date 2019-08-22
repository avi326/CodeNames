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
      <div>
          {{ num_of_moves}}
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
  props: { blue_words: String,
          ref_db: Object,
          setAppGetData: {type: Function}
          } ,
  components: {
    Multiselect
  },
  data () {
    return {
      feedback: null,
      defineWord: null,
      value: [],
      options: [],
      num_of_moves: null
    }
  },created () {

    var getDoc = this.ref_db;
    getDoc.get()
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
            } else if (this.blue_words=='table_board') {
              temp_options = doc.data().table_board // for guess 
            }

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

    // this.getNumOfMoves()


  },

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
            var list_of_words = []
            // create array of only words, to add in firebase 
            this.value.forEach(function (arrayItem) {
              list_of_words.push(arrayItem.name);
            });


            db.collection('groupofwords').doc(this.defineWord).set({
            wordsArray: list_of_words
            },{ merge: true }).catch(err => {
            console.log(err)
            })

            this.addDefineDataToFirebase(list_of_words)

            this.setAppGetData('True')
            this.defineWord = null
            this.options = this.options // need to remove "value"
            this.value = null
            this.feedback = 'המילה נוספה בהצלחה!'
        } else {
            this.feedback = 'אתה חייב להגדיר מילה'
        }
      },
    addDefineDataToFirebase (list_of_words) {

            var ref = this.ref_db.collection('moves')
            ref.add({
                define: this.defineWord,
                num_of_words: this.value.length,
                words: list_of_words,
                words_right_guess: null, // kind of temp array, for checking == 'words' array.
                words_worng_guess: null, // when guess worng word, add to this array.
                timestamp: Date.now()
                }).catch(err => {
                console.log(err)
                })
                this.define = null
                this.num_of_words = null
                this.feedback = null
    },
    // getNumOfMoves () {
    //     var ref =  db.collection('games').doc('UwaFbzVh4MPyhzLbDNrx')
    //     ref.get().then(function(documentSnapshot) {
    //         if (documentSnapshot.exists) {
    //             var data = documentSnapshot.data().num_of_moves;
    //             console.log(data)
    //             return data;
    //         } else {
    //             console.log('document not found');
    //         }

            

    //     });

    // },

    // increaseMove () {

    //             var ref = db.collection('games').doc('UwaFbzVh4MPyhzLbDNrx').collection('moves')
    //         ref.add({
    //             define: this.defineWord,
    //             num_of_words: this.value.length,
    //             words: this.value,
    //             }).catch(err => {
    //             console.log(err)
    //             })
    //             this.define = null
    //             this.num_of_words = null
    //             this.feedback = null



    // }

  },
  mounted() {

      

  }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style>

</style>
