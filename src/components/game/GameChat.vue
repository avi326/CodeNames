<template>
    <div class="chat">
        <h2> צ'אט משחק </h2>
            <b-card>
                <ul class="messages" v-chat-scroll> <!-- print all message -->
                <li v-for="message in messages" :key="message.id">
                    <span class="name">{{ message.name }}</span>
                    <span class="content">{{ message.content }}</span>
                    <span class="time">{{ message.timestamp }}</span>
                </li>
                </ul>
                 <GameChatNewMessage :name="name" :ref_db="ref_db"/>
            </b-card>
            
    </div>

</template>

<script>
import GameChatNewMessage from '@/components/game/GameChatNewMessage'
import db from '@/firebase/init'
import moment from 'moment'

export default {
  name: 'GameChat',
  props: {name: String,
          ref_db: Object
  },
  components: {
    GameChatNewMessage
  },
  data(){
    return{
      messages: []
    }
  },
  created(){
    //TODO: Get the right chat from the specific game. First need to create the collection (look at other TODO)
    var ref = this.ref_db.collection('chat').orderBy('timestamp')
    
    // subscribe to changes to the 'messages' collection
    ref.onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        console.log(change)
        if(change.type == 'added'){
          let doc = change.doc
          this.messages.push({
            id: doc.id,
            name: doc.data().name,
            content: doc.data().content,
            timestamp: moment(doc.data().timestamp).format('lll')
          })
        }
      })
    })
  }
}
</script>

<style scoped>
span.name {
color: rgb(138, 131, 42);
font-size: 20px
}

span.content {
font-size: 15px;
color: rgb(76, 77, 24);
font-style: inherit
}

span.time {
font-size: 10px
}

.messages{
  max-height: 300px;
  overflow: auto;
}
.messages::-webkit-scrollbar {
  width: 3px;
}
 
.messages::-webkit-scrollbar-track {
  background: #ddd;
}
 
.messages::-webkit-scrollbar-thumb {
  background: #aaa; 
}

</style>
