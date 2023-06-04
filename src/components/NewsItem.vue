<template>
  <div class="w-full rounded-lg h-48 border border-grey-light mt-6 flex">
    <div v-for="item in localItems" :key="item.title" class="w-1/4 h-48 overflow-hidden bg-cover rounded-l-lg -my-px border-r-4 border-blue-dark" :style="'background-image: url('+ item.urlImage +')'">
    </div>
    <div class="w-3/4 pl-2 pr-2">
      <div class="text-black font-bold text-l mb-4 mt-2">
        <a v-for="item in localItems" :key="item.title" class="no-underline text-black hover:underline">{{ item.title }}</a>
      </div>
      <div class="h-24">
        <p v-for="item in localItems" :key="item.title" class="text-xs text-grey-darker">
          {{ item.description }}
        </p>
      </div>
      <router-link :to="{ path: '/modal/' + item.id }">Go to</router-link>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import axios from "axios";
import _ from "lodash";

export default {
  name: 'news-item',
  props: ['item'],
  created() {
    axios.get('https://newsapi.org/v2/top-headlines?sources=' + this.item.id + '&apiKey=a1c428ce812f45ddbe41ce3467c172be')
        .then(response => {
          console.log(response);
          this.localItems = _.sampleSize(response.data.articles, 1).map(article => ({
            title: article.title,
            description: article.description,
            urlImage: article.urlToImage,
            author: article.author,

          }));
        });
    console.log(this.item.description)
    console.log(this.item.id)
  },
  data() {
    return {
      is_read: false,
      localItems: [],
    }
  },

  methods: {},
  filters: {
    to_date(timestamp) {
      return moment(timestamp).format('D/MMM/YYYY, h:mma')
    },
    truncate_text(text, len) {
      return text.slice(0, len) + (text.length > len ? '...' : '')
    }
  }
}
</script>

<style lang="css" scoped>
</style>
