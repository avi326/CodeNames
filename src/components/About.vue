<template>
    <div id="about">
    <b-container class="bv-example-row">
      <b-row>
        <b-col></b-col>
        <b-col>

      <Chat/>


        </b-col>
        <b-col></b-col>
      </b-row>
            <b-row>
        <b-col></b-col>
        <b-col>

            
       <p> 
        עבודת מחקר של אבי ברזני ודוד פנירי במסגרת קורס "עיבוד שפה טבעית" באוניברסיטה הפתוחה.
        </p>
       <p> 
      אבי ברזני: avibarazani326@gmail.com
        </p>
               <p> 
        דוד פנירי: dudupaniri@gmail.com
        </p>
        </b-col>
        <b-col></b-col>
      </b-row>
      
      
</b-container>

      
        
    </div>
</template>

<script>
import Chat from '@/components/Chat'

export default {
    components:{
        Chat
    },
    name: 'About',
    data () {
        return {

        }
    }
}
</script>

<style scoped>
 p {
   direction: rtl; 
   text-align: right; 
 }
</style>
