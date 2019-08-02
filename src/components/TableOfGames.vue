<template>
    <div id="guide">
        <h1> Table Of Games </h1>

        <p> hello {{ this.user_name }} </p>
        
    </div>
</template>

<script>
import Register from '@/components/Register'
import firebase from 'firebase'
import db from '@/firebase/init'

export default {
    name: 'TableOfGames',
    data () {
        return {
          user_name: null

        }
    },
  components: {
    Register
  },
  mounted () {
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      window.alert(user.uid)
      console.log(db.collection('users').where('user_id','==',user.uid).get())
      db.collection('users').where('user_id','==',user.uid).get().then(
        snapshot => {
          snapshot.forEach((doc) => {
            console.log(this.user_name =   db.ref('/users/' + user.uid).once(alias))
            console.log(db.collection('users').get(user.uid))
            console.log(db.collection('users').doc(doc.id).get())
            this.user_name =   db.collection('users').doc(doc.id).get()
            window.alert(this.user_name)
          });

        }
      )

    } 
else{
  window.alert("No USER")
}
});
    // let user = firebase.auth().currentUser

    // if (user) {
    //   db.collection('users').where('user_id','==',user.uid).get().then(
    //     snapshot => {
    //       snapshot.forEach((doc) => {
    //         console.log(this.user_name =   db.ref('/users/' + user.uid).once(alias))
    //         console.log(db.collection('users').get(user.uid))
    //         console.log(db.collection('users').doc(doc.id).get())
    //         this.user_name =   db.collection('users').doc(doc.id).get()
    //       });

    //     }
    //   )

    // } else {
    //   this.user_name = "dont connect"

    // }
  }
}
</script>

<style>

</style>
