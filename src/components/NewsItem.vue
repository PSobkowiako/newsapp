<template>
  <div class="w-full rounded-lg h-48 border border-grey-light mt-6 flex">

    <div class="w-1/4 h-48 overflow-hidden bg-cover rounded-l-lg -my-px border-r-4 border-blue-dark" :style="'background-image: url('+ item.urlToImage +')'">
    </div>

    <div class="w-3/4 pl-2 pr-2">

      <div class="text-black font-bold text-l mb-4 mt-2"><a class="no-underline text-black hover:underline" :href="item.url" @click="mark_read" target="_blank">{{ item.title | truncate_text(55) }}</a></div>

      <div class="h-24">
        <p class="text-xs text-grey-darker">
          {{ item.description | truncate_text(100) }}
        </p>
      </div>

      <div class="flex text-xs mt-4 justify-between items-end text-grey-darker">
        <div class="w-1/2 flex-1">{{ item.author | truncate_text(20) }}</div>
        <div class="w-1/2 flex-1 text-right">{{ item.publishedAt | to_date }}</div>
      </div>

    </div>
  </div>
</template>

<script>

import moment from 'moment'
import _ from 'lodash'

export default {
  /* eslint-disable */

  name: 'news-item',

  props: ['item'],

  data () {
    return {

      is_read: false
    }
  },

  methods: {

    mark_read() {

      this.is_read = true
      this.$emit('read', true)
    }
  },

  filters: {
    to_date(timestamp) {
      return moment(timestamp).format('D/MMM/YYYY, h:mma')
    },

    truncate_text(text, len) {
      return _.truncate(text, {length: len})
    }
  }
}
</script>

<style lang="css" scoped>
</style>