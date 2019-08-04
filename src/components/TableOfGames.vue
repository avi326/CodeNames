<template>
    <div id="TableOfGames">
        <h1> Table Of Games </h1>

        <p> hello  </p>
        <p v-if="user"> {{ user.email }} </p>

        <table>
        <thead>
          <tr>
              <th>Name1</th>
              <th>Name2</th>
              <th>num of players now</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="game in games" :key="game.id">
            <td> {{ game.player1 }}</td>
            <td v-if="game.player2==''"> Join! </td>
            <td v-else> {{ game.player2 }} </td>
            <td class="play_now">  {{ game.countPlayers }} </td>
            <td> <i class="material-icons delete" @click="deleteGame(game.id)">delete</i> </td>
          </tr>
          <tr>
             <td><NewGame/></td>
          </tr>
        </tbody>
      </table>

        
    </div>
</template>

<script>
import NewGame from '@/components/NewGame'
import firebase from 'firebase'
import db from '@/firebase/init'
import moment from 'moment'

export default {
    name: 'TableOfGames',
    data () {
        return {
          user: null,
          games: []
        }
    },
  components: {
    NewGame
  },
  methods: {
    deleteGame(id){
      // delete doc from firestore
      console.log(id)
      db.collection('table_of_players').doc(id).delete()
      .then(() => {
        this.games = this.games.filter(game => {
          return game.id != id
        })
      }).catch(err => {
        console.log(err)
      })
    }

  },
  created(){
    // let user = firebase.auth().currentUser
    firebase.auth().onAuthStateChanged((user) => {
      if(user){
        this.user = user
      } else {
        this.user = null
      }
    })  
    
    // show the table of players:
    let ref = db.collection('table_of_players').orderBy('time')
    
    // subscribe to changes to the 'games' collection
    ref.onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        console.log(change)
        if(change.type == 'added'){
          let doc = change.doc
          this.games.push({
            id: doc.id,
            player1: doc.data().player1,
            player2: doc.data().player2,
            countPlayers: doc.data().countPlayers,
            time: moment(doc.data().time).format('lll')
          })
        }
      })
    })
    
// firebase.auth().onAuthStateChanged(function (user) {
//     if (user) {
//       window.alert(user.uid)
//       console.log(db.collection('users').where('user_id','==',user.uid).get())
//       db.collection('users').where('user_id','==',user.uid).get().then(
//         snapshot => {
//           snapshot.forEach((doc) => {
//             console.log(this.user_name =   db.ref('/users/' + user.uid).once(alias))
//             console.log(db.collection('users').get(user.uid))
//             console.log(db.collection('users').doc(doc.id).get())
//             this.user_name =   db.collection('users').doc(doc.id).get()
//             window.alert(this.user_name)
//           });

//         }
//       )

//     } 
// else{
//   window.alert("No USER")
// }
// });

  }




  
}
</script>

<style>

table {
  max-width: 300px;
}

td .play_now {
  background-color: red
}

td .free_to_play {
  background-color: green
}
td .join {
  color: green
}
</style>
