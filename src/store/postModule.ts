import axios from 'axios'

export const postModule = {
  state: () => {
    return {
      posts: [],
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
  },
  getters: {
    sortedPosts(state) {
      return [...state.posts].sort(
        (post1, post2) => post1[state.selectedSort]?.localeCompare(post2[state.selectedSort])
      )
    },
    sortedAndSearchedPosts(state, getters) {
      return getters.sortedPosts.filter((post) =>
        post.title.toLowerCase().includes(state.searchQuery.toLowerCase())
      )
    }
  },
  mutations: {
    setPosts(state, payload) {
      state.posts = payload
    },
    setLoading(state, payload) {
      state.isPostLoading = payload
    },
    setPage(state, payload) {
      state.currentPage = payload
    },
    setSelectedSord(state, payload) {
      state.selectedSort = payload
    },
    setTotalPages(state, payload) {
      state.totalPages = payload
    },
    setSearchQuery(state, payload) {
      state.searchQuery = payload
    }
  },
  actions: {
    async fetchPosts({ state, commit }) {
      try {
        commit('setLoading', true)
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts`, {
          params: {
            _page: state.currentPage,
            _limit: state.limit
          }
        })
        commit('setPosts', response.data)
        commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / state.limit))
      } catch (e) {
        alert(e)
      } finally {
        commit('setLoading', false)
      }
    },
    async fetchMorePosts({ state, commit }) {
      try {
        commit('setPage', (state.currentPage += 1))
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts`, {
          params: {
            _page: state.currentPage,
            _limit: state.limit
          }
        })
        commit('setPosts', [...state.posts, ...response.data])
      } catch (e) {
        alert(e)
      }
    }
  },
  namespaced: true
}
