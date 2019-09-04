<template>
  <div class="new-message">
    <form @submit.prevent="addMessage">
      <label for="new-message">הודעה חדשה:</label>
      <input
        type="text"
        name="new-message"
        placeholder="כתוב כאן מה שבא לך לשחקן השני"
        v-model="newMessage"
      />
      <p v-if="feedback">{{ feedback }}</p>
    </form>
  </div>
</template>

<script>
import db from "@/firebase/init";
export default {
  name: "GameChatNewMessage",
  props: {
    name: String,
    ref_db: Object
  },
  data() {
    return {
      newMessage: null,
      feedback: null
    };
  },
  methods: {
    addMessage() {
      if (this.newMessage) {
        //TODO: Get the right chat from the specific game. First need to create the collection (look at other TODO)
        this.ref_db
          .collection("chat")
          .add({
            content: this.newMessage,
            name: this.name,
            timestamp: Date.now()
          })
          .catch(err => {
            console.log(err);
          });
        this.newMessage = null;
        this.feedback = null;
      } else {
        this.feedback = "You must enter a message in order to send one";
      }
    }
  }
};
</script>

<style>
</style>
