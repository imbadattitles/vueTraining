<template>
  <div v-if="posts.length > 0">
    <transition-group name="list">
      <PostItem @remove="$emit('remove', post)" v-for="post in posts" :key="post.id" :post="post" />
    </transition-group>
    <slot />
  </div>
  <h3 v-else>Пусто</h3>
</template>
<script>
import PostItem from './PostItem.vue'
export default {
  components: {
    PostItem
  },
  props: {
    posts: {
      type: Array,
      required: true
    }
  }
}
</script>
<style scoped>
.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active,
.list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to /* .list-leave-active до версии 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}

.list-move {
  transition: transform 0.8s ease;
}
</style>
