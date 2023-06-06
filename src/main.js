import {createApp} from 'vue'
import { createRouter, createWebHistory } from 'vue-router';


import App from './App.vue'
import home from './Pages/home.vue';
import modal from './components/modalNewsPage.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: home },
        { path: '/modal/:title', component: modal },
    ]
});


const app = createApp(App);
app.use(router);
router.isReady().then(function() {
    app.mount('#app');
});
