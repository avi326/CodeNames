<template>
    <div class="game_moves">
    <div v-if="turn">
      <b-card>
      </b-card>
    </div>
    <div v-else>
        <h3> מהלכים </h3>
            <b-card>
                <ul class="messages" v-chat-scroll> <!-- print all message -->
                <li v-for="move in moves" :key="move.id">
                    <span class="define">{{ move.define }}</span>
                    <span class="num_of_words">{{ move.num_of_words }}</span>
                </li>
                </ul>
            </b-card>
    </div>
            
    </div>

</template>

<script>
import db from '@/firebase/init'
import moment from 'moment'

export default {
  name: 'GameMoves',
  props: ['turn'],
  components: {
    
  },
  data(){
    return{
      moves: []
    }
  },
  mounted(){
    // the control in moves 
    let ref = db.collection('games').doc('UwaFbzVh4MPyhzLbDNrx').collection('moves')
    
    // subscribe to changes to the 'messages' collection
    ref.onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        console.log(change)
        if(change.type == 'added'){
          let doc = change.doc
          this.moves.push({
            define: doc.data().define,
            num_of_words: doc.data().num_of_words,
          })
        }
      })
    })
  }
}
</script>

<style scoped>
span.define {
color: rgb(138, 131, 42);
font-size: 25px
}

span.num_of_words {
font-size: 25px;
color: rgb(76, 77, 24);
font-style: inherit
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
