<template>
  <div v-for="cosie in localItems2" :key="cosie.title" class="w-full rounded-lg h-48 border border-grey-light mt-6 flex">
    <div class="w-1/4 h-48 overflow-hidden bg-cover rounded-l-lg -my-px border-r-4 border-blue-dark" :style="'background-image: url('+ cosie.image +')'">
    </div>
    <div class="w-3/4 pl-2 pr-2">
      <div class="text-black font-bold text-l mb-4 mt-2">
        <a class="no-underline text-black hover:underline">{{ cosie.title }}</a>
      </div>
      <div class="h-24">
        <p class="text-xs text-grey-darker">
          {{ shortenText(cosie.body) }}
        </p>
      </div >
      <router-link :to="{ path: '/modal/' + cosie.uri }">Go to</router-link>
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
      "apiKey": "06f9f3e8-ed59-4ecb-a160-2b39600e33ac"
    };

    axios.post('http://eventregistry.org/api/v1/article/getArticle', articles)
        .then(response => {
          console.log(response);
          this.localItems2 = _.sampleSize(response.data[this.item.uri], 1);
        });
  },
  data() {
    return {
      is_read: false,
      localItems2: [],
    }
  },
  methods: {
    shortenText(text) {
      return text.length > 50 ? text.slice(0, 250) + "..." : text;
    }
  },
}
</script>

<style lang="css" scoped>
</style>
