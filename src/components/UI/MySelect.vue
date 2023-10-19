<template>
  <select :value="modelValue" @change="changeOptions">
    <option disabled value="">Выберите из списка</option>
    <option v-for="(option, index) in options" :key="index" :value="option.value">
      {{ option.name }}
    </option>
  </select>
</template>
<script>
export default {
  props: {
    modelValue: {
      type: String
    },
    options: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    changeOptions(option) {
      this.$emit('update:modelValue', option.target.value)
    }
  }
}
</script>
<style lang=""></style>
