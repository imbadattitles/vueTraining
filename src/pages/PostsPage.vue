<template>
  <main class="p-10">
    <h1>Страница с постами</h1>
    <MyInput v-model="searchQuery" placeholder="Поиск" />
    <div class="flex justify-between">
      <my-btn class="btn mb-3" @click="showDialog">Создать пользователя</my-btn>
      <MySelect v-model="selectedSort" :options="sortOptions" />
    </div>
    <MyDialog v-model:show="dialogVisible">
      <PostAdd @create="createPost" />
    </MyDialog>
    <h3>Список постов</h3>
    <PostList v-if="!isPostLoading" :posts="sortedAndSearchedPosts" @remove="removePost" />
    <p v-else>Загрузка...</p>
    <div v-intersection="fetchMorePosts" class="h-0 w-0" />
    <!-- <div class="flex gap-2">
        <div
          :class="{ ' border-teal-400': page === currentPage }"
          class="border-[1px] border-black border-solid p-3"
          v-for="(page, index) in totalPages"
          :key="index"
          @click="changePage(page)"
        >
          {{ page }}
        </div>
      </div> -->
  </main>
</template>

<script>
import PostAdd from '../components/PostAdd.vue'
import PostList from '../components/PostList.vue'
import MyDialog from '../components/UI/MyDialog.vue'
import MyInput from '@/components/UI/MyInput.vue'
import MySelect from '@/components/UI/MySelect.vue'
import axios from 'axios'
export default {
  components: {
    PostAdd,
    PostList,
    MyDialog,
    MySelect,
    MyInput
  },
  methods: {
    createPost(post) {
      this.posts.push(post)
      this.dialogVisible = false
    },
    removePost(post) {
      this.posts = this.posts.filter((item) => item.id !== post.id)
    },
    showDialog() {
      this.dialogVisible = true
    },
    // changePage(page) {
    //   this.currentPage = page
    // },
    async fetchPosts() {
      try {
        this.currentPage = 1
        this.isPostLoading = true
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts`, {
          params: {
            _page: this.currentPage,
            _limit: this.limit
          }
        })
        this.posts = response.data
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
      } catch (e) {
        alert(e)
      } finally {
        this.isPostLoading = false
      }
    },
    async fetchMorePosts() {
      try {
        this.currentPage += 1
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts`, {
          params: {
            _page: this.currentPage,
            _limit: this.limit
          }
        })
        this.posts = [...this.posts, ...response.data]
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
      } catch (e) {
        alert(e)
      }
    }
    //     postLoad() {
  },

  mounted() {
    this.fetchPosts()
    // this.postLoad()
  },
  computed: {
    sortedPosts() {
      return [...this.posts].sort((post1, post2) =>
        post1[this.selectedSort]?.localeCompare(post2[this.selectedSort])
      )
    },
    sortedAndSearchedPosts() {
      return this.sortedPosts.filter((post) =>
        post.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      )
    }
  },
  watch: {
    // currentPage() {
    //   this.fetchPosts()
    // }
  },
  data() {
    return {
      posts: [],
      dialogVisible: false,
      isPostLoading: false,
      selectedSort: '',
      searchQuery: '',
      currentPage: 1,
      limit: 10,
      totalPages: 0,
      sortOptions: [
        { value: 'title', name: 'По названию' },
        { value: 'body', name: 'По описанию' }
      ]
    }
  }
}
</script>
<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
