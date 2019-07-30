<template>
    <div class="chat">
        <h2> chat </h2>
        <b-card>
            <ul>
                    <span> name </span>
                    <span> message </span>
                    <span> time </span>
            </ul>
            <b-card>
                <NewMessage :name="name"/>
            </b-card>
        </b-card>
    </div>

</template>

<script>
import NewMessage from '@/components/NewMessage'

export default {
    name: 'Chat',
    props: ['name'],
    components: {
        NewMessage
    },
    data () {
        return {

        }

    }
}
</script>

<style>

</style>
