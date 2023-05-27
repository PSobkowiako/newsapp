
<template>
  <div id="app" class="min-h-screen bg-grey-lighter font-sans">

    <h1 class="text-3xl text-center p-6 tracking-tight">TODAY'S NEWS</h1>

    <div class="flex flex-wrap justify-between mx-auto items-baseline ml-8 mr-8">

      <news-item-container v-for="source in sources" :key="source.id" :source="source" />

    </div>

  </div>
</template>

<script>
import NewsItemContainer from './components/NewsItemContainer.vue'
import axios from "axios";
import _ from 'lodash'

export default {
  name: 'app',
  components: {
    NewsItemContainer
  },
  data() {
    return {
      'sources': []
    }
  },
  created() {

    axios.get('https://newsapi.org/v2/sources?language=en&apiKey='+ process.env.VUE_APP_NEWS_API_KEY)
        .then(response => {
        console.log(response)
          this.sources = _.sampleSize(response.data.sources, 3)

        })
  }
}
</script>

<style>
</style>
