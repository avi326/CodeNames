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
      words_arr: null,
      rival_define: null

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
    
    // subscribe to changes to the 'messages' collection
    ref.onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        console.log(change)
        if(change.type == 'added'){
          let doc = change.doc
            if (this.check_if_first_move) {
              console.log("first move")

            }
            else {
                this.rival_define = doc.data().define
                console.log("define from firebase: ",  this.rival_define)
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
          sendGuess(){
            console.log("value(in sendguess): ",  this.value)
            var ref = this.ref_db.collection('moves') 

            const define_to_guess = this.rival_define   
            const filteredQuery = ref.where('define', '==', define_to_guess);

            filteredQuery.get()
                .then(querySnapshot => {
                          querySnapshot.forEach(function(doc) {
                          // doc.data() is never undefined for query doc snapshots
                          var list_of_word = doc.data().words
                          console.log(doc.id, " => ", doc.data().words); 
                          });
                })

                .catch(error => {
                    console.log("erorr guess"); 
                });

            },
                check_if_first_move () {
                  
                var ref = this.ref_db.collection('moves');
                var getDoc = ref
                .get()
                .then(doc => {
                    if (doc.exists) {
                      return false;

                    } else {
                      console.log('No such document!');
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
