<template>
    <div id="TableOfGames">
        <h1> Table Of Games </h1>

        <p v-if="alias">hello {{ alias }} </p>
        <p v-else> hello guest, please <router-link :to="{ name: 'Signup'}"> signup here </router-link> or <router-link :to="{ name: 'Login'}"> login <i class="fa fa-header" aria-hidden="true"></i> </router-link>  </p>

      <table v-if="alias">
        <thead>
          <tr>
              <th>Name1</th>
              <th>Name2</th>
              <th>num of players now</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="game in games" :key="game.id">
            <td> {{ game.player1 }} </td>
            <td v-if="game.player2==''"> <router-link :to="{ name: 'Game', params: {player_one_alias: game.player1 , player_two_alias: alias , conected_player: alias}}"> Join!  </router-link> </td>
            <td v-else> {{ game.player2 }} </td>
            <td class="play_now">  {{ game.countPlayers }} </td>
            <td> <i class="material-icons delete" @click="deleteGame(game.id)">delete</i> </td>
            <td v-if="game.player2 == alias || game.player1 == alias" > <router-link :to="{ name: 'Game', params: {player_one_alias: game.player1 , player_two_alias: alias , conected_player: alias}}"> Resume game </router-link> </td>

          </tr>
          <tr>
             <td><NewGame :alias="alias"/></td>
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
          alias: null,
          games: [],
        }
    },
  components: {
    NewGame
  },
  methods: {
    deleteGame(id){
      // delete doc from firestore
      console.log(id)
      db.collection('games').doc(this.alias).delete()
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
  let user = firebase.auth().currentUser;

  if(user){
      db.collection('users').where('user_id', '==', user.uid).get()
        .then(snapshot => {
          snapshot.forEach((doc) => {
            this.alias = doc.id // doc id is the alias of user
          })
        }).then(() => {

        })
        } else {
          this.user = "error: no user connected"
      }

    // show the table of players:
    let ref = db.collection('table_of_players').orderBy('time')
    
    // subscribe to changes to the 'games' collection
    ref.onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        // console.log(change)
        if(change.type == 'added'){
          let doc = change.doc
          this.games.push({
            id: doc.id,
            player1: doc.data().player1,
            player2: doc.data().player2,
            countPlayers: doc.data().countPlayers,
            time: moment(doc.data().time).format('lll')
          })
           // this.$router.push() 

        }
      })
    })
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
