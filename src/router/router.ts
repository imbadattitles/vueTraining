import PostsPage from '../pages/PostsPage.vue'
import MainPage from '../pages/MainPage.vue'
import PostPage from '../pages/PostPage.vue'
import PostPageStore from '../pages/PostsPageWithStore.vue'
import { createRouter, createWebHashHistory } from 'vue-router'
const Home = { template: '<div>Home</div>' }
const About = { template: '<div>About</div>' }
const routes = [
  { path: '/', component: MainPage },
  { path: '/posts', component: PostsPage },
  { path: '/posts/:id', component: PostPage },
  { path: '/store', component: PostPageStore }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
