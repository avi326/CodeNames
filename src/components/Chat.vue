<template>
    <div class="chat">
        <h2> chat </h2>
            <b-card>
                <ul class="messages" v-chat-scroll> <!-- print all message -->
                <li v-for="message in messages" :key="message.id">
                    <span class="name">{{ message.name }}</span>
                    <span class="content">{{ message.content }}</span>
                    <span class="time">{{ message.timestamp }}</span>
                </li>
                </ul>
                 <NewMessage :name="name"/>
            </b-card>
            
    </div>

</template>

<script>
import NewMessage from '@/components/NewMessage'
import db from '@/firebase/init'
import moment from 'moment'

export default {
  name: 'Chat',
  props: ['name'],
  components: {
    NewMessage
  },
  data(){
    return{
      messages: []
    }
  },
  created(){
    let ref = db.collection('messages').orderBy('timestamp')
    
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
font-size: 20px
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
