<template lang="">
  <header class="flex gap-3">
    <router-link to="/posts">Посты</router-link>
    <router-link to="/">Домой</router-link>
    <my-btn @click="$router.push('/store')">Стор</my-btn>
  </header>
  <RouterView></RouterView>
</template>
<script>
import { RouterView } from 'vue-router'
export default {
  components: {
    RouterView
  }
}
</script>
<style lang=""></style>
