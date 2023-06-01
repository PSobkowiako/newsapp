<template>
  <div class="w-1/3 p-3 m-4 border-grey-light border-2 rounded-lg bg-white shadow">
    <h2 class="uppercase text-base text-center tracking-wide border-b-2 pb-2 border-grey-light">{{ source.name }}</h2>

    <p v-show="items_read > 0" class="mt-3"><span class="font-bold">{{ items_read }}</span> read. </p>

    <news-item v-for="item in items" :key="item.id" :item="item" @read="mark_item" />

    <div v-if="totalPages > 1" class="mt-4">
      <span v-for="page in totalPages" :key="page" :class="{'font-bold': page === currentPage}" @click="changePage(page)" class="cursor-pointer">{{ page }}</span>
    </div>
  </div>
</template>

<script>
import NewsItem from './NewsItem.vue'
import axios from "axios";

export default {
  name: 'news-item-container',
  components: {
    NewsItem
  },
  props: ['source'],
  data() {
    return {
      items: [],
      items_read: 0,
      currentPage: 1,
      itemsPerPage: 50
    }
  },
  computed: {
    totalPages() {
      return Math.ceil(this.items.length / this.itemsPerPage);
    },
    paginatedItems() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.items.slice(startIndex, endIndex);
    }
  },
  created() {
    axios.get('https://newsapi.org/v2/top-headlines?sources=' + this.source.id + '&apiKey=9726239ec43842188fab07d3bf7778ff')
        .then(response => {
          this.items = response.data.articles;
        })
  },
  methods: {
    changePage(page) {
      this.currentPage = page;
    },
    mark_item() {
      this.items_read++;
    }
  }
}
</script>

<style lang="css" scoped>
</style>
