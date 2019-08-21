<template>
    <div>
        <form class="card-panel" @submit.prevent="sendGuess">
        <!-- <pre class="language-json"><code>{{ value  }}</code></pre> -->
         <div class="field">
        <label class="typo__label"> בחר מילים מהלוח</label>
        <multiselect v-model="value" label="name" track-by="code" :options="options"  
        :searchable="true"  :allow-empty="false" :close-on-select="false" 
        :selected="value" :taggable="true" deselect-label="חייב לבחור מילה" placeholder="חפש או בחר מילה" @update="updateValue"></multiselect>
      </div>
      <div class="field center">
        <button class="btn  light-blue lighten-2">נחש! </button>
        
      </div>
         </form>
    </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
import db from '@/firebase/init'
import firebase from 'firebase'

export default {
  name: 'GuessDefine',
  props: { table_board: String,
          ref_db: Object,
          } ,
  components: {
    Multiselect
  },
  data () {
    return {
      value: null,
      options: [],
      rival_define: null,
      words_to_guess: null

    }
  },created () {

    var getDoc = this.ref_db;
    getDoc.get()
    .then(doc => {

        var temp_options;

        if (!doc.exists) {
        console.log('No table_board!');
        } else {
                temp_options = doc.data().table_board

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
  mounted () {

        var ref = this.ref_db.collection('moves');
    
    // subscribe to changes to the 'moves' collection
    ref.onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        console.log(change)
        if(change.type == 'added'){
          let doc = change.doc
            if (this.check_if_first_move()) {
              console.log("first move")

            }
            else {
                this.rival_define = doc.data().define
                this.words_to_guess = doc.data().words
                console.log("define from firebase: ",  this.rival_define)
                // this.get_words_to_guess()


               console.log("words_to_guess from firebase: ",  this.words_to_guess)
            }

        }
      })
    })

  },

  methods: { 
          updateValue (value) {
            this.value = value
            console.log("value: ",  this.value)
          },
          // get_words_to_guess () {

          //   console.log("value(in sendguess): ",  this.value)
          //   var ref = this.ref_db.collection('moves') 

          //   const define_to_guess = this.rival_define   
          //   const filteredQuery = ref.where('define', '==', define_to_guess);

          //   filteredQuery.get()
          //       .then(querySnapshot => {
          //                 querySnapshot.forEach(function(doc) {
          //                 // doc.data() is never undefined for query doc snapshots
          //                 console.log(doc.id, " => ", doc.data().words); 
          //                 var arr_words = doc.data().words
          //                 this.words_to_guess = doc.data().words
                          

          //                 console.log("arr words: ", arr_words); 
          //                 console.log("words_to_guess: ", this.words_to_guess); 
                          
          //                 });
          //       })

          //       // .catch(error => {
          //       //     console.log("erorr guess"); 
          //       // });

          // },
          sendGuess(){


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
        
  }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style>

</style>
