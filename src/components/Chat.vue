<template>
    <div class="chat">
              <h4 style="text-align: center;" > נשמח לשמוע על באגים, הצעות לשיפור, או כל דבר אחר  </h4>
            <b-card>
                <ul class="messages" style="text-align: right;" v-chat-scroll> <!-- print all message -->
                <li v-for="message in messages" :key="message.id" >
                    <span class="name">{{ message.name }}</span> <br>
                    <span class="content">{{ message.content }}</span> <br> 
                    <span class="time">{{ message.timestamp }}</span>
                </li>
                </ul>
            </b-card>
            <b-card>

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
    // change moment to hebrew
    moment.locale('he')

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
            timestamp: moment(doc.data().timestamp).calendar()
          })
        }
      })
    })
  }
}
</script>

<style scoped>
html {
  direction: rtl;
  text-align: right;
}
span.name {
color: rgb(138, 131, 42);
font-size: 10px
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