<template>
  <div v-for="item in localItems2" :key="item.title" class="w-full rounded-lg lg:h-50 h-65 border border-grey-light mt-6 flex">
    <div class="w-1/4 h-65 lg:50 overflow-hidden bg-cover rounded-l-lg -my-px border-r-4 border-blue-dark" :style="'background-image: url('+ item.image +')'">
    </div>
    <div class="w-3/4 pl-2 pr-2">
      <div class="text-black font-bold text-l mb-4 mt-2">
        <a class="no-underline text-black hover:underline">{{ item.title }}</a>
      </div>
      <div class="h-24">
        <p class="text-xs text-grey-darker">
          {{ shortenText(item.body) }}
        </p>
      </div  >
      <router-link :to="{ path: '/modal/' +item.uri}">Go to</router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import _ from "lodash";

export default {
  name: 'news-item',
  props: ['item'],

  created() {
    const articles = {
      "action": "getArticle",
      "articleUri": this.item.uri,
      "infoArticleBodyLen": -1,
      "resultType": "info",
      "apiKey": "38df1f02-a6bb-41c2-9b7a-b383b5864e7c"
    };

    axios.post('https://eventregistry.org/api/v1/article/getArticle', articles)
        .then(response => {
          console.log(response);
          this.localItems2 = _.sampleSize(response.data[this.item.uri], 1);
        });
    console.log(this.item.uri)
  },
  data() {
    return {
      is_read: false,
      localItems2: [],
    }
  },
  methods: {
    shortenText(text) {
      return text.length > 50 ? text.slice(0, 200) + "..." : text;
    }
  },
}
</script>

<style lang="css" scoped>
</style>
