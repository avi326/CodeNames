<template>
    <div>
        <form class="card-panel" @submit.prevent="sendGuess">
        <!-- <pre class="language-json"><code>{{ value  }}</code></pre> -->
         <div class="field">
        <label class="typo__label"> בחר מילים מהלוח</label>
        <multiselect v-model="value" tag-placeholder="הוסף מילה זו" placeholder="חפש או בחר מילה" label="name" track-by="code" :options="options" :multiple="true" :taggable="true" @tag="addTag"></multiselect>
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
      value: [],
      options: [],
      words_arr: null
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

  methods: { 
          addTag (newTag) {
            const tag = {
              name: newTag,
              code: newTag.substring(0, 2) + Math.floor((Math.random() * 10000000))
            }
            this.options.push(tag)
            this.value.push(tag)
          },
          sendGuess(){
            var ref = this.ref_db 

            },
        
  }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style>

</style>
