<template>
  <div class="w-25r p-3 m-4 border-grey-light border-2 rounded-lg bg-white shadow">
    <h2 class="uppercase text-base text-center tracking-wide border-b-2 pb-2 border-grey-light">{{ this.source.name }}</h2>

    <p v-show="items_read > 0" class="mt-3"><span class="font-bold">{{ items_read }}</span> read. </p>

    <news-item v-for="item in items" :key="item.id" :item="item" @read="mark_item" />

  </div>
</template>

<script>

import NewsItem from './NewsItem.vue'

//lodash
import _ from 'lodash'
import axios from "axios";
export default {

  name: 'news-item-container',

  components: {

    NewsItem

  },

  props: ['source'],

  data () {
    return {

      'items': [],
      'items_read': 0

    }
  },

  methods: {

    mark_item(is_read) {

      if(is_read == true)

        this.items_read++

    }

  },

  created() {

    axios.get('https://newsapi.org/v2/top-headlines?sources='+ this.source.id +'&apiKey='+ process.env.VUE_APP_NEWS_API_KEY)
        .then(response => {

          this.items = _.sampleSize(response.data.articles, 5)

        })

  }

}
</script>

<style lang="css" scoped>
</style>