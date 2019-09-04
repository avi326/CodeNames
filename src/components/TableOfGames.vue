<template>
    <div id="TableOfGames">
    <b-container>
      <b-row>
        <b-col>
            <h1 style="text-align: center;" >   לוח משחקים </h1>
        </b-col>
      </b-row>
      <b-row  class="justify-content-md-center">
        <b-col md="auto">
          <p v-if="alias" style="text-align: right;  direction: rtl;" >ברוך הבא <b>{{ alias }}</b>, אתה יכול להתחיל לשחק!  </p>
          <p v-else> שלום אורח, בבקשה <router-link :to="{ name: 'Signup'}"> הירשם  </router-link> או <router-link :to="{ name: 'Login'}">
            התחבר 
            <i class="fa fa-header" aria-hidden="true"></i> </router-link>  </p>
        </b-col>
      </b-row>
      <b-row  class="justify-content-md-center">
        <b-col md="auto">
            <p style="text-align: right;  direction: rtl;">  אם יש מישהו שאתה רוצה לשחק איתו - תחפש אותו ברשימה ולחץ <b> הצטרף למשחק</b>. <br>
            אחרת, לחץ למטה על <b> משחק חדש </b> ותחכה שהוא יצטרף אליך. <br>
              אם אין מישהו שקבעת איתו. פתח <b> משחק חדש </b> ותחכה שיצטרפו אליך.  </p>
            <table v-if="alias" style="text-align: right;  direction: rtl;">
              <thead>
                <tr>
                    <th>שחקן ראשון </th>
                    <th>שחקן שני</th>
                    <th>מספר השחקנים כרגע</th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="game in games" :key="game.id">
                  <td> {{ game.player1 }} </td>
                  <td v-if="game.player2==''"> <router-link :to="{ name: 'Game', params: {player_one_alias: game.player1 , player_two_alias: alias , conected_player: alias}}"> הצטרף למשחק  </router-link> </td>
                  <td v-else> {{ game.player2 }} </td>
                  <td class="play_now">  {{ game.countPlayers }} </td>
                  <td v-if="alias == game.player1"> <i class="material-icons delete" @click="deleteGame(game.id)">delete</i> </td>
                  <!-- <td v-if="game.player2 == alias || game.player1 == alias" > <router-link :to="{ name: 'Game', params: {player_one_alias: game.player1 , player_two_alias: alias , conected_player: alias}}"> Resume game </router-link> </td> -->

                </tr>
                <tr>
                  <td   style="text-align: left;  direction: rtl;"><NewGame :alias="alias"/></td>
                </tr>
              </tbody>
            </table>

        </b-col>
      </b-row>
    </b-container>
      

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
        } else if (change.type == 'removed' || change.type == 'modified')
        {
           //Every game deletion need to reload the page and and update the table of games
           console.log("need refresh:", change.doc)

          //this.$forceUpdate();
         

        }
      })
    })
  }




  
}
</script>

<style>

table {
  max-width: 400px;
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
