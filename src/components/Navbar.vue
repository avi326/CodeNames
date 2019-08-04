<template>
    <div class="Navbar">
        <b-navbar toggleable="lg" type="dark" variant="info">
            <b-navbar-brand>Code-Names Game</b-navbar-brand>
            <b-collapse id="nav-collapse" is-nav>
                    <b-navbar-nav>
                        <b-nav-item to='/'> Home </b-nav-item>
                        <b-nav-item :to="{ name: 'TableOfGames'}"> Table Of Games </b-nav-item>
                        <b-nav-item :to="{ name: 'Guide'}"> Guide </b-nav-item>
                        <b-nav-item :to="{ name: 'About'}"> About </b-nav-item>
                    </b-navbar-nav>
                    <b-navbar-nav class="ml-auto">
                        <b-nav-item v-if="!user" :to="{ name: 'Signup'}"> Signup </b-nav-item>
                        <b-nav-item v-if="!user" :to="{ name: 'Login'}"> Login </b-nav-item> 
                        <b-nav-item v-if="user" @click="logout"> Logout </b-nav-item> 
                   </b-navbar-nav>
                    <!-- <b-nav-item :to="{ name: 'About'}"> <span class="glyphicon glyphicon-log-in"></span> Login </b-nav-item>  -->
            </b-collapse>
        </b-navbar> 


    </div>
</template>

<script>
import firebase from 'firebase'

export default {
    name: 'Navbar',
    data () {
        return {
            user: null

        }
    },
    methods: {
        logout () {
            firebase.auth().signOut().then( () => {
                this.$router.push({ name: 'Home'})
            }

            )
        }

    },
  created(){
    firebase.auth().onAuthStateChanged((user) => {
      if(user){
        this.user = user
      } else {
        this.user = null
      }
    })    
  }
    
}
</script>

<style>

</style>
