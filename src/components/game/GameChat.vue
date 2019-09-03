<template>
    <div class="chat_div">
        <h4>  צ'אט </h4>
         <h6> פה אפשר לדבר עם עם השני </h6>
                <div  class="chat">
                <ul class="messages" v-chat-scroll> <!-- print all message -->
                  <li v-for="message in messages" :key="message.id">
                    <p class="me" v-if="name==message.name">
                      <span class="name">{{ message.name }}</span>
                      <span class="time">{{ message.timestamp }}</span>  <br>
                      <span class="content me">{{ message.content }}</span>
                    </p>
                    <p v-else>
                      <span class="name">{{ message.name }}</span>
                      <span class="time">{{ message.timestamp }}</span>  <br>
                      <span class="content rival">{{ message.content }}</span>
                    </p>  
                  </li>      
                </ul>
                </div>
                <b-card>
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
      messages: [],
      oldTime: '',
      ago: ''
    }
  },
  created(){
    // update time
    this.oldTime = new Date();
    setInterval(() => {
      this.messages.forEach( messege => {
        messege.timestamp = moment(this.oldTime).fromNow()
      })
    }, 1000)

    // change moment to hebrew
    moment.locale('he')

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
            timestamp: moment().startOf(doc.data().timestamp).fromNow()
          })
        }
      })
    })
  }
}
</script>

<style scoped>
div.chat {
 background:url('https://i.pinimg.com/originals/79/5c/ab/795cabc4647f73b365e2e6eabd0f34dc.png') no-repeat;
}

div.chat_div {
background: rgb(255, 253, 240);
box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

}

p.me {
  text-align: left;
  direction: rtl;
}

p {
  text-align: right;
  direction: rtl;
}

span.name {
color: black;
font-size: 14px;
font-weight: bold;


}
span.content.rival {
font-size: 15px;
color: rgb(0, 0, 0);
font-style: inherit;
font-weight: normal;
box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
background: rgb(255, 255, 255);
}

span.content.me {
font-size: 15px;
color: rgb(0, 0, 0);
font-style: inherit;
font-weight: normal;
box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
background: #DCF8C6;
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
