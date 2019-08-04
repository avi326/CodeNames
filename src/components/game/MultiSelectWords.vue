<template>
    <div>
        <form class="card-panel" @submit.prevent="sendGroupOfWords">
        <!-- <pre class="language-json"><code>{{ value  }}</code></pre> -->
         <div class="field">
        <label for="email">בחירת מילים</label>
        <label class="typo__label"> בחירת המילים</label>
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

export default {
  name: 'MultiSelectWords',
  components: {
    Multiselect
  },
  data () {
    return {
      defineWord: null,
      value: [
      ],
      options: [
        { name: 'אדמה', code: '1' },
        { name: 'גרגיר', code: '2' },
        { name: 'יד', code: '3' },
        { name: 'ארוחה', code: '4' },
        { name: 'כדור', code: '5' },
        { name: 'עציץ', code: '6' },
        { name: 'דף', code: '7' }
      ]
    }
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
            db.collection('groupofwords').doc(this.defineWord).set({
            wordsArray: this.value
            },{ merge: true }).catch(err => {
            console.log(err)
            })
            this.defineWord = null
            this.options = this.options // need to remove "value"
            this.value = null
            this.feedback = 'המילה נוספה בהצלחה!'
        } else {
            this.feedback = 'אתה חייב להגדיר מילה'
        }
      }
  }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style>

</style>
