
<template>
  <header>
    <!-- Navigation bar -->
    <nav
        class="relative flex w-full items-center justify-between bg-white py-2 text-neutral-600 shadow-lg hover:text-neutral-700 focus:text-neutral-700 dark:bg-neutral-600 dark:text-neutral-200 md:flex-wrap md:justify-start"
        data-te-navbar-ref>
      <div class="flex w-full flex-wrap items-center justify-between px-3">
        <div class="flex items-center">
          <!-- Hamburger menu button -->
          <button
              class="border-0 bg-transparent px-2 text-xl leading-none transition-shadow duration-150 ease-in-out hover:text-neutral-700 focus:text-neutral-700 dark:hover:text-white dark:focus:text-white lg:hidden"
              type="button"
              data-te-collapse-init
              data-te-target="#navbarSupportedContentX"
              aria-controls="navbarSupportedContentX"
              aria-expanded="false"
              aria-label="Toggle navigation">
            <!-- Hamburger menu icon -->
            <span class="[&>svg]:w-5">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="h-7 w-7">
              <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </span>
          </button>
        </div>

        <!-- Navigation links -->
        <div
            class="!visible hidden grow basis-[100%] items-center lg:!flex lg:basis-auto"
            id="navbarSupportedContentX"
            data-te-collapse-item>
          <ul
              class="mr-auto flex flex-col lg:flex-row"
              data-te-navbar-nav-ref>
            <li class="mb-4 lg:mb-0 lg:pr-2" data-te-nav-item-ref>
              <router-link
                  class="block transition duration-150 ease-in-out hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:hover:text-white dark:focus:text-white lg:p-2 [&.active]:text-black/90"
                  :to="'/news'"
                  data-te-nav-link-ref
                  data-te-ripple-init
                  data-te-ripple-color="light"
              >
                Home
              </router-link>
            </li>

            <li class="mb-4 lg:mb-0 lg:pr-2" data-te-nav-item-ref>
              <a
                  class="block transition duration-150 ease-in-out hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:hover:text-white dark:focus:text-white lg:p-2 [&.active]:text-black/90"
                  href="#!"
                  data-te-nav-link-ref
                  data-te-ripple-init
                  data-te-ripple-color="light"
              >About News</a
              >
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
  <div class="container my-24 px-6 mx-auto">
    <section class="mb-32 text-gray-800 text-center">
      <div class="flex flex-wrap justify-center mb-12">
        <div class="grow-0 shrink-0 basis-auto w-full md:w-10/12 px-3">
          <div v-for="item in items" :key="item.title" class="relative overflow-hidden bg-no-repeat bg-cover relative overflow-hidden bg-no-repeat bg-cover ripple shadow-lg mb-6 rounded-lg"
              data-mdb-ripple="true" data-mdb-ripple-color="light">
            <img :src="item.urlImage" alt="Article Image" class="w-full" />
            <a href="#!">
              <div class="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed opacity-0 hover:opacity-100 transition duration-300 ease-in-out"
                   style="background-color: rgba(251, 251, 251, 0.15)"></div>
            </a>
          </div>
        </div>

        <div v-for="item in items" :key="item.title" class="grow-0 shrink-0 basis-auto w-full md:w-8/12 xl:w-6/12 px-3">
          <h5 class="text-lg font-bold mb-3">{{item.title}}</h5>
          <p class="text-gray-500 mb-4">
            <small>Published <u></u> by
              <a href="" class="text-gray-900">{{item.author}}</a></small>
          </p>
          <p class="mb-6">{{item.description}}</p>
          <a data-mdb-ripple="true" data-mdb-ripple-color="light"
             class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
             href="" role="button">Read more</a>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import _ from "lodash";
import axios from "axios";

export default {
  name: 'ModalNewsPage',
  props: ['item'],
  data() {
    return {
      items: []
    }
  },
  created() {
    const pathSegments = this.$route.path.split('/');
    axios.get('https://newsapi.org/v2/top-headlines?sources=' + pathSegments + '&apiKey=445f76b1806a4ff7b3133ed6649bd509')
        .then(response => {
          console.log(response);
          this.items = _.sampleSize(response.data.articles, 5).map(article => ({
            title: article.title,
            description: article.description,
            urlImage: article.urlToImage,
            author: article.author,

          }));
        });

  }
}
</script>