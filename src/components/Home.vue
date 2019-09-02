<template>
  <div class="home">

    <b-container class="bv-example-row">
      <b-row>
        <b-col></b-col>
        <b-col>

            <h3 style="direction: rtl; text-align: right; ">  ברוכים הבאים למשחק שם קוד! </h3> <br>
            <p style="direction: rtl; text-align: right; ">
             תודה שבחרתם להיות שותף למחקר על השפה האנושית. <br>
             מטרת המחקר היא לגרום למחשבים להבין טוב יותר את שפת בני האדם. <br>
             איך זה נעשה? בעזרתך! <br>
             את\ה בסה"כ צריך לשחק במשחק, והמחשב כבר ילמד ממך. <br> <br>
             רוצה להתחיל?
             </p>
             <h4>
             <router-link :to="{ name: 'Signup'}"> הירשם  כאן כדי להתחיל  </router-link>
             </h4>
             <p>
            אם שיחקת בעבר - 
  <router-link :to="{ name: 'Login'}">  התחבר</router-link>
              </p>


        </b-col>
        <b-col></b-col>
      </b-row>
</b-container>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
