<template lang="">
  <form @submit.prevent>
    <h4>Создание поста</h4>
    <MyInput v-focus v-model="post.title" class="input" type="text" placeholder="Название" />
    <MyInput v-model="post.body" class="input" type="text" placeholder="Описание" />
    <my-btn @click="createPost" class="btn">Создать</my-btn>
  </form>
</template>
<script>
export default {
  methods: {
    createPost() {
      this.post.id = Date.now()
      this.$emit('create', this.post)
      this.post = {
        title: '',
        body: ''
      }
    }
  },
  watch: {
    post: {
      handler(newVal) {
        console.log(newVal)
      },
      deep: true
    }
  },
  data() {
    return {
      post: {
        title: '',
        body: ''
      }
    }
  }
}
</script>
<style lang=""></style>
