<template>
  <div class="w-1/3 sm:w-full p-3 m-4 border-grey-light border-2 rounded-lg bg-white shadow">
    <h2 class="uppercase text-base text-center tracking-wide border-b-2 pb-2 border-grey-light">
      {{ items[0] && items[0].source ? items[0].source.name : '' }}
    </h2>

    <news-item v-for="item in paginatedItems" :key="item.id" :item="item" class="mb-6" />

    <div class="mt-4">
      <!-- Pagination controls -->
    </div>
  </div>
</template>

<script>
import NewsItem from './NewsItem.vue'

export default {
  name: 'news-item-container',
  components: {
    NewsItem
  },
  props: ['items'],
  data() {
    return {
      currentPage: 1,
      itemsPerPage: 15
    }
  },
  computed: {
    totalPages() {
      return Math.ceil(this.items.length / this.itemsPerPage)
    },
    paginatedItems() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage
      const endIndex = startIndex + this.itemsPerPage
      return this.items.slice(startIndex, endIndex)
    }
  },
  methods: {
    changePage(page) {
      this.currentPage = page
    }
  }
}
</script>

<style lang="css" scoped>
@media (min-width: 640px) {
  .news-item-container {
    display: grid;
    grid-template-columns: repeat(1, 5fr);
    gap: 1rem;
  }
}
</style>