<template>
    <div class="new-message">
    <form @submit.prevent="addMessage">
       <label for="new-message">שמך</label>
      <input type="text" name="new-message" placeholder="שם פרטי" v-model="name">
      <label for="new-message"> אפשר לכתוב כאן</label>
      <input type="text" name="new-message"   placeholder="כתוב בבקשה..." v-model="newMessage">
      <p v-if="feedback">{{ feedback }}</p>
       <button class="btn teal lighten-2">  שלח</button>  
    </form>
    </div>
</template>

<script>
import db from '@/firebase/init'
export default {
  name: 'NewMessage',
  data(){
    return{
      newMessage: null,
      feedback: null,
      name: null
    }
  },
  methods: {
    addMessage(){
      if(this.newMessage && this.name){
        db.collection('messages').add({
          content: this.newMessage,
          name: this.name,
          timestamp: Date.now()
        }).catch(err => {
          console.log(err)
        })
        this.newMessage = null
        this.feedback = null
      } else {
        this.feedback = 'חייב להזין שם ותוכן'
      }
    }
  }
}
</script>

<style scoped>
div {
  text-align: right; 
  direction: rtl;
}
</style>
