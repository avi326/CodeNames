<template>
  <div id="app">
               
    <b-container>
      <b-row>
        <b-col cols="12" md="12">
          <Navbar/>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12" md="12">
          <router-view/>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'

export default {
  name: 'App',
  components: {
    Navbar
  }
}
</script>

<style>

</style>
