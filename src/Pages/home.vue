<template>
  <div>
    <header>
      <!-- Navigation bar -->
      <nav class="relative flex w-full items-center justify-between bg-white py-2 text-neutral-600 shadow-lg hover:text-neutral-700 focus:text-neutral-700 dark:bg-neutral-600 dark:text-neutral-200" data-te-navbar-ref>
        <div class="flex w-full flex-wrap items-center justify-between px-3">

          <!-- Navigation links -->
          <ul class="mr-auto flex mr-2 flex-row" data-te-navbar-nav-ref>
            <li class="mb-4 lg:mb-0 lg:pr-2" data-te-nav-item-ref>
              <a class="block transition duration-150 ease-in-out hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:hover:text-white dark:focus:text-white p-2 [&.active]:text-black/90" href="#!" data-te-nav-link-ref data-te-ripple-init data-te-ripple-color="light">Home</a>
            </li>
            <li v-for="page in totalPages" :key="page" class="mb-4 mb-0 pr-2" data-te-nav-item-ref>
              <a class="block transition duration-150 ease-in-out hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:hover:text-white dark:focus:text-white p-2" :class="[page === currentPage ? 'active' : '']" @click="changePage(page)" href="#!" data-te-nav-link-ref data-te-ripple-init data-te-ripple-color="light">{{ page }}</a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
    <div class="mx-auto items-baseline ml-1 mr-1 lg:flex">
      <NewsItemContainer v-for="(pageItems, index) in paginatedItems" :key="index" :items="pageItems" />
    </div>
  </div>
</template>

<script>
import NewsItemContainer from '../components/NewsItemContainer.vue'
import axios from 'axios'
import _ from 'lodash'

export default {
  name: 'homePage',
  components: {
    NewsItemContainer
  },
  data() {
    return {
      sources: [],
      currentPage: 1,
      itemsPerPage: 15
    }
  },
  computed: {
    totalPages() {
      return Math.ceil(this.sources.length / this.itemsPerPage)
    },
    paginatedItems() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage
      const endIndex = startIndex + this.itemsPerPage
      return _.chunk(this.sources.slice(startIndex, endIndex), 5)
    }
  },
  created() {
    const articles = {
      "action": "getArticles",
      "keyword": "games",
      "articlesPage": 1,
      "articlesCount": 60,
      "articlesSortBy": "date",
      "articlesSortByAsc": false,
      "articlesArticleBodyLen": -1,
      "resultType": "articles",
      "dataType": [
        "news",
        "pr"
      ],
      "apiKey": "06f9f3e8-ed59-4ecb-a160-2b39600e33ac",
      "forceMaxDataTimeWindow": 31
    }
    axios
        .post('https://eventregistry.org/api/v1/article/getArticles ', articles)
        .then(response => {
          this.sources = response.data.articles.results
          console.log(this.sources)
        })
  },
  methods: {
    changePage(page) {
      this.currentPage = page
    }
  }
}
</script>

<style>
</style>
