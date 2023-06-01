<template>
  <div class="w-full rounded-lg h-48 border border-grey-light mt-6 flex">
    <div class="w-1/4 h-48 overflow-hidden bg-cover rounded-l-lg -my-px border-r-4 border-blue-dark" :style="'background-image: url('+ item.urlToImage +')'">
    </div>
    <div class="w-3/4 pl-2 pr-2">
      <div class="text-black font-bold text-l mb-4 mt-2">
        <a class="no-underline text-black hover:underline">{{ item.title }}</a>
      </div>
      <div class="h-24">
        <p class="text-xs text-grey-darker">
          {{ item.description }}
        </p>
      </div>
      <router-link :to="{ path: '/modal/' + item.title }">Go to</router-link>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'news-item',
  props: ['item'],
  created() {
    console.log(this.item.title);
  },
  data() {
    return {
      is_read: false
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
