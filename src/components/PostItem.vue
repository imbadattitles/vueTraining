<template lang="">
  <article class="p-4 mt-4 border-2 border-solid border-teal-600">
    <div><strong>Название:</strong> {{ post.title }}</div>
    <div><strong>Описание:</strong> {{ post.body }}</div>
    <div class="flex gap-2">
      <my-btn @click="$emit('remove', post)" class="btn">Удалить</my-btn>
      <my-btn @click="$router.push(`/posts/${post.id}`)" class="btn">Подробнее</my-btn>
    </div>
  </article>
</template>
<script>
export default {
  props: {
    post: {
      type: Object,
      required: true
    }
  }
}
</script>
<style lang=""></style>
