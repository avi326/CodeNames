<template>
    <div>
        <label class="typo__label"> בחירת המילים</label>
        <multiselect v-model="value" tag-placeholder="Add this as new tag" placeholder="Search or add a tag" label="name" track-by="code" :options="options" :multiple="true" :taggable="true" @tag="addTag"></multiselect>
        <pre class="language-json"><code>{{ value  }}</code></pre>
    </div>
</template>

<script>
import Multiselect from 'vue-multiselect'

export default {
  components: {
    Multiselect
  },
  data () {
    return {
      value: [
      ],
      options: [
        { name: 'אדמה', code: 'vu' },
        { name: 'גרגיר', code: 'js' },
        { name: 'יד', code: 'os' },
        { name: 'ארוחה', code: 'a1' },
        { name: 'כדור', code: 'a2' },
        { name: 'עציץ', code: 'a3' },
        { name: 'דף', code: 'a4' }
      ]
    }
  },
  methods: {
    addTag (newTag) {
      const tag = {
        name: newTag,
        code: newTag.substring(0, 2) + Math.floor((Math.random() * 10000000))
      }
      this.options.push(tag)
      this.value.push(tag)
    }
  }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style>

</style>
