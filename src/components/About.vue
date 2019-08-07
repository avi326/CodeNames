<template>
    <div id="about">
        <h1> Rules: </h1>
        <pdf src="./static/codenames-rules-he.pdf"></pdf>
    </div>
</template>

<script>
import pdf from 'vue-pdf'

export default {
    components:{
        pdf
    },
    name: 'About',
    data () {
        return {

        }
    }
}
</script>

<style>

</style>
